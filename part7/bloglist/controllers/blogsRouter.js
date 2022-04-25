const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const middleware = require('../utils/middleware')
require('express-async-errors')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const user = req.user
  const newBlog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: user._id,
  })
  const blogs = await newBlog.save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()

  res.status(201).json(blogs)
})
blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  blog
    ? res.json(blog)
    : res.status(404).json({ error: 'blog cannot be found' })
})
blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    res.status(404).json({ error: 'blog cannot be found' })
  }

  if (!(blog.user.toString() === req.user.id.toString())) {
    return res.status(401).json({ error: 'unauthorized action! ' })
  }
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})
blogsRouter.put('/:id', async (req, res) => {
  const newBlog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: req.user,
  }

  Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true }).then(
    (updatedBlog) => res.status(201).json(updatedBlog)
  )
})
module.exports = blogsRouter

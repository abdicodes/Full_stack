const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')
const middleware = require('../utils/middleware')
require('express-async-errors')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  console.log(blogs)
  res.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const user = req.user

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: user._id,
  })

  const blogs = await blog.save()
  user.blogs = user.blogs.concat(blog._id)
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
    return res.status(400).json({ error: 'unauthorized action! ' })
  }
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})
blogsRouter.put('/:id', async (req, res) => {
  const user = await User.findById(req.body.userId)
  console.log(req.body)
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: user._id,
  }
  console.log(blog)

  Blog.findByIdAndUpdate(req.params.id, blog, { new: true }).then(
    (updatedBlog) => res.status(201).json(updatedBlog)
  )
})
module.exports = blogsRouter

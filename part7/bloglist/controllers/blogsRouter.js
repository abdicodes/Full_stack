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
  const detailedBlog = await Blog.findById(blogs._id).populate('user', {
    username: 1,
    name: 1,
  })

  res.status(201).json(detailedBlog)
})
blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  blog
    ? res.json(blog)
    : res.status(404).json({ error: 'blog cannot be found' })
})
blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  console.log(req.body)
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    res.status(404).json({ error: 'blog cannot be found' })
  }

  if (!(blog.user.toString() === req.user.id.toString())) {
    return res.status(401).json({ error: 'unauthorized action! ' })
  }
  console.log(req.params.id)
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})
blogsRouter.put('/:id', async (req, res) => {
  console.log(req.body)
  const newBlog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: req.body.user.id,
  }
  await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true })
  const returnedBlog = await Blog.findById(req.params.id).populate('user', {
    username: 1,
    name: 1,
  })

  res.status(201).json(returnedBlog)
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const comment = req.body.comment
  if (!comment) {
    return res.status(401).json({ error: 'empty comment! ' })
  }
  console.log(comment)
  console.log('=========')
  const blog = await Blog.findById(req.params.id)
  console.log(blog)
  blog.comments = blog.comments.concat(comment)
  await blog.save()
  console.log(blog)
  res.status(201).json(blog)
})

module.exports = blogsRouter

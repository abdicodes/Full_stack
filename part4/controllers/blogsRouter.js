const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
require('express-async-errors')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)

  const blogs = await blog.save()
  res.status(201).json(blogs)
})
blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  blog ? res.json(blog) : res.status(404).json({ error: "blog can't be found" })
})
blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id)

  blog
    ? res.status(204).end()
    : res.status(404).json({ error: "blog can't be found" })
})
module.exports = blogsRouter

const blogsRouter = require('express').Router()
const { response } = require('../app')
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

  blog
    ? res.json(blog)
    : res.status(404).json({ error: 'blog cannot be found' })
})
blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id)

  blog
    ? res.status(204).end()
    : res.status(404).json({ error: 'blog cannot be found' })
})
blogsRouter.put('/:id', (req, res) => {
  console.log(req.body)
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  }
  console.log(blog)

  Blog.findByIdAndUpdate(req.params.id, blog, { new: true }).then(
    (updatedBlog) => res.json(updatedBlog)
  )
})
module.exports = blogsRouter

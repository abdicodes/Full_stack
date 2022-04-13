const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')
require('express-async-errors')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

// blogsRouter.delete('/', async (req, res) => {
//   const blogs = await Blog.find({}).populate('user')
//   res.json(blogs)
// })

blogsRouter.post('/', async (req, res) => {
  const user = await User.findById(req.body.user)
  console.log(user)
  console.log(req.body)
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: user.id,
  })

  const blogs = await blog.save()
  user.blogs = user.blogs.concat(blog.id)
  await user.save()
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

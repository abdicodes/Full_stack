require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blogs.js')
const logger = require('./utils/logger')

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog.save().then((result) => {
    res.status(201).json(result)
  })
})

const PORT = 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

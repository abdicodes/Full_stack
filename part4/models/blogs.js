const mongoose = require('mongoose')
const url = process.env.MONGODB_URI_BLOG
const logger = require('../utils/logger')

logger.info('connecting to', url)

mongoose
  .connect(url)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

module.exports = mongoose.model('Blog', blogSchema)

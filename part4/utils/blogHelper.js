const Blog = require('../models/blogs')

const initialBlogs = [
  {
    title: 'title1',
    author: 'abdi',
    url: 'random',
    likes: 100000,
  },
  {
    title: 'title2',
    author: 'sam',
    url: 'random',
    likes: 100000,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
}

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

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'title2',
    author: 'sam',
    url: 'random',
    likes: 100000,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}
module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
}

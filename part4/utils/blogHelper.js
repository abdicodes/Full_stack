const Blog = require('../models/blogs')
const User = require('../models/users')

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
const tokenGen = async (api) => {
  await User.deleteMany({})
  const user = await api
    .post('/api/users')
    .send({ name: 'test', username: 'test', password: 'Somali123' })
  const token = await api
    .post('/api/login')
    .send({ username: 'test', password: 'Somali123' })
  const test = await User.findById(user.body.id)

  console.log(test)

  return { token: token.body.token, id: test._id }
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
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
  usersInDb,
  tokenGen,
}

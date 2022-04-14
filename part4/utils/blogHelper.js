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

const initialUsers = [
  { name: 'test1', username: 'test1', password: 'Somali123' },
  { name: 'test2', username: 'test', password: 'Somali123' },
]
const tokenGen = async (api) => {
  const user = await api.post('/api/users').send(initialUsers[0])
  const token = await api.post('/api/login').send(initialUsers[0])
  const test = await User.findById(user.body.id)

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
const nonExistingToken = async (api) => {
  const user = new User({
    username: 'sam',
    name: 'sam',
    password: 'Somali12345',
  })
  await user.save()
  const foo = await api.post('/api/login').send(user)
  await user.remove()
  const testing = await User.find({})
  console.log(testing)
  return foo.body.token
}
module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
  usersInDb,
  tokenGen,
  initialUsers,
  nonExistingToken,
}

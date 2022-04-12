const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const helper = require('../utils/blogHelper')

const api = supertest(app)
beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObject.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'to be or not to be',
    author: 'chalres',
    url: 'google.com',
    likes: 250,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((r) => r.title)

  expect(titles).toContain('to be or not to be')
})

test('an input with no likes property should have 0 likes', async () => {
  const newBlog = {
    title: 'to be or not to be',
    author: 'chalres',
    url: 'google.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.at(-1).likes).toBe(0)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})
test('id property is defined', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})
afterAll(() => {
  mongoose.connection.close()
})

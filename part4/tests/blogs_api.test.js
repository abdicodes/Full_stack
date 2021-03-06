const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const User = require('../models/users')
const helper = require('../utils/blogHelper')

const api = supertest(app)
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const blogObject = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObject.map((blog) => blog.save())
  await Promise.all(promiseArray)
})
// describe('when there are initial blogs saved', () => {
//   test('blogs are returned as json and status 200', async () => {
//     const getRequest = await api.get('/api/blogs')

//     expect(getRequest.type).toEqual('application/json')
//     expect(getRequest.status).toEqual(200)
//   })

//   test('there are two blogs', async () => {
//     const blogsAtEnd = await helper.blogsInDb()
//     await helper.tokenGen(api)
//     expect(blogsAtEnd).toHaveLength(2)
//   })
//   test('id property is defined', async () => {
//     const blogsAtEnd = await helper.blogsInDb()
//     expect(blogsAtEnd[0].id).toBeDefined()
//   })
// })

describe('when adding new notes', () => {
  test('request with invalid token should fail with error 401', async () => {
    const user = await helper.tokenGen(api)
    const invalidToken = helper.nonExistingToken(api)
    const newBlog = {
      title: 'missing valid token',
      author: 'chalres',
      url: 'google.com',
      user: user.id,
      likes: 300,
    }

    const myReq = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${invalidToken}`)
      .send(newBlog)
    expect(myReq.status).toEqual(401)
  })
  test('a valid blog can be added', async () => {
    const user = await helper.tokenGen(api)
    const newBlog = {
      title: 'to be or not to be',
      author: 'chalres',
      url: 'google.com',
      likes: 250,
      user: user.id,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${user.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((r) => r.title)

    expect(titles).toContain('to be or not to be')
  })

  test('an input with no likes property should have 0 likes', async () => {
    const user = await helper.tokenGen(api)
    const newBlog = {
      title: 'to be or not to be',
      author: 'chalres',
      url: 'google.com',
      user: user.id,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${user.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.at(-1).likes).toBe(0)
  })

  test('an input with no title and url properties is not added to DB', async () => {
    const user = await helper.tokenGen(api)
    const newBlog = {
      author: 'chalres',
      user: user.id,
      likes: 10,
    }

    const postBlog = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${user.token}`)
      .send(newBlog)
    expect(postBlog.status).toEqual(400)
  }, 10000)
})

describe('view of a single blog', () => {
  test('a single blog can be viewed', async () => {
    const blogs = await helper.blogsInDb()
    const id = blogs[0].id
    const myReq = await api.get(`/api/blogs/${id}`)
    expect(myReq.status).toEqual(200)
    expect(myReq.type).toEqual('application/json')
  })
  test('fails with statuscode 404 if note does not exist', async () => {
    const nonExistingID = await helper.nonExistingId()
    const myReq = await api.get(`/api/blogs/${nonExistingID}`)
    expect(myReq.status).toEqual(404)
  })
  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '1234567899'
    const myReq = await api.get(`/api/blogs/${invalidId}`)
    expect(myReq.status).toEqual(400)
  })
})
describe('for blog deletion', () => {
  test(' success with code 204 if ID is valid', async () => {
    const user = await helper.tokenGen(api)
    const newBlog = {
      title: 'to be deleted',
      author: 'chalres',
      url: 'google.com',
      likes: 250,
      user: user.id,
    }

    const blog = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${user.token}`)
      .send(newBlog)

    const myReq = await api
      .delete(`/api/blogs/${blog.body.id}`)
      .set('Authorization', `bearer ${user.token}`)

    expect(myReq.status).toEqual(204)
  })
  test('fails with code 404 if ID does not exist', async () => {
    const user = await helper.tokenGen(api)
    const nonExistingID = await helper.nonExistingId()
    const myReq = await api
      .delete(`/api/blogs/${nonExistingID}`)
      .set('Authorization', `bearer ${user.token}`)
    expect(myReq.status).toEqual(404)
  })
  test('fails with code 400 if ID is invalid', async () => {
    const user = await helper.tokenGen(api)
    const invalidId = '1234567899'
    const myReq = await api
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', `bearer ${user.token}`)
    expect(myReq.status).toEqual(400)
  })
})
describe('for blog modification', () => {
  test(' modifying valid blog should return status 201', async () => {
    const blogs = await helper.blogsInDb()
    const blog = blogs[0]
    blog.likes = 20
    const myReq = await api.put(`/api/blogs/${blog.id}`).send(blog)
    expect(myReq.status).toEqual(201)
    expect(myReq.body.likes).toEqual(20)
  })
})
afterAll(() => {
  mongoose.connection.close()
})

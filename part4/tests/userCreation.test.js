const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/users')
const supertest = require('supertest')
const helper = require('../utils/blogHelper')
const api = supertest(app)
describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'Salainen1',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails if username or password length is less than 3 character', async () => {
    const newUser = {
      username: 'ml',
      name: 'Matti Luukkainen',
      password: 'Salainen1',
    }

    await api.post('/api/users').send(newUser).expect(400)
  })
  test('creation fails if password does not contain lowercase, uppercase and a digit', async () => {
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'Salaine',
    }

    await api.post('/api/users').send(newUser).expect(400)
  })
})

const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  await User.deleteMany({})

  const newUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'password',
  }

  await api
    .post('/api/users')
    .send(newUser)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the second blog has author Dijkstra', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[1].author).toBe('Edsger W. Dijkstra')
})

test('first blog has field called id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added using a valid token', async () => {
  const login = await api
    .post('/api/login')
    .send({
      username: 'testuser',
      password: 'password'
    })

  const token = login.body.token

  const newBlog = {
    title: 'Testblog',
    author: 'Test Author',
    url: 'www.testblog.org',
    likes: 123,
  }

  await api
    .post('/api/blogs')
    .set({ 'Authorization': 'bearer ' + token })
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(r => r.title)

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain('Testblog')
})

test('a blog cannot be added if request contains no token', async () => {
  const newBlog = {
    title: 'Testblog',
    author: 'Test Author',
    url: 'www.testblog.org',
    likes: 123,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('if likes is not given, it is set to 0', async () => {
  const login = await api
    .post('/api/login')
    .send({
      username: 'testuser',
      password: 'password'
    })

  const token = login.body.token

  const newBlog = {
    title: 'Testblog',
    author: 'Test User',
    url: 'www.testblog.org',
  }

  const postedBlog = await api
    .post('/api/blogs')
    .set({ 'Authorization': 'bearer ' + token })
    .send(newBlog)

  expect(postedBlog.body.likes).toBe(0)
})

test('blog without title is not added', async () => {
  const login = await api
    .post('/api/login')
    .send({
      username: 'testuser',
      password: 'password'
    })

  const token = login.body.token

  const newBlog = {
    author: 'Test Author',
    url: 'www.testblog.org',
    likes: 123,
  }

  await api
    .post('/api/blogs')
    .set({ 'Authorization': 'bearer ' + token })
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog without url is not added', async () => {
  const login = await api
    .post('/api/login')
    .send({
      username: 'testuser',
      password: 'password'
    })

  const token = login.body.token

  const newBlog = {
    title: 'Testblog',
    author: 'Test Author',
    likes: 123,
  }

  await api
    .post('/api/blogs')
    .set({ 'Authorization': 'bearer ' + token })
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

describe('deletion of a note', () => {

  test('succeeds with status code 204 if id is valid', async () => {
    const login = await api
      .post('/api/login')
      .send({
        username: 'testuser',
        password: 'password'
      })

    const token = login.body.token

    const newBlog = {
      title: 'Testblog',
      author: 'Test Author',
      url: 'www.testblog.org',
      likes: 123,
    }

    const blogToDelete = await api
      .post('/api/blogs')
      .set({ 'Authorization': 'bearer ' + token })
      .send(newBlog)


    const blogsAfterAddition = await helper.blogsInDb()

    expect(blogsAfterAddition).toHaveLength(
      helper.initialBlogs.length + 1
    )

    await api
      .delete(`/api/blogs/${blogToDelete.body.id}`)
      .set({ 'Authorization': 'bearer ' + token })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )
  })

  test('fails with status code 400 if id is invalid', async () => {
    const login = await api
      .post('/api/login')
      .send({
        username: 'testuser',
        password: 'password'
      })

    const token = login.body.token

    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set({ 'Authorization': 'bearer ' + token })
      .expect(400)
  })
})

describe('updating a test', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToChange = blogsAtStart[blogsAtStart.length-1]

    const updatedBlog = {
      title: 'Test blog 2',
      author: 'Second User',
      url: 'test.url.org',
      likes: 321
    }

    await api
      .put(`/api/blogs/${blogToChange.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(updatedBlog.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
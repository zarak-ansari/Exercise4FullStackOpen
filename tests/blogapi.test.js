const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blogs')
const helper = require('./test_helper')

const initialBlogs = helper.initialBlogs
const api = supertest(app)

beforeEach( async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
}, 100000)

test('all blogs are returned', async () => {
    const response = await api
    .get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveLength(initialBlogs.length)
}, 100000)

test('response has id field', async () => {
    const response = await api
                        .get('/api/blogs')
                        .expect(200)
                        .expect('Content-Type', /application\/json/)
    response.body.forEach(blog => expect(blog.id).toBeDefined())
})

afterAll(async () => {
    await mongoose.connection.close()
  })
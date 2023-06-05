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

test('posting a new blog works', async () => {
    const newBlog = {
        title: "Test Addition",
        author: "test runner",
        url: "https://fakesite.com/",
        likes: 1,
    }
    
    await api
        .post('/api/blogs/')
        .send(newBlog)
        .expect(201)
    
    const response = await api
                        .get('/api/blogs/')
                        .expect(200)
                        .expect('Content-Type', /application\/json/)
    expect(response.body.length).toBe(initialBlogs.length + 1)

    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain('Test Addition')
}, 100000)


test('posting a blog with missing likes attribute', async () => {
    const newBlog = {
        title: "Test Addition",
        author: "test runner",
        url: "https://fakesite.com/"
    } 

    const response = await api
                        .post('/api/blogs/')
                        .send(newBlog)
                        .expect(201)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)
})

test('posting a blog with missing title attribute', async () => {
    const newBlog = {
        author: "test runner",
        url: "https://fakesite.com/",
        likes:5
    }

    const response = await api
                            .post('/api/blogs/')
                            .send(newBlog)
                            .expect(400)
})

test('posting a blog with missing url attribute', async () => {
    const newBlog = {
        title:"Test Title Added",
        author: "test runner",
        likes:5
    }

    const response = await api
                            .post('/api/blogs/')
                            .send(newBlog)
                            .expect(400)
})


afterAll(async () => {
    await mongoose.connection.close()
})
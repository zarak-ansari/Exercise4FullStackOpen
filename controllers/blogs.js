const blogRouter = require('express').Router()

const Blog = require('../models/blogs')

blogRouter.get('/', async (request, response) => {
    
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
blogRouter.post('/', async (request, response) => {
    
    const requestBody = request.body
    
    if(!requestBody.title || !requestBody.url) {
        response.status(400).send()
    } else {
        requestBody.likes = requestBody.likes || 0
        const blog = new Blog(requestBody)
        await blog.save()
        response.status(201).json(blog)
    }
})

module.exports = blogRouter
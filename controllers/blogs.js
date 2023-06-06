const blogRouter = require('express').Router()

const Blog = require('../models/blogs')

blogRouter.get('/', async (request, response) => {
    
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
blogRouter.post('/', async (request, response) => {
    
    const requestBody = request.body
    
    if(!requestBody.title || !requestBody.url) {
        response.status(400).end()
    } else {
        requestBody.likes = requestBody.likes || 0
        const blog = new Blog(requestBody)
        await blog.save()
        response.status(201).json(blog)
    }
})

blogRouter.delete('/:id', async (request, response ) => {
    const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
    deletedBlog ?  response.status(204).send(deletedBlog) : response.status(400).end()
}) 

blogRouter.put('/:id', async (request, response) => {
    const newBlog = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new:true })
    response.status(200).send(updatedBlog)
})

module.exports = blogRouter
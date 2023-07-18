const blogRouter = require('express').Router()

const jwt = require('jsonwebtoken')
const Blog = require('../models/blogs')
const User = require('../models/users')

blogRouter.get('/', async (request, response) => {
    
    const blogs = await Blog.find({}).populate('user', {username:1, name:1})
    response.json(blogs)
  })
  
blogRouter.post('/', async (request, response) => {
    
    if(request.user == null) return response.status(401).json({error:"invalid user"})

    const requestBody = request.body
    
    if(requestBody.title == null || requestBody.url == null) {
        return response.status(400).json({error:"missing title or url"})
    } else {
        requestBody.likes = requestBody.likes || 0
        const user = request.user
        requestBody.user = user
        const blog = new Blog(requestBody)
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        return response.status(201).json(savedBlog)
    }
})

blogRouter.delete('/:id', async (request, response ) => {

    if(request.user === null) {
        return response.status(401).json({error:"invalid user"})
    }
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    const blogCreater = blog.user.toString()
    const userInRequest = user.id.toString()

    if(blogCreater === userInRequest) {
        const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
    } else {
        return response.status(403).json({error:"different user than the blog's creater"})
    }
})

blogRouter.put('/:id', async (request, response) => {
    const newBlog = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new:true })
    response.status(200).json(updatedBlog)
})

module.exports = blogRouter
const blogRouter = require('express').Router()

const jwt = require('jsonwebtoken')
const Blog = require('../models/blogs')
const User = require('../models/users')

blogRouter.get('/', async (request, response) => {
    
    const blogs = await Blog.find({}).populate('user', {username:1, name:1})
    response.json(blogs)
  })
  
blogRouter.post('/', async (request, response) => {
    
    if(!request.token){
        return response.status(401).json({error:"missing token"})
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken){
        return response.status(401).json({error:"invalid token"})
    }

    const requestBody = request.body
    
    if(!requestBody.title || !requestBody.url) {
        return response.status(400).json({error:"missing title or url"})
    } else {
        requestBody.likes = requestBody.likes || 0
        const user = await User.findById(decodedToken.id)
        requestBody.user = user.id
        const blog = new Blog(requestBody)
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog)
        await user.save()
        return response.status(201).json(savedBlog)
    }
})

blogRouter.delete('/:id', async (request, response ) => {

    if(!request.token) return response.status(401).json({error:"missing token"})
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken) return response.status(401).json({error:"invalid token"})

    const blog = await Blog.findById(request.params.id)

    const blogCreater = blog.user.toString()
    const userFromToken = decodedToken.id.toString()
    if(blogCreater === userFromToken) {
        const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
        deletedBlog ?  response.status(204).send(deletedBlog) : response.status(400).end()    
    } else {
        return response.status(401).json({error:"invalid user"})
    }

}) 

blogRouter.put('/:id', async (request, response) => {
    const newBlog = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new:true })
    response.status(200).send(updatedBlog)
})



module.exports = blogRouter
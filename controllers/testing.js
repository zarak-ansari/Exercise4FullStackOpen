const testingRouter = require('express').Router()

const Blog = require('../models/blogs')
const User = require('../models/users')

testingRouter.post('/reset', async (request, response) =>{
    Blog.deleteMany({})
    User.deleteMany({})
    response.status(204).end()
})

module.exports = testingRouter
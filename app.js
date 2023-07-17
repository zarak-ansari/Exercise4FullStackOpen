const express = require('express')
const app = express()
const cors = require('cors')

const middleware = require('./controllers/middleware')
const userExtractor = middleware.userExtractor
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/blogs', userExtractor, blogRouter)
app.use('/api/login',loginRouter)

if(process.env.NODE_ENV === 'test'){
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing/', testingRouter)
}

module.exports = app
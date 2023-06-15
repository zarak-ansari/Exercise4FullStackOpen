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

module.exports = app
const express = require('express')
const app = express()
const cors = require('cors')

const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogRouter)


module.exports = app
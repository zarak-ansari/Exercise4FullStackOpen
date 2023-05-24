const express = require('express')
const app = express()
const cors = require('cors')

const blogRouter = require('./controllers/blogs')
const config = require('./utils/config')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
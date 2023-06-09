const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/users')
const Blog = require('../models/blogs')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if(!username || !password) {
    response.status(400).send({error:"missing username or password"})
  } else if((username.length < 3) || (password.length < 3)) {
    response.status(400).send({error:"username and password must be atleast 3 characters long"})
  } else {

    const existingUser = await User.findOne({ username })

    if(existingUser){
      response.status(400).send({error:"user with this username already exists"})    
    } else {

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const user = new User({
        username,
        name,
        passwordHash,
      })

      const savedUser = await user.save()

      response.status(201).json(savedUser)
    }
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {url:1, title:1, author:1})

  response.json(users)
})

module.exports = usersRouter
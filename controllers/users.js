const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if(!username || !password) {
    response.status(400).send({error:"missing username or password"})
  }

  if((username.length < 3) || (password.length < 3)) {
    response.status(400).send({error:"username and password must be atleast 3 characters long"})
  }

  const existingUser = User.find({username:username})

  if(existingUser){
    response.status(400).send({error:"user with this username already exists"})    
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
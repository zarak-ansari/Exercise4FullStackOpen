const jwt = require('jsonwebtoken')

const User = require('../models/users')

const userExtractor = async (request, response, next) => {
    const token = getTokenFrom(request)
    if(token) {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)
        if(user) request.user = user
    }
    next()
}

const tokenExtractor = (request, response, next) => {
    const token = getTokenFrom(request)
    if(token) {
        request.token = token
    }
    next()
}

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        return authorization.replace('Bearer ', '')
    } else {
        return null
    }
}

module.exports = { userExtractor, tokenExtractor }
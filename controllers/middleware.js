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

module.exports = { tokenExtractor }
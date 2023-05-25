const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => {
        return total + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((favoriteSoFar, currentBlog) => {
        return currentBlog.likes > favoriteSoFar.likes ? currentBlog : favoriteSoFar 
    }, blogs[0])
}

const mostBlogs = (blogs) => {
    const authorCounts = lodash.countBy(blogs, 'author')
    const maxAuthorArray = lodash.maxBy(Object.entries(authorCounts), (authorCountPair) =>  authorCountPair[1])
    
    return {
        author: maxAuthorArray[0],
        blogs: maxAuthorArray[1]
    }
}

const mostLikes = (blogs) => {
    const authorMappedToLikes = lodash.reduce(blogs, (result, blog) => {
        result[blog.author] = (result[blog.author] || 0) + blog.likes
        return result
    }, {})

    const maxAuthorArray = lodash.maxBy(Object.entries(authorMappedToLikes), (authorCountPair) =>  authorCountPair[1])
    
    return {
        author: maxAuthorArray[0],
        likes: maxAuthorArray[1]
    }
}


module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}


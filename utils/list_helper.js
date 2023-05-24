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

module.exports = {dummy, totalLikes, favoriteBlog}


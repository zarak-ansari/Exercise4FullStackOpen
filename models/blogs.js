const mongoose = require('mongoose')
const config = require('../utils/config') 


const mongoUrl = config.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(mongoUrl)
    .then( () => {
        console.log('connected to MongoDB')
    })  
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const blogSchema = new mongoose.Schema({
    title : String,
    author : String,
    url : String,
    likes : Number
})



module.exports = mongoose.model('Blog', blogSchema)
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  url: String,
  title: String,
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: Number,
  comments: [{
    type: String
  }]
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.passwordHash
  }
})
  
module.exports = mongoose.model('Blog', blogSchema)
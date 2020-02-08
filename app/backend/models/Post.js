const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  comments: {
    type: Array,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Post', PostSchema, 'posts')

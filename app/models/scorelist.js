const mongoose = require('mongoose')

const scorelistSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  placement: {
    type: Number
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Scorelist', scorelistSchema)

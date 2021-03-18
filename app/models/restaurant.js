const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
      type: String,
      required: true
  },
  review: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
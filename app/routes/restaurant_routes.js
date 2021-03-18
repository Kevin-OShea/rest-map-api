// Express docs: http://expressjs.com/en/api.html
const express = require('express')

// pull in Mongoose model for restaurants
const Restaurant = require('../models/restaurant')

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /restaurants
router.get('/restaurants', (req, res, next) => {
  Restaurant.find()
    // respond with status 200 and JSON of the restaurants
    .then(restaurants => res.status(200).json({ restaurants: restaurants }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /restaurants/5a7db6c74d55bc51bdf39793
router.get('/restaurants/:id', (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Restaurant.findById(req.params.id)
    // if `findById` is succesful, respond with 200 and "restaurant" JSON
    .then(restaurant => res.status(200).json({ restaurant: restaurant.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /restaurants
router.post('/restaurants', (req, res, next) => {
  // set owner of new restaurant to be current user
  console.log(req.body.restaurant)
  Restaurant.create(req.body.restaurant)
    // respond to succesful `create` with status 201 and JSON of new "restaurant
    .then(restaurant => {
      res.status(201).json({ restaurant: restaurant.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /restaurants/5a7db6c74d55bc51bdf39793
router.patch('/restaurants/:id', (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair

  Restaurant.findById(req.params.id)
    .then(restaurant => {

      // pass the result of Mongoose's `.update` to the next `.then`
      return restaurant.updateOne(req.body.restaurant)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /restaurants/5a7db6c74d55bc51bdf39793
router.delete('/restaurants/:id', (req, res, next) => {
  Restaurant.findById(req.params.id)
    .then(restaurant => {
      restaurant.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
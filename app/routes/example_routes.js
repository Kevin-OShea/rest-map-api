// Express docs: http://expressjs.com/en/api.html
const express = require('express')

// pull in Mongoose model for examples
const Example = require('../models/example')

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /examples
router.get('/examples', (req, res, next) => {
  Example.find()
    // respond with status 200 and JSON of the examples
    .then(examples => res.status(200).json({ examples: examples }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/examples/:id', (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Example.findById(req.params.id)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(example => res.status(200).json({ example: example.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /examples
router.post('/examples', (req, res, next) => {
  // set owner of new example to be current user
  console.log(req.body.example)
  Example.create(req.body.example)
    // respond to succesful `create` with status 201 and JSON of new "example
    .then(example => {
      res.status(201).json({ example: example.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
router.patch('/examples/:id', (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair

  Example.findById(req.params.id)
    .then(example => {

      // pass the result of Mongoose's `.update` to the next `.then`
      return example.updateOne(req.body.example)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/examples/:id', (req, res, next) => {
  Example.findById(req.params.id)
    .then(example => {
      example.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
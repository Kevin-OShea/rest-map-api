// require necessary NPM packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// require route files
const exampleRoutes = require('./app/routes/example_routes')
const restaurantRoutes = require('./app/routes/restaurant_routes')
// const userRoutes = require('./app/routes/user_routes')
// const gameRoutes = require('./app/routes/game_routes')
// const scorelistRoutes = require('./app/routes/scorelist_routes')

// define server and client ports
// used for cors and local port declaration
const serverDevPort = 8080
const clientDevPort = 7165

// establish database connection
// use new version of URL parser
// use createIndex instead of deprecated ensureIndex
mongoose.connect("mongodb+srv://admin:admin@rest-api.zcfnr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// instantiate express application object
const app = express()

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}` }))

// define port for API to run on
const port = process.env.PORT || serverDevPort

// add `express.json` middleware which will parse JSON requests into
// JS objects before they reach the route files.
// The method `.use` sets up middleware for the Express application
app.use(express.json())
// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }))


// register route files
app.use(exampleRoutes)
app.use(restaurantRoutes)
// app.use(userRoutes)
// app.use(gameRoutes)
// app.use(scorelistRoutes)

// run API on designated port (4741 in this case)
app.listen(port, () => {
  console.log('listening on port ' + port)
})

// needed for testing
module.exports = app
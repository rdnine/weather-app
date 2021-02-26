import express from 'express'
import config from 'config'
import cors from 'cors'
import compression from 'compression'
import bodyParser from 'body-parser'

// Create object from the express module
const server = express()

// Enable All CORS Requests
server.use(cors())

// Enable gzip compression for all responses
server.use(compression())

// Parse incoming request to json
server.use(bodyParser.json())

// Server routes
server.get('/', (req, res) => res.send('App is working!'))

// Server listens on the designated port
server.listen(
  config.get('server.port'),
  () => console.log(`Server running on port: http://localhost:${config.get('server.port')}`)
)
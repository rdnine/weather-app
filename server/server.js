import express from 'express'
import config from 'config'
import cors from 'cors'

const server = express()

server.use(cors())

server.get('/', (req, res) => res.send('App is working!'))

server.listen(
  config.get('server.port'),
  () => console.log(`Server running on port: http://localhost:${config.get('server.port')}`)
)
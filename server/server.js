import express from 'express'
import config from 'config'

const server = express();

server.get('/', (req, res) => res.send('App is working!'))

server.listen(
  config.get('server.port'),
  () => console.log(`Server running on port: http://localhost:${config.get('server.port')}`)
)
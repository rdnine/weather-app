import express from 'express'

const server = express();

server.get('/', (req, res) => res.send('App is working!'))

server.listen(
  8081,
  () => console.log(`Server running on port: http://localhost:8081`)
)
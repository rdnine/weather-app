import axios from 'axios'

export const get = (req, res) => {
  res.send(`GET/ ${req.params.name} weather`)
}
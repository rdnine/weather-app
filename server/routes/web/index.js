import express from 'express'

const web = express.Router()

web.get('/', (req, res) => res.send('App is working'))

export default web
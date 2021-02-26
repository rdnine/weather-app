import express from 'express'
import weatherRoutes from './weather.js'

const api = express.Router()

// Regist weather api routes
api.use('/v1/weather', weatherRoutes)

export default api
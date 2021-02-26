import express from 'express'
import { getWeather } from '../../services/weather.js'

const weather = express.Router()

weather.get('/city/:name', getWeather)

export default weather
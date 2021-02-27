import express from 'express'
import { getWeather, getCities } from '../../services/weather.js'

const weather = express.Router()

weather.get('/city/:name', getWeather)
weather.get('/cities/:name', getCities)

export default weather
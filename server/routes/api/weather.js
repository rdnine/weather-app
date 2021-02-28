import express from 'express'
import { getWeather, getWeatherByID, getCities } from '../../services/weather.js'

const weather = express.Router()

weather.get('/city/:name', getWeather)
weather.get('/city/id/:id', getWeatherByID)

weather.get('/cities/:name', getCities)

export default weather
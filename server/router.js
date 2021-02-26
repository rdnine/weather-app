import express from 'express'
import { getWeather } from './services/weather.js'

// Express object instance
const router = express();

router.get('/', (req, res) => res.send('App is working!'))

router.get('/api/v1/weather/city/:name', getWeather)

export default router
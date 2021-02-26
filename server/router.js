import express from 'express'
import web from './routes/web/index.js'
import api from './routes/api/index.js'

// Express object instance
const router = express()

// Web Routes
router.use('/', web)

// Api routes
router.use('/api', api)

export default router
import express from 'express'

// Express object instance
const router = express();

router.get('/', (req, res) => res.send('App is working!'))

export default router
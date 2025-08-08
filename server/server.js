const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const productsRoute = require('./routes/products')
const reviewRoutes = require('./routes/reviewRoutes')
const checkoutRouter = require('./routes/checkout')
const authRouter = require('./routes/auth')         // new
const requireAuth = require('./middleware/requireAuth') // new

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fitgear'
const PORT = process.env.PORT || 5000
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev_secret_change_me'

const app = express()

// static files
app.use('/pics', express.static(path.join(__dirname, 'public/pics')))

// cors with credentials
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))

app.use(express.json())

// mongodb
mongoose.connect(MONGO_URI).then(() => {
  console.log('Mongo connected')
}).catch(err => {
  console.error('Mongo error', err.message)
})

// session store
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET || 'dev_secret_change_me',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGO_URI }),
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))

// routes
app.use('/api/auth', authRouter)
app.use('/api/products', productsRoute)
app.use('/api/reviews', reviewRoutes)
// app.use('/api/cart', require('./routes/cart')) // optional
app.use('/api/checkout', requireAuth, checkoutRouter)

// health
app.get('/health', (req, res) => res.json({ ok: true }))

// 404 for unknown api
app.use('/api', (req, res) => res.status(404).json({ ok: false, message: 'Not found' }))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

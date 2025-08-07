
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const productsRoute = require('./routes/products')
const reviewRoutes = require('./routes/reviewRoutes')
const path = require('path')
const cartRoutes = require('./routes/cart') // new

const app = express()

app.use('/pics', express.static(path.join(__dirname, 'public/pics')))


app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/fitgear', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use('/api/products', productsRoute)
app.use('/api/reviews', reviewRoutes)
app.use('/api/cart', cartRoutes) // new



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const express = require('express')
const Product = require('../models/Product')

const router = express.Router()

router.post('/', async (req, res) => {
  const { items } = req.body

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'No items provided' })
  }

  try {
    const ops = items.map(({ productId, quantity }) => ({
      updateOne: {
        filter: { _id: productId, quantity: { $gte: Number(quantity) } },
        update: { $inc: { quantity: -Number(quantity) } }
      }
    }))

    const result = await Product.bulkWrite(ops, { ordered: true })

    const modified = result.modifiedCount || 0
    if (modified !== items.length) {

      const restores = items.map(({ productId, quantity }) => ({
        updateOne: {
          filter: { _id: productId },
          update: { $inc: { quantity: Number(quantity) } }
        }
      }))
     

      return res.status(409).json({
        success: false,
        message: 'Insufficient stock for one or more items'
      })
    }

    return res.json({ success: true, message: 'Checkout complete' })
  } catch (err) {
    console.error('Checkout error.', err)
    return res.status(500).json({ success: false, message: 'Checkout failed' })
  }
})

module.exports = router

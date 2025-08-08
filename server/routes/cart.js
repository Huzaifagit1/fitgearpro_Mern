// // routes/cart.js (create this if not already)
// const express = require('express')
// const router = express.Router()
// const Product = require('../models/Product')

// router.post('/', async (req, res) => {
//   const { productId, quantity } = req.body

//   if (!productId || !quantity) {
//     return res.status(400).json({ success: false, message: 'Product ID and quantity are required' })
//   }

//   try {
//     const product = await Product.findById(productId)

//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Product not found' })
//     }

//     if (product.quantity < quantity) {
//       return res.status(400).json({ success: false, message: 'Not enough stock' })
//     }

//     product.quantity -= quantity
//     await product.save()

//     return res.status(200).json({ success: true, message: 'Product added to cart and stock updated' })
//   } catch (error) {
//     console.error('Error in /api/cart:', error)
//     return res.status(500).json({ success: false, message: 'Server error' })
//   }
// })

// module.exports = router

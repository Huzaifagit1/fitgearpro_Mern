const express = require('express')
const router = express.Router()
const Review = require('../models/Reviews')

// GET all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
    res.json(reviews)
  } catch (err) {
    res.status(500).json({ message: 'Server Error' })
  }
})

// POST new review
router.post('/', async (req, res) => {
  const { title, content, author } = req.body
  try {
    const newReview = new Review({ title, content, author })
    await newReview.save()
    res.status(201).json(newReview)
  } catch (err) {
    res.status(400).json({ message: 'Invalid review data' })
  }
})

module.exports = router

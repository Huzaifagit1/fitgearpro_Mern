const mongoose = require('mongoose')
const Review = require('./models/Reviews')

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fitgear', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected for review seeding')
  seedReviews()
})
.catch((err) => {
  console.error('MongoDB connection failed:', err)
})

async function seedReviews() {
  try {
    await Review.deleteMany() // optional: clears existing data
    const reviews = [
      {
        title: "Best Power Rack I've Ever Owned!",
        content:
          "This rack is rock solid! I've been lifting for 15 years, and the stability and quality of this FitGear Pro rack are unmatched. Assembly was surprisingly easy too. Highly recommend!",
        author: "Alex P."
      },
      {
        title: "Perfect for My Home Gym",
        content:
          "I was looking for a durable power rack that wouldn't take up too much space, and this is it. The multi-grip pull-up bar is a huge bonus. Excellent value for the price.",
        author: "Sarah L."
      },
      {
        title: "Professional Grade Equipment",
        content:
          "You can tell this is built to last. I feel incredibly safe pushing my limits on this rack. The finish is great, and it looks fantastic in my garage gym.",
        author: "Mark R."
      }
    ]

    await Review.insertMany(reviews)
    console.log('✅ Reviews seeded successfully')
    process.exit()
  } catch (error) {
    console.error('❌ Failed to seed reviews:', error)
    process.exit(1)
  }
}

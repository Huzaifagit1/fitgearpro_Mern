const mongoose = require('mongoose')
const Product = require('./models/Product')

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fitgear', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const products = [
  {
    name: 'Elite Power Pack',
    description: 'Professional squat rack with pull-up bar and safety features. Perfect for serious strength training.',
    price: 1299,
    quantity: 10,
    image: 'http://localhost:5000/pics/image1.jpg'
  },
  {
    name: 'Smart Bike Pro',
    description: 'Interactive spin bike with 4K screen and live classes. Experience studio-quality workouts at home.',
    price: 899,
    quantity: 8,
    image: 'http://localhost:5000/pics/image2.webp'
  },
  {
    name: 'TreadMax Runner',
    description: 'Commercial-grade treadmill with advanced cushioning and incline control for the ultimate running experience.',
    price: 2199,
    quantity: 6,
    image: 'http://localhost:5000/pics/image3.webp'
  },
  {
    name: 'Adjustable Dumbbells',
    description: 'Space-saving adjustable dumbbells from 5-50 lbs. Replace an entire weight room in your home.',
    price: 599,
    quantity: 15,
    image: 'http://localhost:5000/pics/image4.webp'
  },
  {
    name: 'FitGear Pro Aura Smart Treadmill',
    description: 'Experience the future of cardio. HD touchscreen, adaptive cushioning, and smart integration for an immersive, comfortable, and effective home run.',
    price: 2500,
    quantity: 4,
    image: 'http://localhost:5000/pics/image5.jpg'
  },
  {
    name: 'FitGear Pro Apex Rower',
    description: 'Full-body power in motion. Dual-resistance, smart monitoring, and foldable design deliver a smooth, effective, and space-saving rowing workout at home.',
    price: 1299,
    quantity: 7,
    image: 'http://localhost:5000/pics/image 6.jpg'
  },
  {
    name: 'Elite Whey Protein (2kg)',
    description: 'Premium whey protein isolate for rapid muscle recovery and growth. Low carb, high protein, delicious flavors.',
    price: 45,
    quantity: 50,
    image: 'http://localhost:5000/pics/image10.png'
  },
  {
    name: 'Performance Gym T-Shirt',
    description: 'Breathable, sweat-wicking fabric for ultimate comfort during intense workouts. Available in multiple colors and sizes.',
    price: 25,
    quantity: 35,
    image: 'http://localhost:5000/pics/image11.jpg'
  },
  {
    name: 'Pro Training Shoes',
    description: 'Engineered for stability and support, perfect for lifting, cardio, and cross-training. Superior grip and comfort.',
    price: 80,
    quantity: 20,
    image: 'http://localhost:5000/pics/image12.jpg'
  },
  {
    name: 'Cast Iron Kettlebell (16kg)',
    description: 'Durable, solid cast iron kettlebell for dynamic strength and cardio workouts. Ergonomic handle for comfortable grip.',
    price: 60,
    quantity: 25,
    image: 'http://localhost:5000/pics/image 13.webp'
  },
  {
    name: 'Heavy Duty Punch Bag',
    description: 'Tough, tear-resistant punch bag for boxing, MMA, and fitness training. Comes with hanging chains.',
    price: 120,
    quantity: 10,
    image: 'http://localhost:5000/pics/image14.jpg'
  },
  {
    name: 'AeroVent Gym Gloves',
    description: 'Padded palm with breathable mesh for superior grip and comfort. Reduces calluses and enhances lifting performance.',
    price: 20,
    quantity: 40,
    image: 'http://localhost:5000/pics/image15.jpg'
  }
]

async function seedProducts() {
  try {
    await Product.deleteMany()
    await Product.insertMany(products)
    console.log('✅ Products successfully seeded with quantity')
    mongoose.connection.close()
  } catch (error) {
    console.error('❌ Error while seeding products:', error)
    mongoose.connection.close()
  }
}

seedProducts()

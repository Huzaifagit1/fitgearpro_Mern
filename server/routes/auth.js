const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const router = express.Router()

router.get('/me', (req, res) => {
  return res.json({ user: req.session.user || null })
})

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ ok: false, message: 'All fields are required' })
  }
  try {
    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ ok: false, message: 'Email already used' })
    const passwordHash = await bcrypt.hash(password, 10)
    const u = await User.create({ name, email, passwordHash })
    req.session.user = { id: u._id.toString(), name: u.name, email: u.email }
    return res.json({ ok: true, user: req.session.user })
  } catch (e) {
    return res.status(500).json({ ok: false, message: 'Register failed' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ ok: false, message: 'Email and password are required' })
  }
  const u = await User.findOne({ email })
  if (!u) return res.status(401).json({ ok: false, message: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, u.passwordHash)
  if (!ok) return res.status(401).json({ ok: false, message: 'Invalid credentials' })
  req.session.user = { id: u._id.toString(), name: u.name, email: u.email }
  return res.json({ ok: true, user: req.session.user })
})

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ ok: false })
    res.clearCookie('sid')
    return res.json({ ok: true })
  })
})

module.exports = router

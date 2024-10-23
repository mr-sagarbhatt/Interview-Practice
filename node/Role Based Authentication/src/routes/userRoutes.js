const express = require('express')
const { authorizeRole } = require('../middlewares')

const router = express.Router()

router.get('/admin', authorizeRole('admin'), (req, res) => {
  return res.status(200).json({ message: 'Welcome Admin' })
})

router.get('/manager', authorizeRole('admin', 'manager'), (req, res) => {
  return res.status(200).json({ message: 'Welcome Manager' })
})

router.get('/user', authorizeRole('admin', 'manager', 'user'), (req, res) => {
  return res.status(200).json({ message: 'Welcome User' })
})

module.exports = router

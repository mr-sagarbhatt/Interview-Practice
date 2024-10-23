const express = require('express')
const dotenv = require('dotenv').config()
const { dbConnect } = require('./config')
const { authRoutes, userRoutes } = require('./routes')
const { verifyToken } = require('./middlewares')
const cors = require('cors')

dbConnect()
const app = express()
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'] }))

// TODO: JSON Middleware to get JSON data
app.use(express.json())

// TODO: Routes
app.use(`/`, (req, res) => {
  res.status(200).json({
    message: `A role based authentication project using node, express, bcryptjs, jsonwebtoken and mongoose.`,
  })
})
app.use(`${process.env.API_PREFIX}/auth`, authRoutes)
app.use(`${process.env.API_PREFIX}/users`, verifyToken, userRoutes)

// TODO: Server
const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

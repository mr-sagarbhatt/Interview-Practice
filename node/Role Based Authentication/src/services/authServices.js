const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserModel } = require('../models')

const registerService = async (req, res) => {
  console.log({ req: req.body })

  try {
    const { username, password, role } =
      Object.prototype.toString(req.body) === '[object Object]' ? req.body : JSON.parse(req.body)
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUSer = new UserModel({ username, password: hashedPassword, role })
    const user = await newUSer.save()
    console.log({ user })
    return res.status(201).json({ message: `User registered with username ${username}.` })
  } catch (e) {
    console.log(`Something went wrong. ${e.message}`)
  }
}

const loginService = async (req, res) => {
  try {
    const { username, password } =
      Object.prototype.toString(req.body) === '[object Object]' ? req.body : JSON.parse(req.body)
    const user = await UserModel.findOne({ username })

    if (!user) {
      return res.status(404).json({ message: `User with usrname ${username} not found.` })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: `Invalid credentials` })
    }

    const token = await jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.status(200).json({ token })
  } catch (e) {
    console.log(`Something went wrong. ${e.message}`)
  }
}

module.exports = {
  registerService,
  loginService,
}

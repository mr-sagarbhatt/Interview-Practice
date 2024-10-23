const { authService } = require('../services')

const registerController = async (req, res) => {
  console.log({ req: req.body })
  try {
    const result = await authService.registerService(req, res)
    console.log({ result })
    return console.log({ result })
  } catch (e) {
    res.status(500).json({ message: `Something went wrong. ${e?.message}` })
  }
}

const loginController = async (req, res) => {
  try {
    const result = await authService.loginService(req, res)
    console.log({ result })
    return result
  } catch (e) {
    res.status(500).json({ message: `Something went wrong. ${e?.message}` })
  }
}

module.exports = {
  registerController,
  loginController,
}

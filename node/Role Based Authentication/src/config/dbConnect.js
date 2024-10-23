const mongoose = require('mongoose')

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_STRING)
    console.log(`Database connection: ${connect?.connection?.host} ${connect?.connection?.name}`)
  } catch (e) {
    console.log(`error: ${e}`)
    process.exit(1) // TODO: Exit the program
  }
}

module.exports = dbConnect

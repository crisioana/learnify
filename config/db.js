const mongoose = require('mongoose')

const connectDB = async() => {
  mongoose.connect(process.env.MONGODB_URL, {
    autoIndex: true
  }, err => {
    if (err) throw err
    console.log('Successfully connected to MongoDB')
  })
}

module.exports = connectDB
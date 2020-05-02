const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://nikhil:Khatarnak123@cluster0-hmru0.mongodb.net/parkingLot', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

var connection = mongoose.connection

connection.on('error', (err) => {
  console.log('Could not connect to Database: ', err)
})

connection.on('open', (ref) => {
  console.log('Connected to Database.')
})

module.exports = connection

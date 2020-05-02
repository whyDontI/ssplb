const express = require('express')
const app = express()

app.use('/parkinglot', require('./parkingLot.routes'))

module.exports = app

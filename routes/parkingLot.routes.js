const express = require('express')
const app = express.Router()
const parkingLotService = require('../services/parkingLot.service')
const parkingLotValidator = require('../middlewares/validators/parkingLot.validator')

app.get('/vehicle-count/', parkingLotService._getAllVehicleCount)
app.get('/vehicle-slot/', parkingLotService._getVehicleSlot)
app.post('/park-vehicle/', parkingLotValidator.parkVehicle, parkingLotService._parkVehicle)

module.exports = app

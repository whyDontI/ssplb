const vehicle = require('../models/vehicle.model.js')

class Vehicle {
  async __getVehicle (query) {
    const queryObj = {}

    // Search for Registration Number provided
    if (query.registrationNumber) {
      queryObj.registrationNumber = {
        $regex: '.*' + query.registrationNumber + '.*',
        $options: 'i'
      }
    }

    return vehicle.find(queryObj)
  }

  // Store the information of newly parked vehicle
  async __parkVehicle (data) {
    return vehicle.create(data)
  }

  // Get the count of all the vehicles parked
  async __getVehicleCount () {
    return vehicle.aggregate([
      { $group: { _id: { type: '$type' }, count: { $sum: 1 } } }
    ])
  }

  // Search vehicle by Registration Number, Story Number, Row Number
  async __searchVehicle (query) {
    const queryObj = {}
    if (query.registrationNumber) {
      queryObj.registrationNumber = {
        $regex: '.*' + query.registrationNumber + '.*',
        $options: 'i'
      }
    }

    if (query.storyNum) {
      queryObj.storyNum = parseInt(query.storyNum)
    }

    if (query.row) {
      queryObj.rowIndex = parseInt(query.row) - 1
    }

    return vehicle.find(queryObj)
  }
};

module.exports = new Vehicle()

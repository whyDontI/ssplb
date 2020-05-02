const vehicle = require('../models/vehicle.model.js')

class Vehicle {
  async __getVehicle (query) {
    const queryObj = {}

    if (query.registrationNumber) {
      queryObj.registrationNumber = {
        $regex: '.*' + query.registrationNumber + '.*',
        $options: 'i'
      }
    }

    return vehicle.find(queryObj)
  }

  async __parkVehicle (data) {
    return vehicle.create(data)
  }

  async __getVehicleCount () {
    return vehicle.aggregate([
      { $group: { _id: { type: '$type' }, count: { $sum: 1 } } }
    ])
  }
};

module.exports = new Vehicle()

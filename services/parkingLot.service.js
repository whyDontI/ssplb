// Input
//
// Storeys
// Rows
// Motorcycle Spots
// Compact Spots
// Large Spots
//
// New Vehicle to be parked
//    - Registration Number
//    - Vehicle Type
//    OR
//    - Slot

// OutPut
// Return the alloted slot of the vehicle
// And type of the vehicle

// Given
// Motercycle can park on any Spot
// Car - Single Compact Spot / Single Large Spot
// Bus - Consecutive 5 Large spots only, within same row
//
// Parking must be filled in Linear fashion

// Assumptions
// Number of storeys - 5
// Number of rows at each storey - 5

// Routes
// /ParkVehicle - parks the vehicle at the spot, returns the slot at which vehicle is parked
// /GetSlot - returns slot of the vehicle using registration number
// /GetAllVehicleCount - return the count of all vehicle types in the parking lot

const __ = require('../util/response')
const StoryQuery = require('../dataAdapter/mongo/query/story.query')
const VehicleQuery = require('../dataAdapter/mongo/query/vehicle.query')

class ParkingLot {
  async _parkVehicle (req, res) {
    try {
      let vacantStoreys
      let rowIndex
      let newRow
      switch (req.body.vehicleType) {
        case 'B': // Bus
          console.log('Bus', req.body)
          vacantStoreys = await StoryQuery.__getVacantStoreysForBus()
          if (!vacantStoreys[0]) {
            return __.customMsg(req, res, 404, 'There is no space vacant for your vehicle, Please find some other parking place')      
          }
          rowIndex = vacantStoreys[0].rows.findIndex((row) => {
            console.log(row.largeSpots)
            return row.largeSpots === 5
          })

          newRow = vacantStoreys[0].rows[rowIndex]
          newRow.largeSpots = newRow.largeSpots - 5
          break

        case 'M': // MotorCycle
          console.log('MotorCycle', req.body)
          vacantStoreys = await StoryQuery.__getVacantStoreysForMotorCycle()
          
          if (!vacantStoreys[0]) {
            return __.customMsg(req, res, 404, 'There is no space vacant for your vehicle, Please find some other parking place')      
          }

          rowIndex = vacantStoreys[0].rows.findIndex((row) => {
            return (row.largeSpots > 1 || row.compactSpots > 1 || row.motorcycleSpots > 1)
          })

          newRow = vacantStoreys[0].rows[rowIndex]

          if (newRow.motorcycleSpots > 1) {
            newRow.motorcycleSpots = newRow.motorcycleSpots - 1
          } else if (newRow.compactSpots > 1) {
            newRow.compactSpots = newRow.compactSpots - 1
          } else if (newRow.largeSpots > 1) {
            newRow.largeSpots = newRow.largeSpots - 1
          }

          break
        
        case 'C': // Car
          console.log('Car', req.body)
          vacantStoreys = await StoryQuery.__getVacantStoreysForCar()
          console.log(vacantStoreys)
          if (!vacantStoreys[0]) {
            return __.customMsg(req, res, 404, 'There is no space vacant for your vehicle, Please find some other parking place')      
          }
        
          rowIndex = vacantStoreys[0].rows.findIndex((row) => {
            return (row.largeSpots > 1 || row.compactSpots > 1)
          })

          newRow = vacantStoreys[0].rows[rowIndex]

          if (newRow.compactSpots > 1) {
            newRow.compactSpots = newRow.compactSpots - 1
          } else if (newRow.largeSpots > 1) {
            newRow.largeSpots = newRow.largeSpots - 1
          }
          break
      }

      const occupySpace = await StoryQuery.__occupySpaceInRow({
        storyId: vacantStoreys[0]._id,
        index: rowIndex,
        value: newRow
      })

      const parkedVehicle = await VehicleQuery.__parkVehicle({
        storyNum: vacantStoreys[0].storyNum,
        type: req.body.vehicleType,
        registrationNumber: req.body.registrationNumber,
        storyId: vacantStoreys[0]._id,
        rowIndex
      })

      return __.successMsg(req, res, 200, parkedVehicle, `Vehicle parked at Story number ${vacantStoreys[0].storyNum} and Row number ${rowIndex + 1}`)
    } catch (error) {
      console.log(error)
      return __.errorMsg(req, res, 503, 'Service Unavailable.', error)
    }
  }

  async _getVehicleSlot (req, res) {
    try {
      const vehicles = await VehicleQuery.__getVehicle(req.query)
      if (!vehicles.length) {
        return __.customMsg(req, res, 404, 'Vehicles not found')
      }
      return __.successMsg(req, res, 200, vehicles, 'Vehicles Returned Successfully!')
    } catch (error) {
      return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
    }
  }

  async _getAllVehicleCount (req, res) {
    try {
      const count = await VehicleQuery.__getVehicleCount()
      return __.successMsg(req, res, 200, count, 'Vehicle Counts Returned Successfully!')
    } catch (error) {
      return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
    }
  }
};

module.exports = new ParkingLot()

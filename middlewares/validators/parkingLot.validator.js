const __ = require('../../util/response')
const joi = require('joi')

class ParkingLotValidator {
  async parkVehicle (req, res, next) {
    const schema = joi.object().keys({
      vehicleType: joi.string().required(),
      registrationNumber: joi.string().required()
    })

    try {
      const result = await joi.validate(req.body, schema)
      if (result) return next()
    } catch (error) {
      __.errorMsg(req, res, 400, error.details[0].message, error)
    }
  }
};

module.exports = new ParkingLotValidator()

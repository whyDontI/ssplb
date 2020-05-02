const story = require('../models/story.model.js')

class Story {
  async __getVacantStoreysForBus () {
    return story.aggregate([
      {
        $match: {
          'rows.largeSpots': {
            $gte: 5
          }
        }
      }
    ])
      .sort({
        storyNum: 1
      })
  }

  async __getVacantStoreysForCar () {
    return story.aggregate([
      {
        $match: {
          $or: [
            {
              'rows.compactSpots': {
                $gte: 1
              }
            }, {
              'rows.largeSpots': {
                $gte: 1
              }
            }
          ]
        }
      }
    ])
      .sort({
        storyNum: 1
      })
  }

  async __getVacantStoreysForMotorCycle () {
    return story.aggregate([
      {
        $match: {
          $or: [
            {
              'rows.motorcycleSpots': {
                $gte: 1
              }
            }, {
              'rows.compactSpots': {
                $gte: 1
              }
            }, {
              'rows.largeSpots': {
                $gte: 1
              }
            }
          ]
        }
      }
    ])
      .sort({
        storyNum: 1
      })
  }

  async __occupySpaceInRow (obj) {
    const occupyObj = {}
    occupyObj[`rows.${obj.index}`] = obj.value

    return story.update({
      _id: obj.storyId
    }, {
      $set: occupyObj
    })
  }

  async __getStoryById (id) {
    return story.findOne({
      _id: id
    })
      .lean()
  }
};

module.exports = new Story()

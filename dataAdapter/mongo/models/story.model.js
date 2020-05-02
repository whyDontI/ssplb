const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Story = Schema({
  storyNum: {
    type: Number
  },
  rows: [
    {
      motorcycleSpots: {
        type: Number
      },
      compactSpots: {
        type: Number
      },
      largeSpots: {
        type: Number
      }
    }
  ]
}, {
  timestamps: true
})

module.exports = mongoose.model('Story', Story, 'storeys') // ( ModelName, Schema, CollectionName )

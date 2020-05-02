const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Vehicle = Schema({
  storyNum: {
    type: Number
  },
  type: {
    type: String,
    enum: ['B', 'C', 'M'] // Bus, Car, Motorcycle
  },
  registrationNumber: {
    type: String
  },
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story'
  },
  rowIndex: {
    type: Number
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Vehicle', Vehicle) // ( ModelName, Schema, CollectionName )

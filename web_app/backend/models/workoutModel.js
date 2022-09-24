const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({

  Temperature:{
    type:Number
  },
  Humidity:{
    type:Number
  },
  UV:{
    type:Number
  },
  Light_Intensity:{
    type:Number
  },
  
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)
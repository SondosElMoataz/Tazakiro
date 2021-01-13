const mongoose = require('mongoose');

const { Schema } = mongoose;

const stadiumSchema = new Schema({
  
    name: {
    type: String,
    required: true,
    trim: true,
  }, 
  row: {
    type: Number,
    required: true,
  },
  col: {
    type: Number,
    required: true,
  },

  city: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  ///----------------
  seats: {
    type: [{type:Number}]
  },
  
  seatsAvailable: {
    type: Number
  }

});



const Stadium = mongoose.model('Stadium', stadiumSchema);

module.exports = Stadium;
const mongoose = require('mongoose');

const { Schema } = mongoose;

const stadiumSchema = new Schema({
  
  name: {
    type: String,
    required: true,
    trim: true,
  }, 
  row: { //numberr rows
    type: Number,
    required: true,
  },
  col: {  // no seats per row
    type: Number,
    required: true,
  },

  city: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  }
});



const Stadium = mongoose.model('Stadium', stadiumSchema);

module.exports = Stadium;
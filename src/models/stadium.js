const mongoose = require('mongoose');

const { Schema } = mongoose;

const stadiumSchema = new Schema({
  
    name: {
    type: String,
    required: true,
    trim: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },

  city: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  seats: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  
  seatsAvailable: {
    type: Number,
    required: true,
  },

});

const Stadium = mongoose.model('Stadium', stadiumSchema);

module.exports = Stadium;
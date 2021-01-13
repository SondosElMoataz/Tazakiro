const mongoose = require('mongoose');
const { Schema } = mongoose;
const reservationSchema = new Schema({

  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  },
  seats: {  // seat reserved , seats el howa ekhtrha
    type: [Schema.Types.Mixed],
    required: true,
  },
  matchId: {
    type: Schema.Types.ObjectId,
    ref: 'Match',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref : 'User',
    required: true,
  }
  
  
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
const mongoose = require('mongoose');
const { Schema } = mongoose;
const reservationSchema = new Schema({

  date: {
    type: Date,
    required: true,
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
  },
  ticketNumber : {
    type: Number,
  }
  
  
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
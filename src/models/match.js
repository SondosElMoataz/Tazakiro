const mongoose = require('mongoose');

const { Schema } = mongoose;
const matchSchema = new Schema({
  
  homeTeam : {
      type: String,
      required:true,
  },
  awayTeam : {
    type: String,
    required:true,
    },
  matchVenue : {
    type: Schema.Types.ObjectId,
    ref: 'Stadium',
    required: true,
  },

  Date: {
    type: Date,
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },

  mainReferee: {
    type: String,
    required: true,
  },
  twolinesmen: {
    type: [String],
    required: true,
    validate: [arrayLimit, '{PATH} exceeds the limit of 2']
    },

});

function arrayLimit(val) {
    return val.length == 2;
    }


const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
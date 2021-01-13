const Match = require(`./../models/match.js`);
const Stadium = require(`./../models/stadium.js`);

const ObjectId = require("mongodb").ObjectId;


exports.createMatch= async (req, res) => {
    try {
      const newMatch = await Match.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          match: newMatch,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  };

  exports.getMatch = async (req, res) => {
    try {
      const match = await Match.findById(req.params.id);
      const stadium = await Stadium.findById(match.matchVenue);
      res.status(200).json({
        status: "success",
        data: {
          match,
          stadium:row,
          stadium:col,
        }
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({
        status: "fail",
        message: err.message
      });
    }
  };

  exports.getAllReservations = async (req, res) => {
    try {
      const match = await Match.findById(req.params.id);
      const seats = await match.seats;
      res.status(200).json({
        status: "success",
        data: {
          match:seats,
        }
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({
        status: "fail",
        message: err.message
      });
    }
  };


  exports.getAllMatches = async (req, res) => {
    try {
      const matches = await Match.find();
      res.status(200).json({
        status: "success",
        data: {
          matches
        }
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({
        status: "fail",
        message: err.message
      });
    }
  };


  
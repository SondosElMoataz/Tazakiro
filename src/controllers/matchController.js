const Match = require(`./../models/match.js`);
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
  
const Stadium = require(`../models/stadium.js`);
const ObjectId = require("mongodb").ObjectId;


exports.createStadium= async (req, res) => {
    try {
      const newStadium = await Stadium.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          stadium: newStadium,
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
  
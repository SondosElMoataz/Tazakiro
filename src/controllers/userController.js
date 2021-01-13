const User = require(`./../models/user.js`);
const ObjectId = require("mongodb").ObjectId;
const Match = require(`./../models/match.js`);
const Stadium = require(`../models/stadium.js`);


var number_of_site_admin = 0

exports.createUser= async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          user: newUser,
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
  
//----------------------------------------------------------------------------MANAGER
//1)Create a new match event
  exports.createNewMatch= async (req, res) => {
    try {
      console.log(req.query.id)
      const IN_User= await User.findById(req.query.id);
      console.log(IN_User)
      if(IN_User!==null)
      {
        if(IN_User.role == "manager")
        {
          const newMatch = await Match.create(req.body);
          res.status(201).json({
            status: "success",
            data: {
              match: newMatch,
            },
          });
        }else{
          var err= " not a manager";
          throw err;
        }
      }else{
        var err= "user not found";
        throw err;
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  };

  //2)edit any match 
  exports.editMatch= async (req, res) => {
    try {
      const IN_User= await User.findById(req.query.id);

      if(IN_User!==null)
      {
        if(IN_User.role == "manager")
        {
          console.log("hi")
          const match = await Match.findByIdAndUpdate(req.query.id1, req.body);
          console.log(match)
          if(match!==null)
          {
            res.status(200).json({
              status: "success",
              data: {match}
            });
          }else{
            var err ="invalid match id";
            throw err;
          }
        }else{
          var err= " not a manager";
          throw err;
        }
      }else{
        var err= "user not found";
        throw err;
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  };


//3)Create a new stadium event
exports.createNewStadium= async (req, res) => {
  try {
    console.log(req.query.id)
    const IN_User= await User.findById(req.query.id);
    console.log(IN_User)
    if(IN_User!==null)
    {
      if(IN_User.role == "manager")
      {
        const newStadium = await Stadium.create(req.body);
        res.status(201).json({
          status: "success",
          data: {
            stadium: newStadium,
          },
        });
      }else{
        var err= " not a manager";
        throw err;
      }
    }else{
      var err= "user not found";
      throw err;
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
const User = require(`./../models/user.js`);
const ObjectId = require("mongodb").ObjectId;
const Match = require(`./../models/match.js`);
const Stadium = require(`../models/stadium.js`);
const jwt = require("jsonwebtoken");


var number_of_site_admin = 0
//----------------------------------------------------------------------------Guest
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

//----------------------------------------------------------------------------SITE ADMIN
exports.getAllUsers= async (req, res) => {
  try 
  {
    const IN_User= await User.findById(req.query.id);
    if(IN_User!==null)
    {
      if(IN_User.role == "siteAdmin")
      {
        const users = await User.find();
        var users_arr = []
        for (var i=0 ;i<users.length;i++)
        {
          console.log(req.query.id)
          console.log(users[i].id)
          if(users[i].id != req.query.id )
          {
            users_arr.push(users[i])
          }
        }

        if(users_arr!==null)
        {
          res.status(200).json({
            status: "success",
            data : users_arr
          });
        }else{
          var err ="invalid users id";
          throw err;
        }
      }
      else{
        var err ="not a site admin";
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


exports.removeUser= async (req, res) => {
  try 
  {
    const IN_User= await User.findById(req.query.id);
    if(IN_User!==null)
    {
      if(IN_User.role == "siteAdmin")
      {
        const user = await User.findById(req.params.id);
        if(user!==null)
        {
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json({
            status: "success"
          });
        }else{
          var err ="invalid user id";
          throw err;
        }
      }
      else{
        var err ="not a site admin";
        throw err;
      }
    }else{
      var err= "admin not found";
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



exports.getUnAuthorizedUsers= async (req, res) => {
  try 
  {
    const IN_User= await User.findById(req.query.id);
    if(IN_User!==null)
    {
      if(IN_User.role == "siteAdmin")
      {
        const users = await User.find();
        var non_auth = []
        for( var i =0;i<users.length;i++)
        {
          if(users[i].authorized == false)
          {
            non_auth.push(users[i])
          }
        } 
        if(non_auth!==null)
        {
          res.status(200).json({
            status: "success",
            data : non_auth
          });
        }else{
          var err ="invalid match id";
          throw err;
        }
      }
      else{
        var err ="not a site admin";
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

exports.approveUsers= async (req, res) => {
  try 
  {
    const IN_User= await User.findById(req.query.id);
    if(IN_User!==null)
    {
      if(IN_User.role == "siteAdmin")
      {
        const user = await User.findById(req.params.id);
        if(user!==null)
        {
          await User.findByIdAndUpdate(req.params.id,{ $set:{authorized: true} });
          res.status(200).json({
            status: "success"
          });
        }else{
          var err ="invalid match id";
          throw err;
        }
      }
      else{
        var err ="not a site admin";
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

//----------------------------------------------------------------------------MANAGER
//1)Create a new match event
  exports.createNewMatch= async (req, res) => {
    try {
      const IN_User= await User.findById(req.query.id);
      if(IN_User!==null)
      {
        if(IN_User.role == "manager" && IN_User.authorized == true )
        {
          const newMatch = await Match.create(req.body);
          if(newMatch.Date >= Date.now )
          {
            res.status(201).json({
              status: "success",
              data: {
                match: newMatch,
              },
            });
          }else{
            var err= " not a valid date";
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

  //2)edit any match 
  exports.editMatch= async (req, res) => {
    try {
      const IN_User= await User.findById(req.query.id);

      if(IN_User!==null)
      {
        if(IN_User.role == "manager" && IN_User.authorized == true )
        {
          const match = await Match.findByIdAndUpdate(req.params.id, req.body);
          console.log(match)
          if(match!==null)
          {
            res.status(200).json({
              status:  "success",
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
      if(IN_User.role == "manager" && IN_User.authorized == true )
      {
        if(req.body.row < 20 && req.body.col <20)
        {
          const newStadium = await Stadium.create(req.body);
          res.status(201).json({
            status: "success",
            data: {
              stadium: newStadium,
            },
          });
        }else{
          var err= " exceeded limit for row/col";
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


//4) View match details
exports.viewMatchDetails= async (req, res) => {
  try {
    const IN_User= await User.findById(req.query.id);
    if(IN_User!==null)
    {
      if(IN_User.role == "manager" && IN_User.authorized == true  )
      {
        const matches = await Match.find();
        if(matches!==null)
        {
          res.status(200).json({
            status: "success",
            data : matches
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





//___________________CUSTOMERSS __FANS __________________________//

///__GET USER__//


exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    }
    if (!user) return res.sendStatus(404);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Id not found",
      error: err.message,
    });
  }
};

//_______UPDATE__USER__//
exports.updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["firstname",
  "lastname",
  "birthdate",
  "gender",
  "city",
  "address",
  "email",
  "password",];

  const isValidOperation = updates.every((update) =>allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).json({
      status: "fail",
      message: "Bad Request",
    });
  }
  try {    
    const user = await User.findById(req.params.id);
    updates.forEach((update) => {
      user[update] = req.body[update]
    })
    await user.save();
  }catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }


};



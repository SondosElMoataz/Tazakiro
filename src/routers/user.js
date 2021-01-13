const express = require('express');
const router = new express.Router();

const userontroller = require(`./../controllers/userController`); 

router
  .route("/")
  .post(userontroller.createUser);

router
  .route("/createMatch/")
  .post(userontroller.createNewMatch);

router
  .route("/editMatch/")
  .patch(userontroller.editMatch);

router
  .route("/addStadium/")
  .post(userontroller.createNewStadium);


  router
  .route("/:id")
  .get(auth,userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router
  .route("/viewMatch/")
  .get(userontroller.viewMatchDetails);

  
  module.exports = router;
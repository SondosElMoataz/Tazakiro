const express = require('express');
const router = new express.Router();

const userController = require(`./../controllers/userController`); 

router
  .route("/")
  .post(userController.createUser);

router
  .route("/createMatch/")
  .post(userController.createNewMatch);

router
  .route("/editMatch/:id")
  .patch(userController.editMatch);

router
  .route("/addStadium/")
  .post(userController.createNewStadium);

router
  .route("/viewMatch/")
  .get(userController.viewMatchDetails);


router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)


  module.exports = router;
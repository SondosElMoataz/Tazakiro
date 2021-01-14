const express = require('express');
const router = new express.Router();

const userController = require(`./../controllers/userController`); 

///-----GUEST
router
  .route("/")
  .post(userController.createUser);

//-------MANAGER
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

//------SITE ADMIN
router
  .route("/siteAdmin/")
  .get(userController.getUnAuthorizedUsers)

router
  .route("/siteAdmin/getUsers/")
  .get(userController.getAllUsers)
router
  .route("/siteAdmin/:id")
  .patch(userController.approveUsers)
  .delete(userController.removeUser)

//--------
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)

router
  .route("/viewMatch/")
  .get(userController.viewMatchDetails);

  router
  .route('/login')
  .post(userController.login);


  module.exports = router;
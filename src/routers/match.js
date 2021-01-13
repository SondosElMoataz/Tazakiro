const express = require('express');
const router = new express.Router();

const matchController = require(`./../controllers/matchController`); 

router
  .route("/")
  .post(matchController.createMatch);

  router
  .route("/reservations/:matchid")
  .get(matchController.getAllReservations);

  router
  .route("/:id") 
  .get(matchController.getMatch);


  module.exports = router;
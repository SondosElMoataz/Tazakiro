const express = require('express');
const router = new express.Router();

const reservationController = require(`./../controllers/reservationController`); 


router
  .route("/")
  .post(reservationController.createReservation);


router
  .route("/:reservationId")
  .delete(reservationController.deleteReservation)
  // .get(reservationController.getReservation)
  ;







  module.exports = router;
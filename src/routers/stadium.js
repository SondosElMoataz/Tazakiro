const express = require('express');
const router = new express.Router();

const stadiumController = require(`./../controllers/stadiumController`); 

router
  .route("/")
  .post(stadiumController.createStadium);

  module.exports = router;
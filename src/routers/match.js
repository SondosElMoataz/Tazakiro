const express = require('express');
const router = new express.Router();

const matchController = require(`./../controllers/matchController`); 

router
  .route("/")
  .post(matchController.createMatch);

  module.exports = router;
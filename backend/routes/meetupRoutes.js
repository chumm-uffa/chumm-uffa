const express = require('express');
const router = express.Router();
const meetup = require('../controller/meetupController.js');

router.get("/", meetup.getMeetings);

module.exports = router;
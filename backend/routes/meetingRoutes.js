const express = require('express');
const router = express.Router();
const meeting = require('../controller/meetingController.js');

router.get("/", meeting.getMeetings);

module.exports = router;
const store = require('../services/meetupStore.js');
const util = require('../util/security');


module.exports.getMeetings = function(req, res)
{
    store.all(util.current(req), function (err, meetups) {
        res.json(meetups || {});
    });
};
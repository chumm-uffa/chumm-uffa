const store = require('../services/meetingStore.js');
const util = require('../util/security');


module.exports.getMeetings = function(req, res)
{
    store.all(util.current(req), function (err, meetings) {
        res.json(meetings || {});
    })
};
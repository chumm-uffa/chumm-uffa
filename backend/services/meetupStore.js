const Datastore = require('nedb');
const db = new Datastore({ filename: './data/meetup.db', autoload: true });

function publicAll(currentUser, callback)
{
    db.find({user : currentUser}).exec(function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {all : publicAll};
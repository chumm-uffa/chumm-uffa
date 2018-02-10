/**
 * chumm-uffa
 */
import {Model, Schema} from 'mongoose';
import {mongoose} from '../../app';

import {Meetup, User} from '@chumm-uffa/interface';
import {DBUser} from '../user/model';
import {DBHall} from '../hall/model';
import {DBChat} from '../chat/model';
import {DBMeetupRequest} from '../meetup-request/model';
import {IDBModelBase} from '../models';
import {DBLocation, locationSchema} from '../location/model';

/**
 * The DBUser document interface
 */
export interface IDBMeetup {
    owner: string;
    from: Date;
    to: Date;
    activity?: string;
    outdoor?: string;
    indoor?: string;
    location: {
        type: string,
        coordinates: number[]
    }
}

/**
 * The DBMeetup model containing additional functionality
 */
export interface IDBMeetupModel extends IDBModelBase, IDBMeetup {
    fromInterface(meetup: Meetup);
    getNumberOfRequest();
    getNumberOfParticipant();
}

/**
 * The mongoose database schema for the DBMeetup
 * @type {"mongoose".Schema}
 */
export const MeetupSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    activity: {
        type: String
    },
    outdoor: {
        type: String
    },
    indoor: {
        type: Schema.Types.ObjectId,
        ref: 'Hall',
    },
    location: {
        type: locationSchema,
        required:true
    },
    createAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

/**
 * Population option for meetup
 * @type {[{path: string} , {path: string}]}
 */
export const MeetupPopulate = [{path: 'owner'}];

/**
 * Pre function when save a new meetup. The creation date is set.
 */
MeetupSchema.pre('save', function (next) {
    this.createAt = Date.now();
    next();
});

/**
 * Pre function when update an existing meetup. The update date is set.
 */
MeetupSchema.pre('update', function (next) {
    this.updatedAt = Date.now();
    next();
});

/**
 * Pre function when remove an existing meetup. Will delete all referenced document
 */
MeetupSchema.pre('remove', function (next) {
    DBChat.remove({meetup: this.id}).exec();
    DBMeetupRequest.remove({meetup: this.id}).exec();
    next();
});

/**
 * Pre function to validate the owner id
 */
MeetupSchema.path('owner').validate(function (owner, respond) {
    DBUser.findById(owner, function (err, dbUser) {
        if (err || !dbUser) {
            respond(false);
        } else {
            respond(true);
        }
    });

}, 'Owner non existent');

/**
 * Pre function to validate the indoor key
 */
MeetupSchema.path('indoor').validate(function (indoor, respond) {
    if (!indoor) {
        respond(true);
    }

    DBHall.findById(indoor, function (err, dbHall) {
        if (err || !dbHall) {
            respond(false);
        } else {
            respond(true);
        }
    });

}, 'Indoor non existent');


/**
 * Merge the given interface user to this
 */
MeetupSchema.methods.fromInterface = function (meetup: Meetup) {
    this.owner = meetup.owner.id;
    this.from = meetup.from;
    this.to = meetup.to;
    this.activity = meetup.activity;
    this.outdoor = meetup.outdoor;
    this.indoor = meetup.indoor;
    this.location = {type: 'Point', coordinates: [meetup.latitude, meetup.longitude]};
};

/**
 *
 * @returns {Promise<void>}
 */
MeetupSchema.methods.toInterface = async function () {
    const dbMeetup = this;
    let owner = dbMeetup.owner ? await dbMeetup.owner.toInterface(): null;
    let request = await dbMeetup.getNumberOfRequest();
    let participant = await dbMeetup.getNumberOfParticipant();
    return new Meetup(
        dbMeetup._id.toString(),
        owner,
        dbMeetup.from,
        dbMeetup.to,
        dbMeetup.outdoor,
        dbMeetup.indoor,
        dbMeetup.activity,
        request,
        participant,
        dbMeetup.location.coordinates[0],
        dbMeetup.location.coordinates[1]
    );
};


/**
 * Gets the number of open meetup-request
 * @returns {Promise<number>}
 */
MeetupSchema.methods.getNumberOfRequest = function ( ) {
    return DBMeetupRequest.count({meetup: this.id, state: 'OPEN' }).exec();
};

/**
 * Gets the number of accepted meetup-request
 * @returns {Promise<number>}
 */
MeetupSchema.methods.getNumberOfParticipant = function ( ) {
    return DBMeetupRequest.count({meetup: this.id, state: 'ACCEPT' }).exec();
};

export const DBMeetup: Model<IDBMeetupModel> = mongoose.model<IDBMeetupModel>('Meetup', MeetupSchema);

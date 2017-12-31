/**
 * chumm-uffa
 */
import { Document, Model, Schema } from 'mongoose';
import { mongoose } from '../../app';

import { Meetup } from '@chumm-uffa/interface';
import {DBUser} from "../user/model";
import {DBHall} from "../hall/model";
import {DBChat} from "../chat/model";

/**
 * The DBUser document interface
 */
export interface IDBMeetup {
    owner: string;
    from: Date;
    to: Date;
    activity: string;
    outdoor?: string;
    indoor?: string;
}

/**
 * The DBMeetup model containing additional functionality
 */
export interface IDBMeetupModel extends IDBMeetup, Document {
    fromInterface(meetup: Meetup);
    toInterface();
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
        type: String,
        required: true
    },
    outdoor: {
        type: String
    },
    indoor: {
        type: Schema.Types.ObjectId,
        ref: 'Hall',
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
export const MeetupPopulate = [{path:"owner"},{path:"indoor"}];

/**
 * Pre function when save a new meetup. The creation date is set.
 */
MeetupSchema.pre('save', function(next) {
    this.createAt = Date.now();
    next();
});

/**
 * Pre function when update an existing meetup. The update date is set.
 */
MeetupSchema.pre('update', function(next) {
    this.updatedAt = Date.now();
    next();
});

/**
 * Pre function when remove an existing meetup. Will delete all referenced document
 */
MeetupSchema.pre('remove', function(next) {
    DBChat.remove({meetup: this.id}).exec();
    // TODO hier müssen auch die meetup-request gelöscht werden!
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
MeetupSchema.methods.fromInterface = function(meetup: Meetup) {
    this.owner = meetup.owner.id;
    this.from = meetup.from;
    this.to = meetup.to;
    this.activity = meetup.activity;
    this.outdoor = meetup.outdoor;
    this.indoor = meetup.indoor.key;
};

/**
 * Merge this dbUser to a new interface user
 */
MeetupSchema.methods.toInterface = function() {
    return new Meetup(
        this._id.toString(),
        this.owner.toInterface(),
        this.from,
        this.to,
        this.outdoor,
        this.indoor.toInterface(),
        this.activity
    );
};

export const DBMeetup: Model<IDBMeetupModel> = mongoose.model<IDBMeetupModel>('Meetup', MeetupSchema);

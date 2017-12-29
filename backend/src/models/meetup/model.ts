/**
 * chumm-uffa
 */
import { Document, Model, Schema } from 'mongoose';
import { mongoose } from '../../app';

import { Meetup } from '@chumm-uffa/interface';
import {DBUser} from "../user/model";

/**
 * The DBUser document interface
 */
export interface IDBMeetup {
    owner_id: string;
    from: Date;
    to: Date;
    activity: string;
    outdoor?: string;
    indoor_id?: string;
}

/**
 * The DBMeetup model containing additional functionality
 */
export interface IDBMeetupModel extends IDBMeetup, Document {
    createMeetup(meetup: IDBMeetup): Promise<IDBMeetup>;
    fromInterface(meetup: Meetup);
    toInterface();
}

/**
 * The mongoose database schema for the DBMeetup
 * @type {"mongoose".Schema}
 */
export const MeetupSchema = new Schema({
    owner_id: {
        type: String,
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
    indoor_id: {
        type: String
    },
    createAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

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
 * Pre function to validate the owner id
 */
MeetupSchema.path('owner_id').validate(function (owner_id, respond) {

    DBUser.findById(owner_id, function (err, user) {
        if (err || !user) {
            respond(false);
        } else {
            respond(true);
        }
    });

}, 'Owner non existent');


/**
 * Merge the given interface user to this
 */
MeetupSchema.methods.fromInterface = function(meetup: Meetup) {
    this.owner_id = meetup.owner.id;
    this.from = meetup.from;
    this.to = meetup.to;
    this.activity = meetup.activity;
    this.outdoor = meetup.outdoor;
    this.indoor_id = meetup.indoor;
};

/**
 * Merge this dbUser to a new interface user
 */
MeetupSchema.methods.toInterface = function() {
    return new Meetup(
        this._id.toString(),
        this.owner_id,
        this.from,
        this.to,
        this.outdoor,
        this.indoor_id,
        this.activity
    );
};

export const DBMeetup: Model<IDBMeetupModel> = mongoose.model<IDBMeetupModel>('Meetup', MeetupSchema);

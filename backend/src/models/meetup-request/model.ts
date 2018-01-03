/**
 * chumm-uffa
 */
import {Document, Model, Schema} from 'mongoose';
import {mongoose} from '../../app';

import {Meetup, MeetupRequest, RequestStatus, User} from '@chumm-uffa/interface';
import {DBUser} from '../user/model';


/**
 * The DBUser document interface
 */
export interface IDBMeetupRequest {
    meetup: Meetup;
    participant: User;
    state: RequestStatus;
}

/**
 * The DBMeetup model containing additional functionality
 */
export interface IDBMeetupRequestModel extends IDBMeetupRequest, Document {
    fromInterface(meetupRequest: MeetupRequest);

    toInterface();
}

/**
 * The mongoose database schema for the DBMeetupRequest
 * @type {"mongoose".Schema}
 */
export const MeetupRequestSchema = new Schema({
    meetup: {
        type: Schema.Types.ObjectId,
        ref: 'meetup',
        required: true
    },
    participant: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    state: {
        type: RequestStatus
    },
    createAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

/**
 * Population option for meetupRequest
 * @type {[{path: string} , {path: string}]}
 */
export const MeetupRequestPopulate = [{path: 'participant'}, {path: 'meetup'}];

/**
 * Pre function when save a new meetup. The creation date is set.
 */
MeetupRequestSchema.pre('save', function (next) {
    this.createAt = Date.now();
    next();
});

/**
 * Pre function when update an existing meetup. The update date is set.
 */
MeetupRequestSchema.pre('update', function (next) {
    this.updatedAt = Date.now();
    next();
});

/**
 * Pre function to validate the participant id
 */
MeetupRequestSchema.path('participant').validate(function (owner, respond) {

    DBUser.findById(owner, function (err, dbUser) {
        if (err || !dbUser) {
            respond(false);
        } else {
            respond(true);
        }
    });

}, 'participant non existent');

/**
 * Merge the given interface user to this
 */
MeetupRequestSchema.methods.fromInterface = function (meetupRequest: MeetupRequest) {
    this.participant = meetupRequest.participant.id;
    this.meetup = meetupRequest.meetup.id;
    this.state = meetupRequest.status;
};

/**
 * Merge this dbUser to a new interface user
 */
MeetupRequestSchema.methods.toInterface = function () {
    return new MeetupRequest(
        this._id.toString(),
        this.participant.toInterface(),
        this.meetup.toInterface(),
        this.state
    );
};

export const DBMeetupRequest: Model<IDBMeetupRequestModel> = mongoose.model<IDBMeetupRequestModel>('MeetupRequest', MeetupRequestSchema);

/**
 * chumm-uffa
 */
import {Model, Schema} from 'mongoose';
import {mongoose} from '../../app';

import {Meetup, MeetupRequest, RequestStatus, User} from '@chumm-uffa/interface';
import {DBUser} from '../user/model';
import {DBMeetup} from '../meetup/model';
import {IDBModelBase} from '../models';


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
export interface IDBMeetupRequestModel extends IDBModelBase, IDBMeetupRequest{
    fromInterface(meetupRequest: MeetupRequest);
}

/**
 * The mongoose database schema for the DBMeetupRequest
 * @type {"mongoose".Schema}
 */
export const MeetupRequestSchema = new Schema({
    meetup: {
        type: Schema.Types.ObjectId,
        ref: 'Meetup',
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
export const MeetupRequestPopulate = [{path: 'participant'}, {path: 'meetup', populate: { path: 'owner'}}];

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
 * Pre function to validate the meetup id
 */
MeetupRequestSchema.path('meetup').validate(function (meetup, respond) {

    DBMeetup.findById(meetup, function (err, dbMeetup) {
        if (err || !dbMeetup) {
            respond(false);
        } else {
            respond(true);
        }
    });

}, 'Meetup non existent');


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

}, 'Participant non existent');

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
 * @returns {Promise<any>}
 */
MeetupRequestSchema.methods.toInterface = function () {
    const dbRequest = this;
    return new Promise( (resolve) => {
        let participant: Promise<User> = dbRequest.participant ? Promise.resolve(dbRequest.participant.toInterface())
            : Promise.resolve(null);
        let meetup: Promise<Meetup> = dbRequest.meetup ? Promise.resolve(dbRequest.meetup.toInterface())
            : Promise.resolve(null);
        Promise.all([participant, meetup]).
        then(results => {
            let request: MeetupRequest = new MeetupRequest(
                dbRequest._id.toString(),
                results[0],
                results[1],
                dbRequest.state
            );
            resolve(request);
        }).catch(() => {
            let request: MeetupRequest = new MeetupRequest(
                dbRequest._id.toString(),
                null,
                null,
                dbRequest.state
            );
            resolve(request);
        });
    });
};

export const DBMeetupRequest: Model<IDBMeetupRequestModel> = mongoose.model<IDBMeetupRequestModel>('MeetupRequest', MeetupRequestSchema);

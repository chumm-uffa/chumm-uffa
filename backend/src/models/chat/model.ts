/**
 * chumm-uffa
 */
import { Model, Schema } from 'mongoose';
import { mongoose } from '../../app';

import { Chat, User } from '@chumm-uffa/interface';
import {DBMeetup} from '../meetup/model';
import {DBUser} from '../user/model';
import {IDBModelBase} from '../models';

/**
 * The DBChat document interface
 */
export interface IDBChat {
    meetup: string;
    speaker: User;
    text: string;
    date: Date;
}

/**
 * The DBChat model containing additional functionality
 */
export interface IDBChatModel extends IDBModelBase, IDBChat{
    fromInterface(chat: Chat);
}

/**
 * The mongoose database schema for the DBChat
 * @type {"mongoose".Schema}
 */
export const ChatSchema = new Schema({
    meetup: {
        type: Schema.Types.ObjectId,
        ref: 'Meetup',
        required: true
    },
    speaker: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    createAt: {
        type: Date
    },
});

/**
 * Population option for chat
 * @type {[{path: string} , {path: string}]}
 */
export const ChatPopulate = [{path:'meetup'},{path:'speaker'}];

/**
 * Pre function when save a new meetup. The creation date is set.
 */
ChatSchema.pre('save', function(next) {
    this.createAt = Date.now();
    next();
});



/**
 * Pre function to validate the speaker id
 */
ChatSchema.path('speaker').validate(function (speaker, respond) {

    DBUser.findById(speaker, function (err, dbUser) {
        if (err || !dbUser) {
            respond(false);
        } else {
            respond(true);
        }
    });

}, 'Speaker non existent');

/**
 * Pre function to validate the meetup id
 */
ChatSchema.path('meetup').validate(function (meetup, respond) {

    DBMeetup.findById(meetup, function (err, dbMeetup) {
        if (err || !dbMeetup) {
            respond(false);
        } else {
            respond(true);
        }
    });

}, 'Meetup non existent');


/**
 * Merge the given interface chat to this
 */
ChatSchema.methods.fromInterface = function(chat: Chat) {
    this.text = chat.text;
    this.speaker = chat.speaker.id;
    this.date = chat.date;
};

/**
 * Merge this chat to a new interface user
 */
ChatSchema.methods.toInterface = function() {
    const dbChat = this;
    return new Promise( (resolve) => {
        let speaker: Promise<User> = Promise.resolve(dbChat.speaker.toInterface());
        let chat: Chat = new Chat(
            dbChat._id.toString(),
            dbChat.text,
            null,
            dbChat.date
        );
        Promise.all([speaker]).
        then(results => {
            chat.speaker = results[0];
            resolve(chat);
        }).catch(() => {
            resolve(chat);
        });
    });
};

export const DBChat: Model<IDBChatModel> = mongoose.model<IDBChatModel>('Chat', ChatSchema);

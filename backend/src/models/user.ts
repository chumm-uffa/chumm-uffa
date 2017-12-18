/**
 * chumm-uffa
 */
import * as bcrypt from 'bcryptjs';
import {  Document, Model, model, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

export interface IUserModel {
    createUser(user: IUser, callback: Function): void;
    comparePassword(candidatePassword: string, hash: string, callback: Function): void;
    findByEmail(email: string, callback: Function): void;
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        "default": Date.now()
    },
    updatedAt: {
        type: Date,
        "default": Date.now()
    }
});

userSchema.static('createUser', (user: IUser, callback: Function) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) { throw err; }
            user.password = hash;
            user.save((err, user) => {
                callback(err, user);
            });
        });
    });
});

userSchema.static('comparePassword', (candidatePassword: string, hash: string, callback: Function) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) { throw err; }
        callback(null, isMatch);
    });
});

userSchema.methods.comparePassword = (email: string, candidatePassword: string, callback: Function) => {
    User.findByEmail(email, (err, user) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) { throw err; }
            callback(null, isMatch);
        });
    });
}

userSchema.static('findByEmail', (email: string, callback: Function) => {
    User.findOne({email: email}, callback);
});

export type UserModel = Model<IUser> & IUserModel & IUser;

export const User: UserModel = <UserModel> model<IUser>('User', userSchema);

/**
 * chumm-uffa
 */
import * as bcrypt from 'bcryptjs';
import {  Document, Model, Schema } from 'mongoose';
import { mongoose } from '../../app';

/**
 * The User document interface
 */
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    sex?: string;
    weight?: string;
}

/**
 * The User model containing additional functionality
 */
export interface IUserModel extends Model<IUser> {
    createUser(user: IUser): Promise<IUser>;
    comparePassword(candidatePassword: string, hash: string): void;
    findByEmail(email: string): Promise<IUser>;
}

/**
 * The mongoose database schema for the User
 * @type {"mongoose".Schema}
 */
const userSchema = new Schema({
    username: {
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
    sex: {
        type: String
    },
    weight: {
        type: String
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

/**
 * Static function to create a new User within the database
 */
userSchema.static('createUser', (user: IUser) => {
    const hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    user.password = hash;
    return user.save();
});

/**
 * Static function to compare the password
 */
userSchema.static('comparePassword', (candidatePassword: string, hash: string, callback: Function) => {
    return bcrypt.compareSync(candidatePassword, hash);
});

/**
 * Static function to find a user by email
 */
userSchema.static('findByEmail', (email: string) => {
    return User.findOne({email: email}).lean().exec();
});

export const User = mongoose.model<IUser>('User', userSchema) as IUserModel;

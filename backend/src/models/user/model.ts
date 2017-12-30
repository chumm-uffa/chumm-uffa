/**
 * chumm-uffa
 */
import * as bcrypt from 'bcryptjs';
import { Document, Model, Schema } from 'mongoose';
import { mongoose } from '../../app';

import { User } from '@chumm-uffa/interface';
import * as uniqueValidator from 'mongoose-unique-validator';

/**
 * The DBUser document interface
 */
export interface IDBUser {
    username: string;
    password: string;
    email?: string;
    sex?: string;
    weight?: string;
}

/**
 * The DBUser model containing additional functionality
 */
export interface IDBUserModel extends IDBUser, Document {
    createUser(user: IDBUser): Promise<IDBUser>;
    comparePassword(candidatePassword: string): void;
    fromInterface(user: User);
    toInterface();
}

/**
 * The mongoose database schema for the DBUser
 * @type {"mongoose".Schema}
 */
export const UserSchema = new Schema({
    username: {
        type: String,
        unique : true,
        dropDups: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    sex: {
        type: String
    },
    weight: {
        type: String
    },
    createAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});


UserSchema.plugin(uniqueValidator);

/**
 * Pre function when save a new user. The password is hashed
 * and the creation date is set.
 */
UserSchema.pre('save', function(next) {
    const hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    this.password = hash;
    this.createAt = Date.now();
    next();
});

/**
 * Pre function when update an existing user. The update date is set.
 */
UserSchema.pre('update', function(next) {
    this.updatedAt = Date.now();
    next();
});

/**
 * Static function to compatoDBUserre the password
 */
UserSchema.methods.comparePassword = function(candidatePassword: string, callback: Function) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

/**
 * Merge the given interface user to this
 */
UserSchema.methods.fromInterface = function(user: User) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.sex = user.sex;
    this.weight = user.weight;
};

/**
 * Merge this dbUser to a new interface user
 */
UserSchema.methods.toInterface = function() {
    const user: User = new User();
    user.id = this._id.toString();
    user.username = this.username;
    user.email = this.email;
    user.password = this.password;
    user.sex = this.sex;
    user.weight = this.weight;
    return user;
};

export const DBUser: Model<IDBUserModel> = mongoose.model<IDBUserModel>('User', UserSchema);

/**
 * chumm-uffa
 */
import { Model, Schema } from 'mongoose';
import { mongoose } from '../../app';

import { Hall } from '@chumm-uffa/interface';
import * as uniqueValidator from 'mongoose-unique-validator';
import {IDBModelBase} from '../models';

/**
 * The DBHall document interface
 */
export interface IDBHall {
    name: string;
}

/**
 * The DBHall model containing additional functionality
 */
export interface IDBHallModel extends IDBModelBase, IDBHall {
}

/**
 * The mongoose database schema for the DBHall
 * @type {"mongoose".Schema}
 */
export const HallSchema = new Schema({
    name: {
        type: String,
        unique : true,
        dropDups: true,
        required: true
    },
});

HallSchema.plugin(uniqueValidator);

/**
 * Merge this dbHall to a new interface user
 */
HallSchema.methods.toInterface = function() {
    const dbHall = this;
    return new Promise( (resolve) => {
        let hall: Hall = new Hall(
            dbHall._id.toString(),
            dbHall.name
        );
        resolve(hall);
    });
};

export const DBHall: Model<IDBHallModel> = mongoose.model<IDBHallModel>('Hall', HallSchema);

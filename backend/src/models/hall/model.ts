/**
 * chumm-uffa
 */
import { Document, Model, Schema } from 'mongoose';
import { mongoose } from '../../app';

import { Hall } from '@chumm-uffa/interface';
import * as uniqueValidator from 'mongoose-unique-validator';

/**
 * The DBHall document interface
 */
export interface IDBHall {
    name: string;
}

/**
 * The DBHall model containing additional functionality
 */
export interface IDBHallModel extends IDBHall, Document {
    toInterface();
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
    return new Hall(
        this._id.toString(),
        this.name
    );
};

export const DBHall: Model<IDBHallModel> = mongoose.model<IDBHallModel>('Hall', HallSchema);

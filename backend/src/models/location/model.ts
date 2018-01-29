/**
 * chumm-uffa
 */
import { Model, Schema } from 'mongoose';
import { mongoose } from '../../app';
import {IDBModelBase} from '../models';

export interface IDBLocation {
    type: string;
    coordinates: number[];
}

export interface IDBLocationModel extends IDBModelBase, IDBLocation {
}

/**
 * latitude: Breitengrad
 * longitude : Längengrad
 * coordinates[latitude, longitude]
 * @type {"mongoose".Schema}
 */
export const locationSchema = new Schema({
    type: {type: String},
    coordinates: []
},{_id:false});


export const DBLocation: Model<IDBLocationModel> = mongoose.model<IDBLocationModel>('LocationModel',locationSchema);


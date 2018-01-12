/**
 * chumm-uffa
 *
 * This serves as the interface of all models
 */

import { Document } from 'mongoose';
/**
 * The Base interface for DBModle
 */
export interface IDBModelBase extends Document {
    toInterface(): Promise<any>;
}
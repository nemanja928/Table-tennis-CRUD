import * as mongoose from 'mongoose';
import * as fromInterface from './index';

export interface IResult extends mongoose.Document {
    score: string;
    description: string;
    teams: fromInterface.IUser[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: fromInterface.IUser;
    modifiedBy: fromInterface.IUser;
}

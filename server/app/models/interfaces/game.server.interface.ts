import * as mongoose from 'mongoose';
import * as fromInterfaces from './index';

export interface IGame extends mongoose.Document {
    name: string;
    description: string;
    teams: fromInterfaces.IUser[];
    teamsObject?: fromInterfaces.IUser[];
    score: [
        {
            teamId: string;
            teamName: string;
            teamPoints: string;
        }
    ];
    winner: fromInterfaces.IUser;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: fromInterfaces.IUser;
    modifiedBy: fromInterfaces.IUser;
}

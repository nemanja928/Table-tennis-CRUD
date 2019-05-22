import * as mongoose from 'mongoose';
import * as fromInterfaces from './index';

export interface IRole extends mongoose.Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: fromInterfaces.IUser;
  modifiedBy: fromInterfaces.IUser;
}

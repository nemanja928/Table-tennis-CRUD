import * as mongoose from 'mongoose';
import * as fromInterfaces from './interfaces/index';

export const RoleSchema: mongoose.Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        modifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            required: false
        },
        updatedAt: {
            type: Date,
            required: false
        }
    }
);

export default mongoose.model<fromInterfaces.IRole>('Role', RoleSchema);

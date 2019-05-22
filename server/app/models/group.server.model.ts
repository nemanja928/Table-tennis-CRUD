import * as mongoose from 'mongoose';
import * as fromInterfaces from './interfaces/index';

export const GroupSchema: mongoose.Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        active: {
            type: Boolean,
            required: true
        },
        teams: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        ],
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
        score: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Game',
                required: false
            }
        ],
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

export default mongoose.model<fromInterfaces.IGroup>('Group', GroupSchema);

import * as mongoose from 'mongoose';
import * as fromInterfaces from './interfaces/index';

export const ResultSchema: mongoose.Schema = new mongoose.Schema(
    {
        score: {
            type: String,
            required: false,
            default: '0 - 0'
        },
        description: {
            type: String,
            required: false
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

export default mongoose.model<fromInterfaces.IResult>('Result', ResultSchema);

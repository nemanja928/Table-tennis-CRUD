import * as mongoose from 'mongoose';
import * as fromInterfaces from './interfaces/index';

export const CupSchema: mongoose.Schema = new mongoose.Schema({
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
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    second: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    third: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    groups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
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
});

export default mongoose.model<fromInterfaces.ICup>('Cup', CupSchema);

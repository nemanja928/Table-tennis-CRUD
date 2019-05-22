import * as mongoose from 'mongoose';
import * as fromInterfaces from './interfaces/index';

export const GameSchema: mongoose.Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        score: [
            {
                teamId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: false
                },
                teamName: {
                    type: String,
                    required: false
                },
                teamPoints: {
                    type: String,
                    required: false
                }
            }
        ],
        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
        teams: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        ],
        active: {
            type: Boolean,
            required: true,
            default: true
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

export default mongoose.model<fromInterfaces.IGame>('Game', GameSchema);

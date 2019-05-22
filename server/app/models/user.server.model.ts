import * as mongoose from 'mongoose';
import * as fromInterfaces from './interfaces/index';

export const UserSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        lowercase: true,
        required: [true, 'Field is required'],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: [3, 'Minimum 3 Characters Long']
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Field is required'],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
        unique: true
    },
    active: {
        type: Boolean,
        required: true
    },
    DoB: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: String,
        required: true
    },
    role: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
            required: true
        }
    ],
    winRatio: {
        type: String,
        required: false
    },
    // games: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Game',
    //         required: false
    //     }
    // ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    createdAt: {
        type: Date,
        required: false
    },
    updatedAt: {
        type: Date,
        required: false
    }
});

export default mongoose.model<fromInterfaces.IUser>('User', UserSchema);

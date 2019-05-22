//#region Imports
import { Request } from 'express';
import GroupModel from '../../models/group.server.model';
import * as fromInterfaces from './../../models/interfaces/index';
//#endregion

export default class GroupDBCalls {
    public findGroup() {
        return new Promise(resolve => {
            try {
                GroupModel.find()
                    .populate(
                        'teams score createdBy modifiedBy',
                        '-password -__v'
                    )
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public findGroupById(req: Request) {
        return new Promise(resolve => {
            try {
                GroupModel.findById(req.params.id)
                    .populate(
                        'teams score createdBy modifiedBy',
                        '-password -__v'
                    )
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public findGroupByName(name) {
        return new Promise(resolve => {
            try {
                GroupModel.findOne({ name })
                    .populate(
                        'teams score createdBy modifiedBy',
                        '-password -__v'
                    )
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public createGroup(group: fromInterfaces.IGroup) {
        return new Promise(resolve => {
            try {
                const result: fromInterfaces.IGroup = new GroupModel({
                    name: group.name,
                    description: group.description,
                    active: group.active,
                    teams: group.teams,
                    createdBy: group.createdBy,
                    modifiedBy: group.createdBy,
                    score: group.score
                });
                result
                    .save()
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public updateGroup(group: fromInterfaces.IGroup, req: Request) {
        return new Promise(resolve => {
            try {
                const result = {
                    name: group.name,
                    description: group.description,
                    active: group.active,
                    updatedAt: Date.now(),
                    modifiedBy: group.modifiedBy,
                    teams: group.teams,
                    score: group.score
                };
                GroupModel.findByIdAndUpdate(req.params.id, result, {
                    select: '-password',
                    upsert: false,
                    new: true
                })
                    .then(data => {
                        GroupModel.findById(data._id)
                            .populate(
                                'teams score createdBy modifiedBy',
                                '-password -__v'
                            )
                            .then(data => {
                                resolve(data);
                            })
                        // resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public deleteGroup(req: Request) {
        return new Promise(resolve => {
            try {
                GroupModel.findByIdAndRemove(req.params.id)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }
}

//#region Imports
import { Request } from 'express';
import CupModel from '../../models/cup.server.model';
import * as fromInterfaces from './../../models/interfaces/index';
//#endregion

export default class CupDBCalls {
    public findCup() {
        return new Promise(resolve => {
            try {
                CupModel.find()
                    .populate(
                        'createdBy modifiedBy winner second third',
                        '-password -__v'
                    )
                    .populate({
                        path: 'groups',
                        populate: { path: 'teams score createdBy modifiedBy' }
                    })
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

    public findCupById(req: Request) {
        return new Promise(resolve => {
            try {
                CupModel.findById(req.params.id)
                    .populate(
                        'createdBy modifiedBy winner second third',
                        '-password -__v'
                    )
                    .populate({
                        path: 'groups',
                        populate: { path: 'teams score createdBy modifiedBy' }
                    })
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

    public findCupByName(name: string) {
        return new Promise(resolve => {
            try {
                CupModel.findOne({ name })
                    .populate(
                        'groups createdBy modifiedBy winner second third',
                        '-password -__v'
                    )
                    .populate({
                        path: 'groups',
                        populate: { path: 'teams score createdBy modifiedBy' }
                    })
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

    public findCupByGroup(req: Request) {
        return new Promise(resolve => {
            try {
                CupModel.find({ groups: req.params.group })
                    .populate(
                        'createdBy modifiedBy winner second third',
                        '-password -__v'
                    )
                    .populate({
                        path: 'groups',
                        populate: { path: 'teams score createdBy modifiedBy' }
                    })
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

    public createCup(cup: fromInterfaces.ICup) {
        return new Promise(resolve => {
            try {
                const result: fromInterfaces.ICup = new CupModel({
                    name: cup.name,
                    description: cup.description,
                    active: cup.active,
                    createdBy: cup.createdBy,
                    createdAt: cup.createdAt,
                    modifiedBy: cup.createdBy,
                    updatedAt: cup.updatedAt,
                    groups: cup.groups
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

    public updateCup(cup: fromInterfaces.ICup, req: Request) {
        return new Promise(resolve => {
            try {
                const result = {
                    name: cup.name,
                    description: cup.description,
                    active: cup.active,
                    modifiedBy: cup.modifiedBy,
                    updatedAt: cup.updatedAt,
                    groups: cup.groups,
                    winner: cup.winner,
                    second: cup.second,
                    third: cup.third
                };
                CupModel.findByIdAndUpdate(req.params.id, result)
                    .then(data => {
                        CupModel.findById(data._id)
                            .populate(
                                'createdBy modifiedBy winner second third',
                                '-password -__v'
                            )
                            .populate({
                                path: 'groups',
                                populate: { path: 'teams score createdBy modifiedBy' }
                            })
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

    public deleteCup(req: Request) {
        return new Promise(resolve => {
            try {
                CupModel.findByIdAndRemove(req.params.id)
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

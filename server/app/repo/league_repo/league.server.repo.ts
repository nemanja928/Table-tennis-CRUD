//#region Imports
import { Request } from 'express';
import LeagueModel from '../../models/league.server.model';
import * as fromInterfaces from './../../models/interfaces/index';
//#endregion

export default class LeagueDBCalls {
    public findLeague() {
        return new Promise(resolve => {
            try {
                LeagueModel.find()
                    .populate(
                        'createdBy modifiedBy teams score',
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

    public findLeagueById(req: Request) {
        return new Promise(resolve => {
            try {
                LeagueModel.findById(req.params.id)
                    .populate(
                        'createdBy modifiedBy teams score',
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

    public findLeagueByName(req: Request) {
        return new Promise(resolve => {
            try {
                LeagueModel.find({ name: req.params.name })
                    .populate(
                        'createdBy modifiedBy teams score',
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

    public findLeagueByGroup(req: Request) {
        return new Promise(resolve => {
            try {
                LeagueModel.find({ groups: req.params.group })
                    .populate(
                        'createdBy modifiedBy teams score',
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

    public createLeague(league: fromInterfaces.ILeague) {
        return new Promise(resolve => {
            try {
                const result: fromInterfaces.ILeague = new LeagueModel({
                    name: league.name,
                    description: league.description,
                    active: league.active,
                    createdBy: league.createdBy,
                    modifiedBy: league.createdBy,
                    teams: league.teams
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

    public updateLeague(league: fromInterfaces.ILeague, req: Request) {
        return new Promise(resolve => {
            try {
                const result = {
                    name: league.name,
                    description: league.description,
                    active: league.active,
                    createdBy: league.createdBy,
                    modifiedBy: league.modifiedBy,
                    teams: league.teams
                };

                LeagueModel.findByIdAndUpdate(req.params.id, result)
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

    public deleteLeague(req: Request) {
        return new Promise(resolve => {
            try {
                LeagueModel.findByIdAndRemove(req.params.id)
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

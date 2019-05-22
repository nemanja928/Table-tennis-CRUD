//#region Imports
import { Request } from 'express';
import GameModel from '../../models/game.server.model';
import * as fromInterfaces from './../../models/interfaces/index';
//#endregion

export default class GameDBCalls {
    public findGame() {
        return new Promise(resolve => {
            try {
                GameModel.find()
                    .populate('teams createdBy modifiedBy', '-password -__v')
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

    public findGameById(req: Request) {
        return new Promise(resolve => {
            try {
                GameModel.findById(req.params.id)
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

    public findGameByName(name) {
        return new Promise(resolve => {
            try {
                GameModel.findOne({ name })
                    .populate('createdBy modifiedBy', '-password -__v')
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

    public findAllGameByName(name) {
        return new Promise(resolve => {
            try {
                GameModel.find({ name })
                    .populate('createdBy modifiedBy', '-password -__v')
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

    public findAllGameForUser(userId) {
        return new Promise(resolve => {
            try {
                GameModel.find({ "score.teamId": userId })
                    .populate('score team createdBy modifiedBy', '-password -__v')
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

    public findAllWinGameForUser(userId) {
        return new Promise(resolve => {
            try {
                GameModel.find({ winner: userId })
                    .populate('score team createdBy modifiedBy', '-password -__v')
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

    public createGame(game: fromInterfaces.IGame) {
        return new Promise(resolve => {
            try {
                const result: fromInterfaces.IGame = new GameModel({
                    name: game.name,
                    description: game.description,
                    score: game.score,
                    active: game.active,
                    teams: game.teams,
                    createdBy: game.createdBy,
                    modifiedBy: game.modifiedBy,
                    createdAt: game.createdAt
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

    public updateGame(game: fromInterfaces.IGame, req: Request) {
        return new Promise(resolve => {
            try {
                const gameUpdate = {
                    name: game.name,
                    description: game.description,
                    active: game.active,
                    teams: game.teams,
                    score: game.score,
                    winner: game.winner,
                    modifiedBy: game.modifiedBy,
                    updatedAt: game.updatedAt
                };
                GameModel.findByIdAndUpdate(req.params.id, gameUpdate, {
                    select: '-password',
                    upsert: false,
                    new: true
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

    public deleteGame(req: Request) {
        return new Promise(resolve => {
            try {
                GameModel.findByIdAndRemove(req.params.id)
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

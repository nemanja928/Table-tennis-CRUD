//#region Imports
import { Request, Response } from 'express';
import * as passport from 'passport';
import * as _ from 'lodash';
import GroupDBCalls from '../repo/group_repo/group.server.repo';
import GameDBCalls from '../repo/game_repo/game.server.repo';
import UserDBCalls from '../repo/user_repo/user.server.repo';
import * as fromInterfaces from './../models/interfaces/index';
import Functions from '../share/functions.server';
const { ObjectId } = require('mongodb');

const robin = require('roundrobin');

const groupDB = new GroupDBCalls();
const gameDB = new GameDBCalls();
const userDB = new UserDBCalls();
const func = new Functions();
//#endregion

export default class GroupController {
    public getGroups = (passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response) => {
            try {
                const token: string = func.getToken(req.headers);
                if (token) {
                    const group:
                        | fromInterfaces.IGroup[]
                        | any = await groupDB.findGroup();
                    if (group.length >= 0) {
                        res.status(200).json({
                            success: true,
                            group
                        });
                    } else {
                        res.status(500).json({
                            success: false,
                            msg: group
                        });
                    }
                } else {
                    return res.status(403).send({
                        success: false,
                        msg: 'User is not authenticated!'
                    });
                }
            } catch (err) {
                console.error(
                    'Unable to fetch Groups from the database, Error: ',
                    err
                );
            }
        });

    public getGroupById = (passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response) => {
            try {
                const token: string = func.getToken(req.headers);
                if (token) {
                    const group:
                        | fromInterfaces.IGroup
                        | any = await groupDB.findGroupById(req);
                    // console.log(`findGroup`);
                    // console.log(group);
                    if (group !== null) {
                        res.status(200).json({
                            success: true,
                            group
                        });
                    } else {
                        res.status(500).json({
                            success: false,
                            msg: group
                        });
                    }
                } else {
                    return res.status(403).send({
                        success: false,
                        msg: 'User is not authenticated!'
                    });
                }
            } catch (err) {
                console.error(
                    'Unable to fetch Group from the database, Error: ',
                    err
                );
            }
        });

    public getGroupsByName = (passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response) => {
            try {
                const token: string = func.getToken(req.headers);
                if (token) {
                    const group: any = await groupDB.findGroupByName(req.body.name);
                    // console.log(`findGroups`);
                    // console.log(group);
                    if (group.length > 0) {
                        res.status(200).json({
                            success: true,
                            group
                        });
                    } else {
                        res.status(500).json({
                            success: false,
                            msg: group
                        });
                    }
                } else {
                    return res.status(403).send({
                        success: false,
                        msg: 'User is not authenticated!'
                    });
                }
            } catch (err) {
                console.error(
                    'Unable to fetch Group from the database, Error: ',
                    err
                );
            }
        });

    public createGroup = (passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response) => {
            const token: string = func.getToken(req.headers);
            if (token) {
                try {
                    const user: any = await func.decodeToken(token);
                    const findGroupByName: any = await groupDB.findGroupByName(
                        req.body.name
                    );
                    if (_.isNil(findGroupByName)) {
                        const teamsArr: string[] = req.body.teams;
                        let teamsIdArr: number[] = [];
                        let teamsObjectArr: fromInterfaces.IUser[] = [];
                        for (let i: number = 0; i < teamsArr.length; i++) {
                            const findUserByUsername: any = await userDB.findUserByUsername(
                                teamsArr[i].trim(),
                                res
                            );
                            if (!_.isNil(findUserByUsername)) {
                                teamsIdArr.push(findUserByUsername._id);
                            }
                            teamsObjectArr.push(findUserByUsername);
                        }
                        const gamesArr = _.flatten(robin(teamsIdArr.length, teamsArr));
                        const gamesArrId = _.flatten(robin(teamsIdArr.length, teamsIdArr));
                        let gameObj = [];
                        for (let i = 0; i < gamesArr.length; i++) {
                            const gameName = this.generateGameNames(gamesArr[i]);
                            gameName[0] += ' - Group:' + req.body.name;
                            gameName[1] += ' - Group:' + req.body.name;
                            const temp = _.toArray(gamesArr[i]);
                            for (let j = 0; j < temp.length; j++) {
                                let teamOneName: string;
                                let teamTwoName: string;
                                let teamOneId: string;
                                let teamTwoId: string;
                                if (j === 0) {
                                    teamOneName = temp[0];
                                    teamTwoName = temp[1];
                                    teamOneId = gamesArrId[i][0];
                                    teamTwoId = gamesArrId[i][1];
                                }
                                if (j === 1) {
                                    teamOneName = temp[1];
                                    teamTwoName = temp[0];
                                    teamOneId = gamesArrId[i][1];
                                    teamTwoId = gamesArrId[i][0];
                                }
                                gameObj.push({
                                    name: gameName[j],
                                    description: '',
                                    score: [
                                        {
                                            teamId: teamOneId,
                                            teamName: teamOneName,
                                            teamPoints: '0',
                                        },
                                        {
                                            teamId: teamTwoId,
                                            teamName: teamTwoName,
                                            teamPoints: '0',
                                        }
                                    ],
                                    active: req.body.active,
                                    teamsNames: temp,
                                    teams: gamesArrId[i],
                                    createdBy: user._id,
                                    modifiedBy: user._id,
                                    createdAt: Date.now(),
                                    updatedAt: Date.now()
                                });
                            }
                        }
                        let genGame = [];
                        for (const game of gameObj) {
                            genGame.push(
                                await this.generateGames(game)
                            );
                        }
                        const genGameIds: number[] = [];
                        for (const i of genGame) {
                            genGameIds.push(i._id);
                        }
                        const group: any = {
                            name: req.body.name,
                            description: req.body.description,
                            active: req.body.active,
                            teams: teamsIdArr,
                            score: genGameIds,
                            createdBy: user._id,
                            modifiedBy: user._id
                        };
                        const createGroup: any = await groupDB.createGroup(group);
                        if (_.isNil(createGroup.message)) {
                            res.status(200).json({
                                success: true,
                                group: createGroup
                            });
                        } else {
                            res.status(500).json({
                                success: false,
                                msg: createGroup
                            });
                        }
                    } else {
                        return res.status(403).send({
                            success: false,
                            msg: 'Group with same name already exists!'
                        });
                    }
                } catch (err) {
                    console.error(
                        'Unable to connect to db and fetch all groups. Error is ',
                        err
                    );
                }
            } else {
                return res
                    .status(403)
                    .send({ success: false, msg: 'User is not authenticated!' });
            }
        });

    private generateGameNames(nameArr): string[] {
        return [nameArr[0] + ' VS ' + nameArr[1], nameArr[1] + ' VS ' + nameArr[0]]
    }

    public generateGames = (passport.authenticate('jwt', { session: false }),
        async (game) => {
            try {
                let createGame: any = [];
                createGame = await gameDB.createGame(game);
                return createGame;
            } catch (err) {
                console.error(
                    'Unable to connect to db and fetch all groups. Error is ',
                    err
                );
            }
        });

    public updateGroup = (passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response) => {
            const token: string = func.getToken(req.headers);
            if (token) {
                const user: any = await func.decodeToken(token);
                const teamsArr: any[] = req.body.teams;
                const teamsTest = [];
                const teamsTestId = [];
                for (const i of teamsArr) {
                    teamsTest.push(i.username);
                    teamsTestId.push(i._id);
                }
                const gamesArr = _.flatten(robin(teamsTest.length, teamsTest));
                const gamesArrId = _.flatten(robin(teamsTest.length, teamsTestId));
                let gameObj = [];
                for (let i = 0; i < gamesArr.length; i++) {
                    const gameName = this.generateGameNames(gamesArr[i]);
                    const findTeamByName: any = await gameDB.findAllGameByName(gameName);
                    if (findTeamByName.length !== 0) {
                        gameName[0] += findTeamByName.length;
                        gameName[1] += findTeamByName.length;
                    }
                    const temp = _.toArray(gamesArr[i]);
                    for (let j = 0; j < temp.length; j++) {
                        let teamOneName: string;
                        let teamTwoName: string;
                        let teamOneId: string;
                        let teamTwoId: string;
                        if (j === 0) {
                            teamOneName = temp[0];
                            teamTwoName = temp[1];
                            teamOneId = gamesArrId[i][0];
                            teamTwoId = gamesArrId[i][1];
                        }
                        if (j === 1) {
                            teamOneName = temp[1];
                            teamTwoName = temp[0];
                            teamOneId = gamesArrId[i][1];
                            teamTwoId = gamesArrId[i][0];
                        }
                        gameObj.push({
                            name: gameName[j],
                            description: '',
                            score: [
                                {
                                    teamId: teamOneId,
                                    teamName: teamOneName,
                                    teamPoints: '0',
                                },
                                {
                                    teamId: teamTwoId,
                                    teamName: teamTwoName,
                                    teamPoints: '0',
                                }
                            ],
                            active: req.body.active,
                            teamsNames: temp,
                            teams: gamesArrId[i],
                            createdBy: user._id,
                            modifiedBy: user._id,
                            createdAt: Date.now(),
                            updatedAt: Date.now()
                        });
                    }
                }
                let genGame = [];
                for (const game of gameObj) {
                    genGame.push(
                        await this.generateGames(game)
                    );
                }
                const genGameIds: number[] = [];
                for (const i of genGame) {
                    genGameIds.push(i._id);
                }
                const group: fromInterfaces.IGroup | any = {
                    name: req.body.name,
                    description: req.body.description,
                    active: req.body.active,
                    modifiedBy: user._id,
                    teams: teamsArr,
                    score: genGameIds
                };
                try {
                    const updateGroup: any = await groupDB.updateGroup(group, req);
                    if (_.isNil(updateGroup.message)) {
                        res.status(200).json({
                            success: true,
                            group: updateGroup
                        });
                    } else {
                        res.status(500).json({
                            success: false,
                            msg: updateGroup
                        });
                    }
                } catch (err) {
                    console.error(
                        'Unable to connect to db and fetch all groups. Error is ',
                        err
                    );
                }
            } else {
                return res
                    .status(403)
                    .send({ success: false, msg: 'User is not authenticated!' });
            }
        });

    public deleteGroup = (passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response) => {
            const token: string = func.getToken(req.headers);
            if (token) {
                try {
                    const group:
                        | fromInterfaces.IGroup
                        | any = await groupDB.deleteGroup(req);
                    if (group !== null) {
                        res.status(200).json({
                            success: true,
                            group
                        });
                    } else {
                        res.status(500).json({
                            success: false,
                            msg: group
                        });
                    }
                } catch (err) {
                    console.error(
                        'Unable to fetch groups from the database, Error: ',
                        err
                    );
                }
            } else {
                return res
                    .status(403)
                    .send({ success: false, msg: 'User is not authenticated!' });
            }
        });
}

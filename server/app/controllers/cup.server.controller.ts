//#region Imports
import { Request, Response } from 'express';
import * as passport from 'passport';
import * as _ from 'lodash';
import CupDBCalls from '../repo/cup_repo/cup.server.repo';
import GroupDBCalls from '../repo/group_repo/group.server.repo';
import UserDBCalls from '../repo/user_repo/user.server.repo';
import * as fromInterfaces from './../models/interfaces/index';
import Functions from '../share/functions.server';

const cupDB = new CupDBCalls();
const groupDB = new GroupDBCalls();
const userDB = new UserDBCalls();
const func = new Functions();
//#endregion

export default class CupController {
    public getCups = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        try {
            const token: string = func.getToken(req.headers);
            if (token) {
                const cup: fromInterfaces.ICup[] | any = await cupDB.findCup();
                if (cup.length >= 0) {
                    res.status(200).json({
                        success: true,
                        cup
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: cup
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
                'Unable to fetch Cups from the database, Error: ',
                err
            );
        }
    });

    public getCupById = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        try {
            const token: string = func.getToken(req.headers);
            if (token) {
                const cup: fromInterfaces.ICup | any = await cupDB.findCupById(
                    req
                );
                if (cup !== null) {
                    res.status(200).json({
                        success: true,
                        cup
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: cup
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
                'Unable to fetch Cup from the database, Error: ',
                err
            );
        }
    });

    public getCupsByName = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        try {
            const token: string = func.getToken(req.headers);
            if (token) {
                const name = req.body.name;
                const cup: any = await cupDB.findCupByName(name);
                if (cup.length > 0) {
                    res.status(200).json({
                        success: true,
                        cup
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: cup
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
                'Unable to fetch Cup from the database, Error: ',
                err
            );
        }
    });

    public createCup = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            const groupArr: string[] = req.body.groups/*.split(',');
            let groupIdArr: number[] = [];
            for (let i: number = 0; i < groupArr.length; i++) {
                const findGroupByName: any = await groupDB.findGroupByName(
                    groupArr[i].trim()
                );
                if (!_.isNil(findGroupByName)) {
                    groupIdArr.push(findGroupByName._id);
                }
            }*/
            const user: any = await func.decodeToken(token);
            const cup: any = {
                name: req.body.name,
                description: req.body.description,
                active: req.body.active,
                createdBy: user._id,
                createdAt: Date.now(),
                modifiedBy: user._id,
                updatedAt: Date.now(),
                groups: groupArr
            };
            try {
                const createCup: any = await cupDB.createCup(cup);
                if (_.isNil(createCup.message)) {
                    res.status(200).json({
                        success: true,
                        cup: createCup
                    });
                } else {
                    res.status(500).json({ success: false, msg: createCup });
                }
            } catch (err) {
                console.error(
                    'Unable to connect to db and fetch all cups. Error is ',
                    err
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public updateCup = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            // console.log(` -=-=-=-=-=-=- req.body -=-=-=-=-=-=- `);
            // console.log(req.body);
            const user: any = await func.decodeToken(token);
            const groupArr: string[] = req.body.groups/*.split(',');
            let groupIdArr: number[] = [];
            for (let i: number = 0; i < groupArr.length; i++) {
                const findGroupByName: any = await groupDB.findGroupByName(
                    groupArr[i].trim()
                );
                if (!_.isNil(findGroupByName)) {
                    groupIdArr.push(findGroupByName._id);
                }
            }*/
            let win: any = null;
            let sec: any = null;
            let thr: any = null;
            if (req.body.winner !== '' && !_.isNil(req.body.winner)) {
                const findUserByUsername: any = await userDB.findUserByUsername(
                    req.body.winner.trim(),
                    res
                );
                win = findUserByUsername;
            }
            if (req.body.second !== '' && !_.isNil(req.body.second)) {
                const findUserByUsername: any = await userDB.findUserByUsername(
                    req.body.second.trim(),
                    res
                );
                sec = findUserByUsername;
            }
            if (req.body.third !== '' && !_.isNil(req.body.third)) {
                const findUserByUsername: any = await userDB.findUserByUsername(
                    req.body.third.trim(),
                    res
                );
                thr = findUserByUsername;
            }
            const cup: fromInterfaces.ICup | any = {
                name: req.body.name,
                description: req.body.description,
                active: req.body.active,
                modifiedBy: user._id,
                updatedAt: Date.now(),
                groups: groupArr,
                winner: win,
                second: sec,
                third: thr
            };
            // console.log(`-*-*-*-*-*-*- cup-*-*-*-*-*-*- `);
            // console.log(cup);
            try {
                // console.log("UPDATING CUP IN DB!!!!!!")
                const updateCup: any = await cupDB.updateCup(cup, req);
                // console.log(` -*-*-*-*-*-*- updateCup -*-*-*-*-*-*- `);
                // console.log(JSON.stringify(updateCup));
                if (_.isNil(updateCup.message)) {
                    res.status(200).json({
                        success: true,
                        cup: updateCup
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: updateCup
                    });
                }
            } catch (err) {
                console.error(
                    'Unable to connect to db and fetch all cups. Error is ',
                    err
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public deleteCup = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const cup: fromInterfaces.ICup | any = await cupDB.deleteCup(
                    req
                );
                console.log(`deleteCup`);
                console.log(cup);
                if (cup !== null) {
                    res.status(200).json({
                        success: true,
                        cup
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: cup
                    });
                }
            } catch (err) {
                console.error(
                    'Unable to fetch cups from the database, Error: ',
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

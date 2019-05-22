//#region Imports
import { Request, Response } from 'express';
import * as passport from 'passport';
import * as _ from 'lodash';

import UserModel from '../models/user.server.model';

import UserDBCalls from '../repo/user_repo/user.server.repo';
import RoleDBCalls from '../repo/role_repo/role.server.repo';
import Functions from '../share/functions.server';

const user_db = new UserDBCalls();
const role_db = new RoleDBCalls();
const func = new Functions();
//#endregion

class UserController {
    public renderRegister = (req: Request, res: Response) => {
        console.log('=================================================');
        console.log('Rendering register... (register.server.controller.ts 34)');
        console.log('=================================================');
        res.render('register', {
            title: 'Table Tennis EnLight'
        });
    };

    public renderUsers = (passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response) => {
            console.log('=================================================');
            console.log('Rendering user... (user.server.controller.ts 34)');
            console.log('=================================================');
            const findUser: any = await user_db.findUser(res);
            if (findUser.length > 0) {
                res.render('listUsers', {
                    title: 'Table Tennis EnLight',
                    user: findUser
                });
            } else {
                res.status(500).json({ success: false, msg: findUser });
            }
        });

    public getUsers = (passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response) => {
            const token: string = func.getToken(req.headers);
            if (token) {
                try {
                    const findUser: any = await user_db.findUser(res);
                    if (findUser.length > 0) {
                        res.status(200).json(findUser);
                    } else {
                        res.status(500).json({ success: false, msg: findUser });
                    }
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        msg: 'Get all users error ' + error
                    });
                }
            } else {
                return res
                    .status(403)
                    .send({ success: false, msg: 'User is not authenticated!' });
            }
        });

    public getUserById = (passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response) => {
            const token: string = func.getToken(req.headers);
            if (token) {
                try {
                    const findUserById: any = await user_db.findUserById(req, res);
                    console.log(`findUserById`);
                    console.log(findUserById);

                    if (_.isNil(findUserById.message)) {
                        console.log(`AAAAAAAAAAAAAAAAAAAAAAAA`);
                        res.status(200).json({ success: true, user: findUserById });
                    } else {
                        console.log(`BBBBBBBBBBBBBBBBBBBBBBBB`);
                        res.status(500).json({ success: false, msg: findUserById });
                    }
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        msg: error
                    });
                }
            } else {
                return res
                    .status(403)
                    .send({ success: false, msg: 'User is not authenticated!' });
            }
        });

    public getUserByUsername = (passport.authenticate('jwt', {
        session: false
    }),
        async (username: string, req: Request, res: Response) => {
            const token: string = func.getToken(req.headers);
            if (token) {
                try {
                    const findUserByUsername = await user_db.findUserByUsername(
                        username,
                        res
                    );
                    if (findUserByUsername != null) {
                        res.status(200).json({
                            success: true,
                            user: findUserByUsername
                        });
                    } else {
                        res.status(500).json({
                            success: false,
                            msg: findUserByUsername
                        });
                    }
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        msg: error
                    });
                }
            } else {
                return res
                    .status(403)
                    .send({ success: false, msg: 'User is not authenticated!' });
            }
        });

    public getUserByRole = (passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response) => {
            const token: string = func.getToken(req.headers);
            if (token) {
                try {
                    const findUsers = await user_db
                        .findUsersByRoleName(req, res)
                        .then(data => {
                            res.status(200).json({ success: true, user: data });
                        })
                        .catch(error => {
                            res.status(500).json({ success: false, msg: error });
                        });
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        msg: error
                    });
                }
            } else {
                return res
                    .status(403)
                    .send({ success: false, msg: 'User is not authenticated!' });
            }
        });

    public createUser = (passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response) => {
            const token: string = func.getToken(req.headers);
            if (token) {
                const findUserByUsername = await user_db.findUserByUsername(
                    req.body.username,
                    res
                );
                if (findUserByUsername != null) {
                    res.status(403).json({
                        success: false,
                        msg: 'User with that username already exists'
                    });
                } else {
                    const roleArr: string[] = req.body.role/*.split(',');
                    let roleIdArr: number[] = [];
                    for (let i: number = 0; i < roleArr.length; i++) {
                        const findRoleByName: any = await role_db.findRoleByName(
                            roleArr[i].trim(),
                            res
                        );
                        roleIdArr.push(findRoleByName._id);
                    }*/
                    const name: string = req.body.name;
                    const lastname: string = req.body.lastname;
                    const username: string = req.body.username;
                    const password: string = req.body.password;
                    const email: string = req.body.email;
                    const active: string = req.body.active;
                    const DoB: string = req.body.DoB;
                    const additionalInfo: string = req.body.additionalInfo;
                    const user = {
                        name,
                        lastname,
                        username,
                        password,
                        email,
                        active,
                        DoB,
                        additionalInfo,
                        roleArr
                    };

                    const validate_register = await func.validateRegister(
                        user,
                        res
                    );
                    if (_.isNil(validate_register.error)) {
                        const createUser: any = await user_db.createUser(
                            validate_register,
                            res
                        );
                        if (_.isNil(createUser.errmsg)) {
                            res.status(200).json({
                                success: true,
                                user: createUser
                            });
                        } else {
                            res.status(500).json({
                                success: false,
                                msg: createUser
                            });
                        }
                    } else {
                        res.status(500).json({
                            success: false,
                            msg: validate_register
                        });
                    }
                }
            } else {
                return res
                    .status(403)
                    .send({ success: false, msg: 'User is not authenticated!' });
            }
        });

    public updateUser = (passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response) => {
            const token: string = func.getToken(req.headers);
            if (token) {
                const roleArr: string[] = req.body.role/*.split(',');
                let roleIdArr: number[] = [];
                for (let i: number = 0; i < roleArr.length; i++) {
                    const findRoleByName: any = await role_db.findRoleByName(
                        roleArr[i].trim(),
                        res
                    );
                    if (!_.isNil(findRoleByName)) {
                        roleIdArr.push(findRoleByName._id);
                    }
                }*/
                const name: string = req.body.name;
                const lastname: string = req.body.lastname;
                const username: string = req.body.username;
                const password: string = req.body.password;
                const email: string = req.body.email;
                const status: string = req.body.status;
                const city: string = req.body.city;
                const country: string = req.body.country;
                const locationChange: string = req.body.locationChange;
                const jobType: string = req.body.jobType;
                const experience: string = req.body.experience;
                const gender: string = req.body.gender;
                const DoB: string = req.body.DoB;
                const additionalInfo: string = req.body.additionalInfo;

                const user = {
                    name,
                    lastname,
                    username,
                    password,
                    email,
                    status,
                    city,
                    country,
                    locationChange,
                    jobType,
                    experience,
                    gender,
                    DoB,
                    additionalInfo,
                    role: roleArr
                };
                console.log(`user`);
                console.log(user);
                try {
                    const findUserById = await user_db.findUserById(req, res);
                    if (findUserById != null) {
                        const updateUser = await user_db.updateUser(user, req, res);
                        res.status(201).json({ success: true, user: updateUser });
                    } else {
                        res.status(500).json({ success: false, msg: findUserById });
                    }
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        msg: 'Update user error ' + error
                    });
                }
            } else {
                return res
                    .status(403)
                    .send({ success: false, msg: 'User is not authenticated!' });
            }
        });

    public async authenticate(req: Request, res: Response) {
        try {
            console.log('LAJHSDJKHASJKDHASKHD');
            const validate_login = await func.validateLogin(
                req.body.username,
                req.body.password
            );
            console.log(`validate_login`);
            console.log(validate_login);
            if (_.isNil(validate_login.error)) {
                const authenticate_user_email = await user_db.findUserByUsername(
                    validate_login.username,
                    res
                );
                // console.log(`authenticate_user_email`);
                // console.log(authenticate_user_email);
                if (!_.isNil(authenticate_user_email)) {
                    const authenticate_user_password = await user_db.authenticateUserPassword(
                        authenticate_user_email,
                        req.body.password,
                        res
                    );
                    console.log(`authenticate_user_password`);
                    console.log(authenticate_user_password);
                    res.status(201).json({
                        success: true,
                        msg: authenticate_user_password
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        msg: authenticate_user_email
                    });
                }
            } else {
                res.status(500).json({ success: false, msg: validate_login });
            }
        } catch (error) {
            console.log('User error ', error);
        }
    }

    public async register(req: Request, res: Response) {
        try {
            const findUserByUsername = await user_db.findUserByUsername(
                req.body.username,
                res
            );
            if (findUserByUsername != null) {
                res.status(403).json({
                    success: false,
                    msg: 'User with that username already exists'
                });
            } else {
                const roleArr: string[] = req.body.role.split(',');
                let roleIdArr: number[] = [];
                for (let i: number = 0; i < roleArr.length; i++) {
                    const findRoleByName: any = await role_db.findRoleByName(
                        roleArr[i].trim(),
                        res
                    );
                    roleIdArr.push(findRoleByName._id);
                }
                const name: string = req.body.name;
                const lastname: string = req.body.lastname;
                const username: string = req.body.username;
                const password: string = req.body.password;
                const email: string = req.body.email;
                const active: string = req.body.active;
                const DoB: string = req.body.DoB;
                const additionalInfo: string = req.body.username;
                const user = {
                    name,
                    lastname,
                    username,
                    password,
                    email,
                    active,
                    DoB,
                    additionalInfo,
                    roleIdArr
                };
                const validate_register = await func.validateRegister(
                    user,
                    res
                );
                if (_.isNil(validate_register.error)) {
                    const createUser: any = await user_db.createUser(
                        validate_register,
                        res
                    );
                    if (createUser.errmsg === '' || !createUser.errmsg) {
                        res.status(200).json({
                            success: true,
                            user: createUser
                        });
                    } else {
                        res.status(500).json({
                            success: false,
                            msg: createUser
                        });
                    }
                } else {
                    res.status(500).json({
                        success: false,
                        msg: validate_register
                    });
                }
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: 'Register user error ' + error
            });
        }
    }

    public getLoggedInUser = (passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response) => {
            const token: string = func.getToken(req.headers);
            if (token) {
                try {
                    const decodedUser: any = await func.decodeToken(token);
                    const userId = decodedUser._id;
                    UserModel.findById(userId, '-password -__v')
                        .populate('company role job.jobId', '-__v')
                        .select('-job._id')
                        .exec((err, user) => {
                            if (err) throw err;
                            return res
                                .status(200)
                                .json({ success: true, user: user });
                        });
                    // const user = {
                    //     status: decodedUser.status,
                    //     locationChange: decodedUser.locationChange,
                    //     jobType: decodedUser.jobType,
                    //     role: decodedUser.role,
                    //     job: decodedUser.job,
                    //     _id: decodedUser._id,
                    //     name: decodedUser.name,
                    //     lastname: decodedUser.lastname,
                    //     email: decodedUser.email,
                    //     city: decodedUser.city,
                    //     country: decodedUser.country,
                    //     experience: decodedUser.experience,
                    //     gender: decodedUser.gender,
                    //     DoB: decodedUser.DoB,
                    //     additionalInfo: decodedUser.additionalInfo,
                    //     createdAt: decodedUser.createdAt,
                    //     updatedAt: decodedUser.updatedAt
                    // }
                    // console.log('===================');
                    // console.log('Current User : user.server.controller : 409');
                    // console.log('===================');
                    // console.log(decodedUser);
                    // return res
                    //     .status(200)
                    //     .json({ success: true, user: user })
                } catch (err) {
                    console.error(err);
                }
            } else {
                return res
                    .status(403)
                    .send({ success: false, msg: 'User is not authenticated!' });
            }
        });
}
export = UserController;

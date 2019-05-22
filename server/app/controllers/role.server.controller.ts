//#region Imports
import { Response, Request } from 'express';
import * as passport from 'passport';
import * as _ from 'lodash';
import RoleDBCalls from '../repo/role_repo/role.server.repo';
import FunctionsController from '../share/functions.server';

const role_db = new RoleDBCalls();
const func = new FunctionsController();
//#endregion

class RoleController {
    public getRole = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const findRole: any = await role_db.findRole(res);
                if (findRole.length > 0) {
                    res.status(200).json({ findRole });
                } else {
                    res.status(500).json({ findRole });
                }
            } catch (error) {
                res.status(500).json({
                    error:
                        'Unable to connect to db and fetch all users. ' + error
                });
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public getRolebyId = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const findRoleById: any = await role_db.findRoleById(req, res);
                if (findRoleById != null) {
                    res.status(200).json({ findRoleById });
                } else {
                    res.status(500).json({ findRoleById });
                }
            } catch (error) {
                res.status(500).json({
                    error: 'Get role by id error ' + error
                });
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public createRole = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            const name: string = req.body.name;
            const description: string = req.body.description;
            const role = {
                name,
                description
            };

            try {
                const findRole = await role_db.findRoleByName(name, res);
                if (_.isNil(findRole)) {
                    const createRole = await role_db.createRole(role, res);
                    res.status(201).json({ createRole });
                } else {
                    res.status(201).json({
                        message:
                            'Role with that name is already in the database!'
                    });
                }
            } catch (error) {
                res.status(500).json({ error: 'Create role error ' + error });
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });

    public updateRole = (passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
        const token: string = func.getToken(req.headers);
        if (token) {
            const name: string = req.body.name;
            const description: string = req.body.description;
            const role = {
                name,
                description
            };

            try {
                const updateRole = await role_db.updateRole(role, req, res);
                res.status(201).json({ updateRole });
            } catch (error) {
                res.status(500).json({ error: 'Update role error ' + error });
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    });
}

export = RoleController;

//#region Imports
import * as express from 'express';
import UserController = require('./../controllers/user.server.controller');

const API_URI_ROOT = '/users/';
const AUTH_URI_ROOT = '/auth/';
const router = express.Router();
//#endregion

export class UserRoutes {
    private _userController: UserController;

    constructor() {
        this._userController = new UserController();
    }

    get routes(): express.Router {
        let controller = this._userController;

        router.post(`${API_URI_ROOT}`, controller.createUser);
        router.get(`${API_URI_ROOT}`, controller.getUsers);
        router.put(`${API_URI_ROOT}:userId`, controller.updateUser);
        router.get(`${API_URI_ROOT}:userId`, controller.getUserById);
        router.get(`${API_URI_ROOT}byRole/:role`, controller.getUserByRole);

        // router.get(`${API_URI_ROOT}render`, controller.renderUsers);

        router.post(`${AUTH_URI_ROOT}Login`, controller.authenticate);
        router.post(`${AUTH_URI_ROOT}Register`, controller.register);
        router.get(`${AUTH_URI_ROOT}Login`, controller.getLoggedInUser);
        router.get(`${AUTH_URI_ROOT}Register`, controller.renderRegister);

        return router;
    }
}
Object.seal(UserRoutes);

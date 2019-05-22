//#region Imports
import * as express from 'express';
import CupController from './../controllers/cup.server.controller';
import UserController = require('./../controllers/user.server.controller');

const API_URI_ROOT = '/cup/';
const router = express.Router();
//#endregion

export class CupRoutes {
    constructor(
        private _cupController = new CupController(),
        private _userController = new UserController()
    ) {}

    get routes(): express.Router {
        const controller = this._cupController;
        const userController = this._userController;

        router.post(`${API_URI_ROOT}`, controller.createCup);
        router.get(`${API_URI_ROOT}`, controller.getCups);
        router.get(`${API_URI_ROOT}:id`, controller.getCupById);
        router.put(`${API_URI_ROOT}:id`, controller.updateCup);
        router.delete(`${API_URI_ROOT}:id`, controller.deleteCup);

        return router;
    }
}
Object.seal(CupRoutes);

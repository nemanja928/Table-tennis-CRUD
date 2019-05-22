//#region Imports
import * as express from 'express';
import RoleController = require('./../controllers/role.server.controller');

const API_URI_ROOT = '/roles/';
const router = express.Router();
//#endregion

export class RoleRoutes {
    private _roleController: RoleController;

    constructor() {
        this._roleController = new RoleController();
    }

    get routes(): express.Router {
        let controller = this._roleController;

        router.post(`${API_URI_ROOT}`, controller.createRole);
        router.get(`${API_URI_ROOT}`, controller.getRole);
        router.get(`${API_URI_ROOT}:roleId`, controller.getRolebyId);
        router.put(`${API_URI_ROOT}:roleId`, controller.updateRole);

        return router;
    }
}
Object.seal(RoleRoutes);

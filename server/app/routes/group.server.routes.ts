//#region Imports
import * as express from 'express';
import GroupController from './../controllers/group.server.controller';

const API_URI_ROOT = '/group/';
const router = express.Router();
//#endregion

export class GroupRoutes {
    constructor(private _groupController = new GroupController()) {}

    get routes(): express.Router {
        const controller = this._groupController;

        router.post(`${API_URI_ROOT}`, controller.createGroup);
        router.get(`${API_URI_ROOT}`, controller.getGroups);
        router.get(`${API_URI_ROOT}:id`, controller.getGroupById);
        router.put(`${API_URI_ROOT}:id`, controller.updateGroup);
        router.delete(`${API_URI_ROOT}:id`, controller.deleteGroup);

        return router;
    }
}
Object.seal(GroupRoutes);

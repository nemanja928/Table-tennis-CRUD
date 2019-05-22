//#region Imports
import * as express from 'express';
import IndexController = require('./../controllers/index.server.controller');

const router = express.Router();
//#endregion

export class IndexRoutes {
    private _indexController: IndexController;

    constructor() {
        this._indexController = new IndexController();
    }

    get routes(): express.Router {
        let controller = this._indexController;

        router.get('/', controller.renderIndex);

        return router;
    }
}

Object.seal(IndexRoutes);

//#region Imports
import * as express from 'express';
import GameController from './../controllers/game.server.controller';

const API_URI_ROOT = '/game/';
const router = express.Router();
//#endregion

export class GameRoutes {
    constructor(private _gameController = new GameController()) {}

    get routes(): express.Router {
        const controller = this._gameController;

        router.post(`${API_URI_ROOT}`, controller.createGame);
        router.get(`${API_URI_ROOT}`, controller.getGames);
        router.get(`${API_URI_ROOT}:id`, controller.getGameById);
        router.put(`${API_URI_ROOT}:id`, controller.updateGame);
        router.delete(`${API_URI_ROOT}:id`, controller.deleteGame);

        return router;
    }
}
Object.seal(GameRoutes);

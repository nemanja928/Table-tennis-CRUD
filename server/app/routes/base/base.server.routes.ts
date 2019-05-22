//#region Imports
import * as express from 'express';
import * as fromRoutes from './../index';
//#endregion

const app = express();

class BaseRoutes {
    get routes(): express.Router {
        app.use('/', new fromRoutes.IndexRoutes().routes);
        app.use('/', new fromRoutes.CupRoutes().routes);
        app.use('/', new fromRoutes.GroupRoutes().routes);
        app.use('/', new fromRoutes.GameRoutes().routes);
        app.use('/', new fromRoutes.UserRoutes().routes);
        app.use('/', new fromRoutes.RoleRoutes().routes);

        return app;
    }
}
export = BaseRoutes;

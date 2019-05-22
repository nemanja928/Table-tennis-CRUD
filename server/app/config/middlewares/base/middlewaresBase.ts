import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as passport from "passport";
import * as mongoose from "mongoose";
import flash = require("connect-flash");

import config = require("./../../constants/constants");
import methodOverride = require("./../methodOverride");
import baseRoutes = require("./../../../routes/base/base.server.routes");

class MiddlewareBase {
    static get configuration() {
        const app = express();

        const API_URI = "/api";

        app.set("views", "./views");
        app.set("view engine", "pug");

        app.use(cors());
        require("./../../strategies/jwt")(passport);

        /* --- DB CONNECTION INFO --- */
        // Local TestDB
        // const MONGO_URI: string = 'mongodb://localhost:27017/doit_db';

        // MLAB LiveDB
        const MONGO_URI = `${config.dbSettings.development.dialect}://${
            config.dbSettings.development.username
        }:${config.dbSettings.development.password}@ds227570.mlab.com:27570/${
            config.dbSettings.development.database
        }`;
        /* --- END DB INFO --- */

        mongoose.connect(MONGO_URI || process.env.MONGODB_URI);

        app.use(
            bodyParser.urlencoded({
                extended: true
            })
        );
        app.use(bodyParser.json());
        app.use(methodOverride.configuration());
        app.use(morgan("dev"));

        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());

        app.use(API_URI, new baseRoutes().routes);

        app.use(express.static("./public"));

        // The "/"(Root) Route is unused, Redirecting to /API where the rest of the routes are
        // app.use("/", (req: express.Request, res: express.Response) => {
        //     res.redirect(API_URI);
        // });

        // catch 404 and forward to error handler
        app.use((req: express.Request, res: express.Response, next) => {
            res.status(404);
            res.render("404.pug", { title: "404: File not found" });
        });

        // error handler
        app.use((err, req: express.Request, res: express.Response, next) => {
            res.status(err.status || 500);
            res.render("error", {
                message: err.message,
                error: app.get("env") === "development" ? err : {}
            });
        });

        return app;
    }
}

Object.seal(MiddlewareBase);
export = MiddlewareBase;

import * as express from "express";
import * as methodOverride from "method-override";

class MethodOverride {
    static configuration(): any {
        const app = express();
        // override with different headers; last one takes precedence
        app.use(methodOverride("X-HTTP-Method")); // Microsoft
        app.use(methodOverride("X-HTTP-Method-Override")); // Google/GData
        app.use(methodOverride("X-Method-Override")); // IBM
        app.use(methodOverride("_method"));

        return app;
    }
}

Object.seal(MethodOverride);
export = MethodOverride;

import { Request, Response } from 'express';

class IndexController {
    renderIndex = (req: Request, res: Response) => {
        console.log('=================================================');
        console.log('Rendering index... (index.server.controller.ts 6)');
        console.log('=================================================');
        res.render('index', {
            title: 'Table Tennis EnLightIT',
            user: JSON.stringify(req.user)
        });
    };
}
export = IndexController;

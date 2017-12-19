/**
 * chumm-uffa
 */
import { Request, Response, Router } from 'express';

import { BaseRoutes } from './baseRoutes';

import { HallController } from '../controller/hallController';

export class HallRoutes extends BaseRoutes {

    private controller: HallController;

    constructor() {
        super();
        this.controller = new HallController();
    }

    public allMeetupAction(router: Router): void {
        router.get('/', (req: Request, res: Response) => {
            this.controller.allHall(req, res);
        });
    }
}

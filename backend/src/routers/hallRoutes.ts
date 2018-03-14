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

    public allHallAction(router: Router): void {
        router.get('/', (req: Request, res: Response) => {
            this.controller.allHall(req, res);
        });
    }

    public getHallAction(router: Router): void {
        router.get('/:key/', this.guard, (req: Request, res: Response) => {
            this.controller.getHall(req, res);
        });
    }
}

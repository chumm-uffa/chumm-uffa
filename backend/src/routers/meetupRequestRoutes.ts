/**
 * chumm-uffa
 */
import { Request, Response, Router } from 'express';

import { BaseRoutes } from './baseRoutes';

import { MeetupRequestController } from '../controller/meetupRequestController';

export class MeetupRequestRoutes extends BaseRoutes {

    private controller: MeetupRequestController;

    constructor() {
        super();
        this.controller = new MeetupRequestController();
    }

    public getAllRequestAction(router: Router): void {
        router.get('/', (req: Request, res: Response) => {
            this.controller.getAllRequestAction(req, res);
        });
    }
}

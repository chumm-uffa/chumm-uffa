/**
 * chumm-uffa
 */
import { Request, Response, Router } from 'express';

import { BaseRoutes } from './baseRoutes';

import { MeetupController } from '../controller/meetupController';

export class MeetupRoutes extends BaseRoutes {

    private controller: MeetupController;

    constructor() {
        super();
        this.controller = new MeetupController();
    }

    public allMeetupAction(router: Router): void {
        router.get('/', (req: Request, res: Response) => {
            this.controller.allMeetup(req, res);
        });
    }
}

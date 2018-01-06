/**
 * chumm-uffa
 */
import {Request, Response, Router} from 'express';

import {BaseRoutes} from './baseRoutes';

import {MeetupRequestController} from '../controller/meetupRequestController';

export class MeetupRequestRoutes extends BaseRoutes {

    private controller: MeetupRequestController;

    constructor() {
        super();
        this.controller = new MeetupRequestController();
    }

    public getRequestAction(router: Router): void {
        router.get('/:id/', (req: Request, res: Response) => {
            this.controller.getRequestAction(req, res);
        });
    }

    public postRequestAction(router: Router): void {
        router.post('/', (req: Request, res: Response) => {
            this.controller.createRequest(req, res);
        });
    }

    public putRequestAction(router: Router): void {
        router.put('/:id/', (req: Request, res: Response) => {
            this.controller.updateRequest(req, res);
        });
    }

    public deleteRequestAction(router: Router): void {
        router.delete('/:id/', (req: Request, res: Response) => {
            this.controller.deleteRequest(req, res);
        });
    }
}

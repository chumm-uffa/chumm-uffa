/**
 * chumm-uffa
 */
import { Request, Response, Router } from 'express';

import {UserController} from "../controller/userController";
import {BaseRoutes} from "./baseRoutes";

export class UserRoutes extends BaseRoutes {

    private controller: UserController;

    constructor() {
        super();
        this.controller = new UserController();
    }

    public getAllMeetupsForUserAction(router: Router): void {
        router.get('/:id/meetups', (req: Request, res: Response) => {
            this.controller.getAllMeetupsForUser(req, res);
        });
    }

    public getAllRequestForUserAction(router: Router): void {
        router.get('/:id/meetup-requests', (req: Request, res: Response) => {
            this.controller.getAllRequestForUser(req, res);
        });
    }

    public getAllRequestInStatusForUserAction(router: Router): void {
        router.get('/:id/meetup-requests/:status', (req: Request, res: Response) => {
            this.controller.getAllRequestInStatusForUser(req, res);
        });
    }
}

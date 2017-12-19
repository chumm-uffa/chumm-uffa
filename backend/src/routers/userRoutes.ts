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

    public allUserAction(router: Router): void {
        router.get('/', (req: Request, res: Response) => {
            this.controller.allUser(req, res);
        });
    }

    public detailsAction(router: Router): void {
        router.get('/:id/', (req: Request, res: Response) => {
            this.controller.detail(req, res);
        });
    }

}

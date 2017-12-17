/**
 * chumm-uffa
 */
import { Request, Response, Router } from 'express';

import { BaseRoutes } from './baseRoutes';
import {AuthController} from "../controller/authController";

export class AuthRoutes extends BaseRoutes {

    private controller : AuthController;

    constructor() {
        super();
        this.controller = new AuthController();
    }

    public loginAction(router: Router): void {
        router.post('/login', (req: Request, res: Response) => {
            this.controller.login(req, res);
        });
    }

    public registerAction(router: Router): void {
        router.post('/register', (req: Request, res: Response) => {
            this.controller.register(req, res);
        });
    }

    public profileAction(router: Router): void {
        router.get('/profile', this.guard, (req: Request, res: Response) => {
            this.controller.profile(req, res);
        });
    }
}

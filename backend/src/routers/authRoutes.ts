/**
 * chumm-uffa
 */
import { Request, Response, Router } from 'express';

import { AuthController } from '../controller/authController';
import { BaseRoutes } from './baseRoutes';

export class AuthRoutes extends BaseRoutes {

    private controller: AuthController;

    constructor() {
        super();
        this.controller = new AuthController();
    }

    public loginAction(router: Router): void {
        router.post('/login', (req: Request, res: Response) => {
            this.controller.login(req, res);
        });
    }

    public logoutAction(router: Router): void {
        router.get('/logout', (req: Request, res: Response) => {
            this.controller.logout(req, res);
        });
    }

    public registerAction(router: Router): void {
        router.post('/register', (req: Request, res: Response) => {
            this.controller.register(req, res);
        });
    }

    public getProfileAction(router: Router): void {
        router.get('/profile', this.guard, (req: Request, res: Response) => {
            this.controller.getProfile(req, res);
        });
    }

    public updateProfileAction(router: Router): void {
        router.put('/profile', this.guard, (req: Request, res: Response) => {
            this.controller.updateProfile(req, res);
        });
    }}

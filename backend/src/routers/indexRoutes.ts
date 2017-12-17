/**
 * chumm-uffa
 */
import {Router} from 'express';
import {AuthRoutes} from "./authRoutes";
import {UserRoutes} from "./userRoutes";
import {BaseRoutes} from "./baseRoutes";

export class IndexRoutes extends BaseRoutes {
    constructor() {
        super();
    }

    public indexAction(router: Router): void {
        router.use('/auth', new AuthRoutes().getRoutes());
        router.use('/users', new UserRoutes().getRoutes());
    }
}

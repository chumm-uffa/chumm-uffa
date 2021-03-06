/**
 * chumm-uffa
 */
import { Router } from 'express';
import * as winston from 'winston';

import { guard } from '../middleware/guard';

export abstract class BaseRoutes {

    private readonly _registeredMethodEnding = 'Action';
    public router: Router;
    public logger: any;
    public guard: any;

    constructor() {
        this.guard = guard;
        this.logger = winston;
        this.router = Router();
        this.initRoutes();
    }

    public getRoutes(): Router {
        return this.router;
    }

    protected getRouterMethodNames(obj): Set<string> {
        let methods = new Set();
        while (obj = Reflect.getPrototypeOf(obj)) {
            let keys = Reflect.ownKeys(obj);
            keys.forEach((k) => {
                if(k.toString().indexOf(this._registeredMethodEnding,
                        (k.toString().length - this._registeredMethodEnding.length)) !== -1) {
                    methods.add(k);
                }
            });
        }
        return methods;
    }

    private initRoutes(): void {
        const methods = this.getRouterMethodNames(this);
        [...methods].map((method) => {
            this[method](this.router);
        });
    }
}

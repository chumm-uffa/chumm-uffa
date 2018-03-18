/**
 * chumm-uffa
 */
import {Request, Response, Router} from 'express';

import {BaseRoutes} from './baseRoutes';
import {SearchController} from '../controller/searchController';

export class NewsTickerRoutes extends BaseRoutes {

    private controller: SearchController;

    constructor() {
        super();
        this.controller = new SearchController();
    }

    public getNewsTicerAction(router: Router): void {
        router.get('/', (req: Request, res: Response) => {
            this.controller.getNext5Meetups(req, res);
        });
    }
}

/**
 * chumm-uffa
 */
import { Router } from 'express';
import { AuthRoutes } from './authRoutes';
import { BaseRoutes } from './baseRoutes';
import { HallRoutes } from './hallRoutes';
import { MeetupRequestRoutes } from './meetupRequestRoutes';
import { MeetupRoutes } from './meetupRoutes';
import { UserRoutes } from './userRoutes';

export class IndexRoutes extends BaseRoutes {
    constructor() {
        super();
    }

    public indexAction(router: Router): void {
        router.use('/auth', new AuthRoutes().getRoutes());
        router.use('/users', this.guard, new UserRoutes().getRoutes());
        router.use('/meetups', this.guard, new MeetupRoutes().getRoutes());
        router.use('/meetup-requests', this.guard, new MeetupRequestRoutes().getRoutes());
        router.use('/halls', this.guard, new HallRoutes().getRoutes());
    }
}

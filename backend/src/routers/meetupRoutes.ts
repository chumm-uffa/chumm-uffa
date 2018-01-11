/**
 * chumm-uffa
 */
import {Request, Response, Router} from 'express';

import {BaseRoutes} from './baseRoutes';

import {MeetupController} from '../controller/meetupController';
import {SearchController} from '../controller/searchController';

export class MeetupRoutes extends BaseRoutes {

    private controller: MeetupController;
    private search: SearchController;

    constructor() {
        super();
        this.controller = new MeetupController();
        this.search = new SearchController();
    }

    public getAllMeetupsAction(router: Router): void {
        router.get('/', (req: Request, res: Response) => {
            this.controller.getAllMeetups(req, res);
        });
    }

    public createMeetupAction(router: Router): void {
        router.post('/', (req: Request, res: Response) => {
            this.controller.createMeetup(req, res);
        });
    }

    public getMeetupAction(router: Router): void {
        router.get('/:id/', (req: Request, res: Response) => {
            this.controller.getMeetup(req, res);
        });
    }

    public deleteMeetupAction(router: Router): void {
        router.delete('/:id/', (req: Request, res: Response) => {
            this.controller.deleteMeetup(req, res);
        });
    }

    public updateMeetupAction(router: Router): void {
        router.put('/:id/', (req: Request, res: Response) => {
            this.controller.updateMeetup(req, res);
        });
    }

    public getAllRequestsForMeetupAction(router: Router): void {
        router.get('/:id/meetup-requests/', (req: Request, res: Response) => {
            this.controller.getAllRequestsForMeetup(req, res);
        });
    }

    public getAllChatsForMeetupAction(router: Router): void {
        router.get('/:id/chats/', (req: Request, res: Response) => {
            this.controller.getAllChatsForMeetup(req, res);
        });
    }

    public createChatForMeetupAction(router: Router): void {
        router.post('/:id/chats/', (req: Request, res: Response) => {
            this.controller.createChatForMeetup(req, res);
        });
    }

    public deleteChatForMeetupAction(router: Router): void {
        router.delete('/:id/chats/:chat_id/', (req: Request, res: Response) => {
            this.controller.deleteChatForMeetup(req, res);
        });
    }

    public searchMeetupAction(router: Router): void {
        router.post('/search/', (req: Request, res: Response) => {
            this.search.searchMeetups(req, res);
        });
    }
}

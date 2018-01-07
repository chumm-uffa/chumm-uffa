/**
 * chumm-uff
 **/
import {Request, Response} from 'express';
import {BaseController} from './baseController';
import {Meetup, MeetupsFactory} from '@chumm-uffa/interface';
import {DBMeetup, MeetupPopulate} from '../models/meetup/model';

export class SearchController extends BaseController {

    /**
     * dummy Implementation, get all Meetups
     * @param {Request} req
     * @param {Response} res
     */
    public searchMeetups(req: Request, res: Response) {
        // Find all meetups
        DBMeetup.find({}).populate(MeetupPopulate).then((dbMeetups) => {
            let meetups: Meetup[] = [];
            for (let dbMeetup of dbMeetups) {
                meetups.push(dbMeetup.toInterface());
            }
            res.json(MeetupsFactory.createSearchMeetupResponse(true, '', meetups));
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(MeetupsFactory.createSearchMeetupResponse(false, err.toString()));
            return;
        });
    }

}
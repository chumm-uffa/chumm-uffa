/**
 * chumm-uff
 **/
import { Request, Response, Router } from 'express';
import { BaseController } from './baseController';

export class MeetupController extends BaseController {

    /**
     * Getting all available meetup
     * @param {Request} req
     * @param {Response} res
     */
    public allMeetup(req: Request, res: Response){
        res.json({success: true});
    }

}
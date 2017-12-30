/**
 * chumm-uff
 **/
import { Request, Response, Router } from 'express';
import { BaseController } from './baseController';

export class MeetupRequestController extends BaseController {

    /**
     * Getting all available meetup request
     * @param {Request} req
     * @param {Response} res
     */
    public allMeetupRequest(req: Request, res: Response){
        res.json({success: true});
    }

}
/**
 * chumm-uff
 **/
import { Request, Response, Router } from 'express';
import { BaseController } from './baseController';
import {DBMeetup, MeetupPopulate} from "../models/meetup/model";
import {DBUser} from "../models/user/model";
import {
    UsersFactory, Meetup
} from '@chumm-uffa/interface';
import {BaseFactory} from "../../../interface/src/factory/baseFactory";

export class UserController extends BaseController {

    public getAllMeetupsForUser(req: Request, res: Response){
        // Check if user exists
        DBUser.findById(req.params.id).then( (dbUser) => {
            if (dbUser) {
                // Find all meetups entry for user
                DBMeetup.find({owner: dbUser.id}).populate(MeetupPopulate).then( (dbMeetups) => {
                    let meetups: Meetup[] = [];
                    for (let dbMeetup of dbMeetups) {
                        meetups.push(dbMeetup.toInterface());
                    }
                    res.json(UsersFactory.createGetAllMeetupsForUserResponse(true, "", meetups));
                }).catch((err) => {
                    this.logger.error(err.toString());
                    res.status(500);
                    res.json(UsersFactory.createGetAllMeetupsForUserResponse(false, err.toString()));
                    return;
                });
                return;
            }
            res.status(400);
            res.json(UsersFactory.createGetAllMeetupsForUserResponse(false, 'user not exits.'));
            return;
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(UsersFactory.createGetAllMeetupsForUserResponse(false, err.toString()));
            return;
        });    }

    public getAllRequestForUser(req: Request, res: Response){
        //Todo hier muss was rein für meetup-request
        res.json(BaseFactory.createBaseResponse(false, "to be implemented"));
    }

    public getAllRequestInStatusForUser(req: Request, res: Response){
        //Todo hier muss was rein für meetup-request
        res.json(BaseFactory.createBaseResponse(false, "to be implemented"));
    }
}
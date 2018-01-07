/**
 * chumm-uff
 **/
import { Request, Response } from 'express';
import { BaseController } from './baseController';
import { DBMeetup, MeetupPopulate } from '../models/meetup/model';
import { DBMeetupRequest, MeetupRequestPopulate } from '../models/meetup-request/model';
import {
   UsersFactory, Meetup, MeetupRequest
} from '@chumm-uffa/interface';

export class UserController extends BaseController {

    /**
     * Returns all meetups for the user requested with :id
     * @param {e.Request} req
     * @param {e.Response} res
     */
    public getAllMeetupsForUser(req: Request, res: Response){
        // Find all meetups for user
        DBMeetup.find({owner: req.params.id}).populate(MeetupPopulate).then( (dbMeetups) => {
            let promise: Promise<any>[] = [];
            let meetups: Meetup[] = [];
            for (let dbMeetup of dbMeetups) {
                promise.push(dbMeetup.toInterface().then( (meetup) => {
                    meetups.push(meetup);
                }));
            }
            // Wait for all to finish
            Promise.all(promise).then( () => {
                res.json(UsersFactory.createGetAllMeetupsForUserResponse(true, '', meetups));
            })
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(UsersFactory.createGetAllMeetupsForUserResponse(false, err.toString()));
            return;
        });    }

    /**
     * Returns all meetup-requests for the user requested with :id
     * @param {e.Request} req
     * @param {e.Response} res
     */
    public getAllRequestForUser(req: Request, res: Response){
        // Find all meetup-requests for user
        DBMeetupRequest.find({participant: req.params.id}).populate(MeetupRequestPopulate).then( (dbRequests) => {
            let promise: Promise<any>[] = [];
            let requests: MeetupRequest[] = [];
            for (let dbRequest of dbRequests) {
                promise.push(dbRequest.toInterface().then( (request) => {
                    requests.push(request);
                }));
            }
            // Wait for all to finish
            Promise.all(promise).then( () => {
                res.json(UsersFactory.createGetAllRequestsForUserResponse(true, '', requests));
            })
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(UsersFactory.createGetAllRequestsForUserResponse(false, err.toString()));
            return;
        });
    }

    /**
     * Returns all meetup-requests for the user requested with :id in requested with status :status
     * @param {e.Request} req
     * @param {e.Response} res
     */
    public getAllRequestInStatusForUser(req: Request, res: Response){
        // Find all meetup-requests for user in certain state
        DBMeetupRequest.find({participant: req.params.id, state: req.params.status}).populate(MeetupRequestPopulate).then( (dbRequests) => {
            let requests: MeetupRequest[] = [];
            for (let dbRequest of dbRequests) {
                requests.push(dbRequest.toInterface());
            }
            res.json(UsersFactory.createGetAllRequestsInStatusForUserResponse(true, '', requests));
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(UsersFactory.createGetAllRequestsInStatusForUserResponse(false, err.toString()));
            return;
        });
    }
}
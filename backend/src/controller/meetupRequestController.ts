/**chumm-uffa**/
import {Request, Response} from 'express';
import {BaseController} from './baseController';
import {DBMeetupRequest, IDBMeetupRequestModel, MeetupRequestPopulate} from '../models/meetup-request/model';
import {
    ICreateMeetupRequestRequest,
    IUpdateMeetupRequestRequest,
    MeetupRequestsFactory,
    PushNotification,
    NotificationId
} from '@chumm-uffa/interface';
import WebSockets from '../websockets/webSockets';
import {DBMeetup} from '../models/meetup/model';

export class MeetupRequestController extends BaseController {

    /**
     * Returns the meetupRequest requested with :id
     * @param {Request} req
     * @param {Response} res
     */
    public getRequestAction(req: Request, res: Response) {
        // Getting meetupRequest
        DBMeetupRequest.findById(req.params.id).populate(MeetupRequestPopulate).then((dbRequest) => {
            if (dbRequest) {
                dbRequest.toInterface().then((request) => {
                    res.json(MeetupRequestsFactory.createGetMeetupRequestResponse(true, '', request));
                });
                return;
            }
            res.status(400);
            res.json(MeetupRequestsFactory.createGetMeetupRequestResponse(false, 'meetup-request not exists.'));
            return;
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(MeetupRequestsFactory.createGetMeetupRequestResponse(false, err.toString()));
            return;
        });
    }

    /**
     * Creates a new meetupRequest
     * @param {Request} req
     * @param {Response} res
     */
    public createRequest(req: Request, res: Response) {
        const createRequest: ICreateMeetupRequestRequest = req.body;

        // Participant and meetup
        if (!createRequest.request ||
            !createRequest.request.participant ||
            !createRequest.request.meetup) {
            res.status(400);
            res.json(MeetupRequestsFactory.createCreateMeetupRequestResponse(false, 'wrong input.'));
            return;
        }

        DBMeetupRequest.findOne({
            meetup: createRequest.request.meetup.id,
            participant: createRequest.request.participant.id
        }).then((dbMeetupReqFound) => {
            if (!dbMeetupReqFound) {
                const dbMeetupRequest: IDBMeetupRequestModel = new DBMeetupRequest();
                dbMeetupRequest.fromInterface(createRequest.request);
                dbMeetupRequest.save().then((dbMeetupReq) => {
                    return DBMeetupRequest.populate(dbMeetupReq, MeetupRequestPopulate);
                }).then((dbMeetupReq3: IDBMeetupRequestModel) => {
                    return dbMeetupReq3.toInterface();
                }).then(request => {
                    res.json(MeetupRequestsFactory.createCreateMeetupRequestResponse(true, 'meetup-request created.',
                        request));
                    this.notifyChanges(request);
                }).catch((err) => {
                    this.logger.error(err.toString());
                    res.status(500);
                    res.json(MeetupRequestsFactory.createCreateMeetupRequestResponse(false, err.toString()));
                });
            } else {
                DBMeetupRequest.populate(dbMeetupReqFound, MeetupRequestPopulate).then((dbMeetupReq3: IDBMeetupRequestModel) => {
                    return dbMeetupReq3.toInterface();
                }).then(request => {
                    res.json(MeetupRequestsFactory.createCreateMeetupRequestResponse(true, 'meetup-request found.',
                        request));
                    this.notifyChanges(request);
                }).catch((err) => {
                    this.logger.error(err.toString());
                    res.status(500);
                    res.json(MeetupRequestsFactory.createCreateMeetupRequestResponse(false, err.toString()));
                });
            }
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(MeetupRequestsFactory.createCreateMeetupRequestResponse(false, err.toString()));
        });
    }

    /**
     * Updates the meetupRequest
     * @param {Request} req
     * @param {Response} res
     */
    public updateRequest(req: Request, res: Response) {
        const updateRequest: IUpdateMeetupRequestRequest = req.body;

        // Owner, from, to and activity must be present
        if (!updateRequest.request ||
            !updateRequest.request.participant ||
            !updateRequest.request.meetup) {
            res.status(400);
            res.json(MeetupRequestsFactory.createUpdateMeetupRequestResponse(false, 'wrong input.'));
            return;
        }

        // Check if meetup exits
        DBMeetupRequest.findById(req.params.id).then((dbMeetupReq) => {
            if (dbMeetupReq) {
                // Save changes
                dbMeetupReq.fromInterface(updateRequest.request);
                dbMeetupReq.save().then((dbMeetupReq2) => {
                    // Resolve reverences
                    return DBMeetupRequest.populate(dbMeetupReq2, MeetupRequestPopulate);
                }).then((dbMeetupReq3: IDBMeetupRequestModel) => {
                    return dbMeetupReq3.toInterface();
                }).then(request => {
                    res.json(MeetupRequestsFactory.createUpdateMeetupRequestResponse(true, 'meetup-request updated.',
                        request));
                    this.notifyChanges(request);
                }).catch((err) => {
                    this.logger.error(err.toString());
                    res.status(500);
                    res.json(MeetupRequestsFactory.createUpdateMeetupRequestResponse(false, err.toString()));
                });
                return;
            }
            res.status(400);
            res.json(MeetupRequestsFactory.createUpdateMeetupRequestResponse(false, 'meetup-request not exits.'));
            return;
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(MeetupRequestsFactory.createUpdateMeetupRequestResponse(false, err.toString()));
            return;
        });
    }

    /**
     * Deletes the meetup-request requested
     * @param {Request} req
     * @param {Response} res
     */
    public deleteRequest(req: Request, res: Response) {
        // Check if meetup-request exists
        DBMeetupRequest.findById(req.params.id).then((dbMeetupReq) => {
            if (dbMeetupReq) {
                // todo: Hier könnte noch überprüft werden ob der Aufrufer auch owner des Request ist -> wäre für scharfen Betrieb notwendig
                // Removes meetup-request
                dbMeetupReq.remove();
                res.json(MeetupRequestsFactory.createDeleteMeetupRequestResponse(true, 'successfully deleted meetup-request'));
                this.notifyChanges(dbMeetupReq);
                return;
            }
            res.status(400);
            res.json(MeetupRequestsFactory.createDeleteMeetupRequestResponse(false, 'meetup-request not exists.'));
            return;
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(MeetupRequestsFactory.createDeleteMeetupRequestResponse(false, err.toString()));
            return;
        });
    }

    /**
     * Notify all user registerd for a meetup of data changes
     * @param dbMeetup
     */
    private notifyChanges(dbMeetupReq) {
        DBMeetup.findById(dbMeetupReq.meetup).then((dbMeetup) => {
            const notification: PushNotification =
                new PushNotification(NotificationId.MEETUPS_DATA_CHANGED, 'Meetup with id :' + dbMeetup.id + ' changed');

            DBMeetupRequest.find({meetup: dbMeetup.id}).then((dbRequests) => {
                var users: string[] = [];
                users.push(dbMeetup.owner.toString());
                dbRequests.map((dbRequest) =>{
                    users.push(dbRequest.participant.toString());
                })
                WebSockets.notify(users, notification);
            })
        })
    }
}
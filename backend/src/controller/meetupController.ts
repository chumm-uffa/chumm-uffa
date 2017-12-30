/**
 * chumm-uff
 **/
import { Request, Response, Router } from 'express';
import { BaseController } from './baseController';
import {
    MeetupsFactory, ICreateMeetupRequest, IUpdateMeetupRequest, Meetup
} from '@chumm-uffa/interface';
import {DBMeetup, IDBMeetupModel, MeetupPopulate} from "../models/meetup/model";

export class MeetupController extends BaseController {

    /**
     * Getting all available meetups
     * @param {Request} req
     * @param {Response} res
     */
    public getAllMeetups(req: Request, res: Response){
        DBMeetup.find({}).populate(MeetupPopulate).then( (dbMeetups) => {
            let meetups: Meetup[] = [];
            for (let dbMeetup of dbMeetups) {
                meetups.push(dbMeetup.toInterface());
            }
            res.json(MeetupsFactory.createGetAllMeetupsResponse(true, "", meetups));
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(MeetupsFactory.createGetAllMeetupsResponse(false, err.toString()));
            return;
        });
    }

    /**
     * Creates a new meetup
     * @param {Request} req
     * @param {Response} res
     */
    public createMeetup(req: Request, res: Response){
        const createRequest: ICreateMeetupRequest = req.body;

        // Owner, from, to and activity must be present
        if (!createRequest.meetup ||
            !createRequest.meetup.owner ||
            !createRequest.meetup.from ||
            !createRequest.meetup.to ||
            !createRequest.meetup.activity ) {
            res.status(400);
            res.json(MeetupsFactory.createCreateMeetupResponse(false, 'wrong input.'));
            return;
        }

        const dbMeetup: IDBMeetupModel = new DBMeetup();
        dbMeetup.fromInterface(createRequest.meetup);
        dbMeetup.save().then((dbMeetup) => {
            DBMeetup.populate(dbMeetup, MeetupPopulate).then(  (dbMeetup: IDBMeetupModel) => {
                res.json(MeetupsFactory.createCreateMeetupResponse(true, 'meetup created.', dbMeetup.toInterface(), dbMeetup.id));
            });
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(MeetupsFactory.createCreateMeetupResponse(false, err.toString()));
        });
    }

    /**
     * Returns the meetup requested with :id
     * @param {Request} req
     * @param {Response} res
     */
    public getMeetup(req: Request, res: Response){
        DBMeetup.findById(req.params.id).populate(MeetupPopulate).then( (dbMeetup) => {
            if (dbMeetup) {
                res.json(MeetupsFactory.createGetMeetupRespons(true, "", dbMeetup.toInterface()));
                return;
            }
            res.status(400);
            res.json(MeetupsFactory.createGetMeetupRespons(false, 'meetup not exits.'));
            return;
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(MeetupsFactory.createGetAllMeetupsResponse(false, err.toString()));
            return;
        });
    }

    /**
     * Deletes the meetup requested with :id
     * @param {Request} req
     * @param {Response} res
     */
    public deleteMeetup(req: Request, res: Response){
        DBMeetup.findByIdAndRemove(req.params.id).then( (dbMeetup) => {
            if (dbMeetup) {
                res.json(MeetupsFactory.createDeleteMeetupRespons(true, "successfully deleted meetup"));
                return;
            }
            res.status(400);
            res.json(MeetupsFactory.createDeleteMeetupRespons(false, 'meetup not exits.'));
            return;
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(MeetupsFactory.createGetAllMeetupsResponse(false, err.toString()));
            return;
        });
    }

    /**
     * Updates the meetup requested with :id
     * @param {Request} req
     * @param {Response} res
     */
    public updateMeetup(req: Request, res: Response){
        const updateRequest: IUpdateMeetupRequest = req.body;

        // Owner, from, to and activity must be present
        if (!updateRequest.meetup ||
            !updateRequest.meetup.owner ||
            !updateRequest.meetup.from ||
            !updateRequest.meetup.to ||
            !updateRequest.meetup.activity ) {
            res.status(400);
            res.json(MeetupsFactory.createUpdateMeetupRespons(false, 'wrong input.'));
            return;
        }

        const dbMeetup: IDBMeetupModel = new DBMeetup();
        DBMeetup.findById(req.params.id).then( (dbMeetup) => {
            if (dbMeetup) {
                // Save document
                dbMeetup.fromInterface(updateRequest.meetup);
                dbMeetup.save().then((dbMeetup) => {
                    // Resolve reverences
                    DBMeetup.populate(dbMeetup, MeetupPopulate).then(  (dbMeetup: IDBMeetupModel) => {
                        res.json(MeetupsFactory.createUpdateMeetupRespons(true, 'meetup updated.', dbMeetup.toInterface()));
                    });
                }).catch((err) => {
                    this.logger.error(err.toString());
                    res.status(500);
                    res.json(MeetupsFactory.createUpdateMeetupRespons(false, err.toString()));
                });
                return;
            }
            res.status(400);
            res.json(MeetupsFactory.createUpdateMeetupRespons(false, 'meetup not exits.'));
            return;
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(MeetupsFactory.createUpdateMeetupRespons(false, err.toString()));
            return;
        });
    }

    /**
     * Returns all meetup-request for the meetup requested with :id
     * @param {Request} req
     * @param {Response} res
     */
    public getAllRequestsForMeetup(req: Request, res: Response){
        console.log(`getAllRequestsForMeetup id = ${req.params.id}`);
        res.status(200);
        res.json(MeetupsFactory.createGetAllRequestsForMeetupRespons(true, ""));
    }

    /**
     * Returns all chats for the meetup requested with :id
     * @param {Request} req
     * @param {Response} res
     */
    public getAllChatsForMeetup(req: Request, res: Response){
        console.log(`getAllChatsForMeetup id = ${req.params.id}`);
        res.status(200);
        res.json(MeetupsFactory.createGetAllChatsForMeetupRespons(true, ""));
    }

    /**
     * Creates a new chat for the meetup requested with :id
     * @param {Request} req
     * @param {Response} res
     */
    public createChatForMeetupRequest(req: Request, res: Response){
        console.log(`createChatForMeetupRequest id = ${req.params.id}`);
        res.status(200);
        res.json(MeetupsFactory.createCreateChatForMeetupRespons(true, "successfully created chat for meetup"));
    }

    /**
     * Delete a chat from the meetup requested with :id
     * @param {Request} req
     * @param {Response} res
     */
    public deleteChatForMeetup(req: Request, res: Response){
        console.log(`deleteChatForMeetup id = ${req.params.id}, chat_id = ${req.params.chat_id}`);
        res.status(200);
        res.json(MeetupsFactory.createCreateChatForMeetupRespons(true, "successfully delete chat from meetup"));
    }

}
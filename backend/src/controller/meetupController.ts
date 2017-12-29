/**
 * chumm-uff
 **/
import { Request, Response, Router } from 'express';
import { BaseController } from './baseController';
import {
    MeetupsFactory, ICreateMeetupRequest
} from '@chumm-uffa/interface';
import {DBMeetup, IDBMeetupModel} from "../models/meetup/model";

export class MeetupController extends BaseController {

    /**
     * Getting all available meetups
     * @param {Request} req
     * @param {Response} res
     */
    public getAllMeetups(req: Request, res: Response){
        res.status(200);
        res.json(MeetupsFactory.createGetAllMeetupsResponse(true, ""));
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
            !createRequest.meetup.activity ) {
            res.status(400);
            res.json(MeetupsFactory.createCreateMeetupResponse(false, 'wrong input.'));
            return;
        }

        const dbMeetup: IDBMeetupModel = new DBMeetup();
        dbMeetup.fromInterface(createRequest.meetup);
        dbMeetup.save().then((result) => {
            res.json(MeetupsFactory.createCreateMeetupResponse(true, 'user created.', result.toInterface(), result.id));
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
        console.log(`getMeetup id = ${req.params.id}`);
        res.status(200);
        res.json(MeetupsFactory.createGetMeetupRespons(true, ""));
    }

    /**
     * Deletes the meetup requested with :id
     * @param {Request} req
     * @param {Response} res
     */
    public deleteMeetup(req: Request, res: Response){
        console.log(`deleteMeetup id = ${req.params.id}`);
        res.status(200);
        res.json(MeetupsFactory.createDeleteMeetupRespons(true, "successfully deleted meetup"));
    }

    /**
     * Updates the meetup requested with :id
     * @param {Request} req
     * @param {Response} res
     */
    public updateMeetup(req: Request, res: Response){
        console.log(`updateMeetup id = ${req.params.id}`);
        res.status(200);
        res.json(MeetupsFactory.createUpdateMeetupRespons(true, "successfully updated meetup"));
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
/**
 * chumm-uff
 **/
import { Request, Response } from 'express';
import { BaseController } from './baseController';
import {
    MeetupsFactory, ICreateMeetupRequest, IUpdateMeetupRequest, ICreateChatForMeetupRequest, Meetup, MeetupRequest, Chat
} from '@chumm-uffa/interface';
import {DBMeetup, IDBMeetupModel, MeetupPopulate} from '../models/meetup/model';
import {DBChat, ChatPopulate, IDBChatModel} from '../models/chat/model';
import {DBMeetupRequest, MeetupRequestPopulate} from '../models/meetup-request/model';

export class MeetupController extends BaseController {

    /**
     * Getting all available meetups
     * @param {Request} req
     * @param {Response} res
     */
    public getAllMeetups(req: Request, res: Response){
        // Find all meetups
        DBMeetup.find({}).populate(MeetupPopulate).then( (dbMeetups) => {
            let meetups: Meetup[] = [];
            for (let dbMeetup of dbMeetups) {
                meetups.push(dbMeetup.toInterface());
            }
            res.json(MeetupsFactory.createGetAllMeetupsResponse(true, '', meetups));
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
            (!createRequest.meetup.outdoor &&  !createRequest.meetup.indoor)) {
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
        // Getting meetup
        DBMeetup.findById(req.params.id).populate(MeetupPopulate).then( (dbMeetup) => {
            if (dbMeetup) {
                res.json(MeetupsFactory.createGetMeetupRespons(true, '', dbMeetup.toInterface()));
                return;
            }
            res.status(400);
            res.json(MeetupsFactory.createGetMeetupRespons(false, 'meetup not exits.'));
            return;
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(MeetupsFactory.createGetMeetupRespons(false, err.toString()));
            return;
        });
    }

    /**
     * Deletes the meetup requested with :id
     * @param {Request} req
     * @param {Response} res
     */
    public deleteMeetup(req: Request, res: Response){
        // Check if meetup exists
        DBMeetup.findById(req.params.id).then( (dbMeetup) => {
            if (dbMeetup) {
                // Removes meetup and all Chats and Request associated with the meetup
                dbMeetup.remove();
                res.json(MeetupsFactory.createDeleteMeetupRespons(true, 'successfully deleted meetup'));
                return;
            }
            res.status(400);
            res.json(MeetupsFactory.createDeleteMeetupRespons(false, 'meetup not exits.'));
            return;
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(MeetupsFactory.createDeleteMeetupRespons(false, err.toString()));
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
            (!updateRequest.meetup.outdoor &&  !updateRequest.meetup.indoor) ) {
            res.status(400);
            res.json(MeetupsFactory.createUpdateMeetupRespons(false, 'wrong input.'));
            return;
        }

        // Check if meetup exits
        DBMeetup.findById(req.params.id).then( (dbMeetup) => {
            if (dbMeetup) {
                // Save changes
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
        // Find all meetup request entry for meetup
        DBMeetupRequest.find({meetup: req.params.id}).populate(MeetupRequestPopulate).then( (dbRequests) => {
            let requests: MeetupRequest[] = [];
            for (let dbRequest of dbRequests) {
                requests.push(dbRequest.toInterface());
            }
            res.json(MeetupsFactory.createGetAllRequestsForMeetupRespons(true, '', requests));
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(MeetupsFactory.createGetAllRequestsForMeetupRespons(false, err.toString()));
            return;
        });
    }

    /**
     * Returns all chats for the meetup requested with :id
     * @param {Request} req
     * @param {Response} res
     */
    public getAllChatsForMeetup(req: Request, res: Response){
        // Find all chat entry for meetup
        DBChat.find({meetup: req.params.id}).populate(ChatPopulate).then( (dbChats) => {
            let chats: Chat[] = [];
            for (let dbChat of dbChats) {
                chats.push(dbChat.toInterface());
            }
            res.json(MeetupsFactory.createGetAllChatsForMeetupRespons(true, '', chats));
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(MeetupsFactory.createGetAllChatsForMeetupRespons(false, err.toString()));
            return;
        });
    }

    /**
     * Creates a new chat for the meetup requested with :id
     * @param {Request} req
     * @param {Response} res
     */
    public createChatForMeetup(req: Request, res: Response){
        // Check if meetup exists
        DBMeetup.findById(req.params.id).then( (dbMeetup) => {
            if (dbMeetup) {
                const createRequest: ICreateChatForMeetupRequest = req.body;

                // Speaker must be present
                if (!createRequest.chat ||
                    !createRequest.chat.speaker) {
                    res.status(400);
                    res.json(MeetupsFactory.createCreateChatForMeetupRespons(false, 'wrong input.'));
                    return;
                }

                // Save new Chat document
                const dbChat: IDBChatModel = new DBChat();
                dbChat.fromInterface(createRequest.chat);
                dbChat.meetup = dbMeetup.id;
                dbChat.save().then((dbChat) => {
                    DBChat.populate(dbChat, ChatPopulate).then(  (dbChat: IDBChatModel) => {
                        res.json(MeetupsFactory.createCreateChatForMeetupRespons(true, 'chat created.', dbChat.toInterface(), dbChat.id));
                    });
                }).catch((err) => {
                    this.logger.error(err.toString());
                    res.status(500);
                    res.json(MeetupsFactory.createCreateChatForMeetupRespons(false, err.toString()));
                });
                return;
            }
            res.status(400);
            res.json(MeetupsFactory.createCreateChatForMeetupRespons(false, 'meetup not exits.'));
            return;
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(MeetupsFactory.createCreateChatForMeetupRespons(false, err.toString()));
            return;
        });
    }

    /**
     * Delete a chat from the meetup requested with :id
     * @param {Request} req
     * @param {Response} res
     */
    public deleteChatForMeetup(req: Request, res: Response){
        // Check if meetup exists
        DBMeetup.findById(req.params.id).then( (dbMeetup) => {
            if (dbMeetup) {
                // Check if chat entry for meetup exits
                DBChat.findOne({_id: req.params.chat_id, meetup: dbMeetup.id}).then( (dbChat) => {
                    if (dbChat) {
                        // Remove the chat entry
                        dbChat.remove();
                        res.json(MeetupsFactory.createDeleteChatForMeetupResponse(true, 'successfully deleted chat entry'));
                        return;
                    }
                    res.status(400);
                    res.json(MeetupsFactory.createDeleteChatForMeetupResponse(false, 'chat entry not exits.'));
                    return;
                }).catch((err) => {
                    this.logger.error(err.toString());
                    res.status(500);
                    res.json(MeetupsFactory.createDeleteChatForMeetupResponse(false, err.toString()));
                    return;
                });
                return;
            }
            res.status(400);
            res.json(MeetupsFactory.createDeleteChatForMeetupResponse(false, 'meetup not exits.'));
            return;
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(MeetupsFactory.createDeleteChatForMeetupResponse(false, err.toString()));
            return;
        });
    }
}
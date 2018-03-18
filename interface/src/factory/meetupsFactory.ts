import {
    CreateMeetupRequest,
    CreateMeetupRespons,
    DeleteMeetupRespons,
    GetAllMeetupsRespons,
    GetMeetupRespons,
    GetNext5MeetupsResponse,
    ICreateMeetupRequest,
    ICreateMeetupResponse,
    IDeleteMeetupResponse,
    IGetAllMeetupsResponse,
    IGetMeetupResponse,
    IGetNext5MeetupsResponse,
    ISearchMeetupsRequest,
    ISearchMeetupsResponse,
    IUpdateMeetupRequest,
    IUpdateMeetupResponse,
    SearchMeetupsRequest,
    SearchMeetupsResponse,
    UpdateMeetupRequest,
    UpdateMeetupRespons,
} from '../interface/meetups/meetups';
import {GetAllRequestsForMeetupRespons, IGetAllRequestsForMeetupResponse} from '../interface/meetups/meetup-requests';
import {
    CreateChatForMeetupRequest,
    CreateChatForMeetupRespons,
    DeleteChatForMeetupResponse,
    GetAllChatsForMeetupRespons,
    ICreateChatForMeetupRequest,
    ICreateChatForMeetupResponse,
    IDeleteChatForMeetupResponse,
    IGetAllChatsForMeetupResponse
} from '../interface/meetups/chats';
import {Meetup} from '../model/meetup';
import {BaseFactory} from './baseFactory';
import {Chat} from '../model/chat';
import {MeetupRequest} from '../model/meetup-request';
import {SearchDto} from '../model/searchDto';

/**
 * Class Factory for "/meetups" route Rest API interface
 */
export class MeetupsFactory extends BaseFactory {

    /**
     * Creates response message for "get /meetups" route
     * @param {boolean} success
     * @param {string} message
     * @param {Meetup[]} meetups
     * @returns {IGetAllMeetupsResponse}
     */
    static createGetAllMeetupsResponse(success: boolean, message: string, meetups?: Meetup[]): IGetAllMeetupsResponse {
        const response = this.createResponse(GetAllMeetupsRespons, success, message);
        if (meetups) {
            response.meetups = meetups
        }
        return response;
    }

    /**
     * Creates request message for "post /meetups" route
     * @param {Meetup} meetup
     * @returns {ICreateMeetupRequest}
     */
    static createCreateMeetupRequest(meetup: Meetup): ICreateMeetupRequest {
        const request = new CreateMeetupRequest();
        request.meetup = meetup;
        return request;
    }

    /**
     * Creates response message for "post /meetups" route
     * @param {boolean} success
     * @param {string} message
     * @param {Meetup} meetup
     * @param {string} id
     * @returns {ICreateMeetupResponse}
     */
    static createCreateMeetupResponse(success: boolean, message: string, meetup?: Meetup, id?: string): ICreateMeetupResponse {
        const response = this.createResponse(CreateMeetupRespons, success, message);
        if (meetup) {
            response.meetup = meetup
        }
        if (id) {
            response.id = id
        }
        return response;
    }

    /**
     * Creates response message for "get /meetups/{id}" route
     * @param {boolean} success
     * @param {string} message
     * @param {Meetup} meetup
     * @returns {IGetMeetupResponse}
     */
    static createGetMeetupRespons(success: boolean, message: string, meetup?: Meetup): IGetMeetupResponse {
        const response = this.createResponse(GetMeetupRespons, success, message);
        if (meetup) {
            response.meetup = meetup
        }
        return response;
    }

    /**
     * Create response messager for "delete /meetups/{id}" route
     * @param {boolean} success
     * @param {string} message
     * @returns {IDeleteMeetupResponse}
     */
    static createDeleteMeetupRespons(success: boolean, message: string): IDeleteMeetupResponse {
        return this.createResponse(DeleteMeetupRespons, success, message);
    }

    /**
     * Create request message for "put /meetups/{id}" route
     * @param {Meetup} meetup
     * @returns {IUpdateMeetupRequest}
     */
    static createUpdateMeetupRequest(meetup: Meetup): IUpdateMeetupRequest {
        const request = new UpdateMeetupRequest();
        request.meetup = meetup;
        return request;
    }

    /**
     * Create response message for "put /meetups/{id}" route
     * @param {boolean} success
     * @param {string} message
     * @param {Meetup} meetup
     * @returns {IUpdateMeetupResponse}
     */
    static createUpdateMeetupRespons(success: boolean, message: string, meetup?: Meetup): IUpdateMeetupResponse {
        const response = this.createResponse(UpdateMeetupRespons, success, message);
        if (meetup) {
            response.meetup = meetup
        }
        return response;
    }

    /**
     * Create request message for "post /meetups/search" route
     * @param {Meetup} meetup
     * @returns {ISearchMeetupsRequest}
     */
    static createSearchMeetupRequest(searchDto: SearchDto): ISearchMeetupsRequest {
        const request = new SearchMeetupsRequest();
        request.searchDto = searchDto;
        return request;
    }

    /**
     * Create response message for "post /meetups/search" route
     * @param {boolean} success
     * @param {string} message
     * @param {Meetup} meetup
     * @returns {ISearchMeetupsResponse}
     */
    static createSearchMeetupResponse(success: boolean, message: string, meetups?: Meetup[]): ISearchMeetupsResponse {
        const response = this.createResponse(SearchMeetupsResponse, success, message);
        if (meetups) {
            response.meetups = meetups
        }
        return response;
    }

    /**
     * Create request message for "get /meetups/{id}/meetup-requests" route
     * @param {boolean} success
     * @param {string} message
     * @param {MeetupRequest[]} requests
     * @returns {IGetAllRequestsForMeetupResponse}
     */
    static createGetAllRequestsForMeetupRespons(success: boolean, message: string, requests?: MeetupRequest[]): IGetAllRequestsForMeetupResponse {
        const response = this.createResponse(GetAllRequestsForMeetupRespons, success, message);
        if (requests) {
            response.requests = requests
        }
        return response;
    }

    /**
     * Create respons message for "get /meetups/{id}/chats" route
     * @param {boolean} success
     * @param {string} message
     * @param {Chat[]} chats
     * @returns {IGetAllChatsForMeetupResponse}
     */
    static createGetAllChatsForMeetupRespons(success: boolean, message: string, chats?: Chat[]): IGetAllChatsForMeetupResponse {
        const response = this.createResponse(GetAllChatsForMeetupRespons, success, message);
        if (chats) {
            response.chats = chats
        }
        return response;
    }

    /**
     * Create request message for post "/meetups/{id}/chats"
     * @param {Chat} chat
     * @returns {ICreateChatForMeetupRequest}
     */
    static createCreateChatForMeetupRequest(chat: Chat): ICreateChatForMeetupRequest {
        const request = new CreateChatForMeetupRequest();
        request.chat = chat;
        return request;
    }

    /**
     * Create response message for post "/meetups/{id}/chats"
     * @param {boolean} success
     * @param {string} message
     * @param {Chat} chat
     * @param {string} id
     * @returns {ICreateChatForMeetupResponse}
     */
    static createCreateChatForMeetupRespons(success: boolean, message: string, chat?: Chat, id?: string): ICreateChatForMeetupResponse {
        const response = this.createResponse(CreateChatForMeetupRespons, success, message);
        if (chat) {
            response.chat = chat
        }
        if (id) {
            response.id = id
        }
        return response;
    }

    /**
     * Create request message for "delete /meetups/{id}/chats{id}"
     * @param {boolean} success
     * @param {string} message
     * @returns {IDeleteChatForMeetupResponse}
     */
    static createDeleteChatForMeetupResponse(success: boolean, message: string): IDeleteChatForMeetupResponse {
        return this.createResponse(DeleteChatForMeetupResponse, success, message);
    }

    /**
     * Creates response message for "get /meetups/next5/" route
     * @param {boolean} success
     * @param {string} message
     * @param {Meetup[]} meetups
     * @returns {IGetNext5MeetupsResponse}
     */
    static createGetNext5MeetupsResponse(success: boolean, message: string, meetups?: Meetup[]): IGetNext5MeetupsResponse {
        const response = this.createResponse(GetNext5MeetupsResponse, success, message);
        if (meetups) {
            response.meetups = meetups
        }
        return response;
    }


}
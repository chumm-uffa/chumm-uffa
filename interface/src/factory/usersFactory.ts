/**
 * Class factory for "/users" route Rest API interface
 */
import {BaseFactory} from "./baseFactory";
import {Meetup} from "../model/meetup";
import {MeetupRequest} from "../model/meetup-request";
import {
    GetAllRequestsForUserResponse, GetAllRequestsInStatusForUserResponse, GetAllMeetupsForUserResponse,
    IGetAllRequestsForUserResponse, IGetAllRequestsInStatusForUserResponse,
    IGetAllMeetupsForUserResponse
} from '../interface/users/users';

/**
 * Class factory for "/user" route Rest API interface
 */
export class UsersFactory extends BaseFactory {

    /**
     * Creates response message for "get /users/{id}/meetups" route
     * @param {boolean} success
     * @param {string} message
     * @param {Meetup[]} meetups
     * @returns {IGetAllMeetupsForUserResponse}
     */
    static createGetAllMeetupsForUserResponse(success: boolean, message: string, meetups?: Meetup[]): IGetAllMeetupsForUserResponse {
        const response = this.createResponse(GetAllMeetupsForUserResponse, success, message);
        if (meetups) { response.meetups = meetups }
        return response;
    }

    /**meetup
     * Creates response message for "get /users/{id}/meetup-requests" route
     * @param {boolean} success
     * @param {string} message
     * @param {MeetupRequest[]} requests
     * @returns {IGetAllRequestsForUserResponse}
     */
    static createGetAllRequestsForUserResponse(success: boolean, message: string, requests?: MeetupRequest[]): IGetAllRequestsForUserResponse {
        const response = this.createResponse(GetAllRequestsForUserResponse, success, message);
        if (requests) { response.requests = requests }
        return response;
    }

    /**
     * Creates response message for "get /users/{id}/meetup-requests/{status}" route
     * @param {boolean} success
     * @param {string} message
     * @param {MeetupRequest[]} requests
     * @returns {IGetAllRequestsInStatusForUserResponse}
     */
    static createGetAllRequestsInStatusForUserResponse(success: boolean, message: string, requests?: MeetupRequest[]): IGetAllRequestsInStatusForUserResponse {
        const response = this.createResponse(GetAllRequestsInStatusForUserResponse, success, message);
        if (requests) { response.requests = requests }
        return response;
    }
}
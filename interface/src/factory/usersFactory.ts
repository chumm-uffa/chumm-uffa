/**
 * Class factory for "/users" route Rest API interface
 */
import {BaseFactory} from "./baseFactory";
import {Meetup} from "../model/meetup";
import {GetAllMeetupsForUserResponse, IGetAllMeetupsForUserResponse} from "../interface/users/users";

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
}
/**
 * Class factory for "/meetup-requests" route Rest API interface
 */
import {BaseFactory} from './baseFactory';
import {
    CreateMeetupRequestRequest,
    DeleteMeetupRequestResponse,
    GetMeetupRequestResponse,
    ICreateMeetupRequestRequest,
    ICreateMeetupRequestResponse,
    IDeleteMeetupRequestResponse,
    IGetMeetupRequestResponse,
    IUpdateMeetupRequestRequest,
    IUpdateMeetupRequestResponse,
    UpdateMeetupRequestRequest,
    UpdateMeetupRequestResponse
} from '../interface/meetups/meetup-requests';
import {MeetupRequest} from '../model/meetup-request';

export class MeetupRequestsFactory extends BaseFactory {

    /**
     * Creates response message for "get /meetup-requests" route
     * @param {boolean} success
     * @param {string} message
     * @param {MeetupRequest} meetupRequest
     * @returns {IGetRequestsForMeetupResponse}
     */
    static createGetMeetupRequestResponse(success: boolean, message: string, request?: MeetupRequest): IGetMeetupRequestResponse {
        const response = this.createResponse(GetMeetupRequestResponse, success, message);
        if (request) {
            response.request = request
        }
        return response;
    }

    /**
     * Creates response message for "post /meetup-requests" route
     * @param {boolean} success
     * @param {string} message
     * @param {MeetupRequest} meetupRequest
     * @returns {ICreateMeetupRequestResponse}
     */
    static createCreateMeetupRequestResponse(success: boolean, message: string, request?: MeetupRequest): ICreateMeetupRequestResponse {
        const response = this.createResponse(GetMeetupRequestResponse, success, message);
        if (request) {
            response.request = request
        }
        return response;
    }

    /**
     * Creates request message for "post /meetup-requests" route
     * @param {MeetupRequest} meetupRequest
     * @returns {ICreateMeetupRequest}
     */
    static createCreateMeetupRequestRequest(meetupRequest: MeetupRequest): ICreateMeetupRequestRequest {
        const httpRequest = new CreateMeetupRequestRequest();
        httpRequest.request = meetupRequest;
        return httpRequest;
    }

    /**
     * Creates request message for "put /meetup-requests" route
     * @param {MeetupRequest} meetupRequest
     * @returns {ICreateMeetupRequest}
     */
    static createUpdateMeetupRequestRequest(meetupRequest: MeetupRequest): IUpdateMeetupRequestRequest {
        const httpRequest = new UpdateMeetupRequestRequest();
        httpRequest.request = meetupRequest;
        return httpRequest;
    }

    /**
     * Creates response message for "put /meetup-requests" route
     * @param {boolean} success
     * @param {string} message
     * @param {MeetupRequest} meetupRequest
     * @returns {ICreateMeetupRequestResponse}
     */
    static createUpdateMeetupRequestResponse(success: boolean, message: string, request?: MeetupRequest): IUpdateMeetupRequestResponse {
        const response = this.createResponse(UpdateMeetupRequestResponse, success, message);
        if (request) {
            response.request = request
        }
        return response;
    }

    /**
     * Creates response message for "delete /meetup-requests" route
     * @param {boolean} success
     * @param {string} message
     * @param {MeetupRequest} meetupRequest
     * @returns {ICreateMeetupRequestResponse}
     */
    static createDeleteMeetupRequestResponse(success: boolean, message: string, request?: MeetupRequest): IDeleteMeetupRequestResponse {
        const response = this.createResponse(DeleteMeetupRequestResponse, success, message);
        if (request) {
            response.request = request
        }
        return response;
    }

}
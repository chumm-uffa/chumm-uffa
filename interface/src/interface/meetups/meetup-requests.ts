/**
 * Interfaces for meetup-request of a meetup
 */
import {BaseResponse, IBaseResponse} from "../../interface/baseResponse";
import {MeetupRequest} from "../../model/meetup-request";

export  interface IGetAllRequestsForMeetupResponse  extends IBaseResponse{
    requests: MeetupRequest[];
}

export class GetAllRequestsForMeetupRespons extends BaseResponse implements  IGetAllRequestsForMeetupResponse {
    requests: MeetupRequest[];
}
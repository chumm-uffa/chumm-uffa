import {Meetup} from "../../model/meetup";
import {MeetupRequest} from "../../model/meetup-request";
import {BaseResponse, IBaseResponse} from "../baseResponse";

export  interface IGetAllMeetupsForUserResponse extends IBaseResponse {
    meetups: Meetup[];
}

export class GetAllMeetupsForUserResponse extends BaseResponse implements IGetAllMeetupsForUserResponse {
    meetups: Meetup[];
}

export  interface IGetAllRequestsForUserResponse extends IBaseResponse {
    requests: MeetupRequest[];
}

export class GetAllRequestsForUserResponse extends BaseResponse implements IGetAllRequestsForUserResponse {
    requests: MeetupRequest[];
}

export  interface IGetAllRequestsInStatusForUserResponse extends IBaseResponse {
    requests: MeetupRequest[];
}

export class GetAllRequestsInStatusForUserResponse extends BaseResponse implements IGetAllRequestsInStatusForUserResponse {
    requests: MeetupRequest[];
}

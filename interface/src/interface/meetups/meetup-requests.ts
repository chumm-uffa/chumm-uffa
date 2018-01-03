/**
 * Interfaces for meetup-request of a meetup
 */
import {BaseResponse, IBaseResponse} from "../../interface/baseResponse";
import {MeetupRequest} from "../../model/meetup-request";

// GET meeup/MeetupRequest
export interface IGetAllRequestsForMeetupResponse extends IBaseResponse {
    requests: MeetupRequest[];
}

export class GetAllRequestsForMeetupRespons extends BaseResponse implements IGetAllRequestsForMeetupResponse {
    requests: MeetupRequest[];
}

// GET MeetupRequest
export interface IGetMeetupRequestResponse extends IBaseResponse {
    request: MeetupRequest;
}

export class GetMeetupRequestResponse extends BaseResponse implements IGetMeetupRequestResponse {
    request: MeetupRequest;
}

// POST MeetupRequest
export interface ICreateMeetupRequestRequest {
    request: MeetupRequest;
}

export class CreateMeetupRequestRequest implements ICreateMeetupRequestRequest {
    request: MeetupRequest;
}

export interface ICreateMeetupRequestResponse extends IBaseResponse {
    request: MeetupRequest;
}

export class CreateMeetupRequestResponse extends BaseResponse implements ICreateMeetupRequestResponse {
    request: MeetupRequest;
}

// PUT MeetupRequest
export interface IUpdateMeetupRequestRequest {
    request: MeetupRequest;
}

export class UpdateMeetupRequestRequest implements IUpdateMeetupRequestRequest {
    request: MeetupRequest;
}

export interface IUpdateMeetupRequestResponse extends IBaseResponse {
    request: MeetupRequest;
}

export class UpdateMeetupRequestResponse extends BaseResponse implements IUpdateMeetupRequestResponse {
    request: MeetupRequest;
}

// DELETE MeetupRequest
export interface IDeleteMeetupRequestResponse extends IBaseResponse {
    request: MeetupRequest;
}

export class DeleteMeetupRequestResponse extends BaseResponse implements IDeleteMeetupRequestResponse {
    request: MeetupRequest;
}

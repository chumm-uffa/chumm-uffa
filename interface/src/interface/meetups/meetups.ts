/**
 * Interfaces for meetups
 */
import {BaseResponse, IBaseResponse} from '../baseResponse';
import {Meetup} from '../../model/meetup';
import {SearchDto} from '../../model/searchDto';

export interface IGetAllMeetupsResponse extends IBaseResponse {
    meetups: Meetup[];
}

export interface ICreateMeetupRequest {
    meetup: Meetup;
}

export interface ICreateMeetupResponse extends IBaseResponse {
    id: String;
    meetup: Meetup;
}

export interface IGetMeetupResponse extends IBaseResponse {
    meetup: Meetup;
}

export interface IDeleteMeetupResponse extends IBaseResponse {

}

export interface IUpdateMeetupRequest {
    meetup: Meetup;
}

export interface IUpdateMeetupResponse extends IBaseResponse {
    meetup: Meetup;
}

export interface ISearchMeetupsRequest {
    searchDto: SearchDto;
}

export interface ISearchMeetupsResponse extends IBaseResponse {
    meetups: Meetup[];
}

export interface IGetNext5MeetupsResponse extends IBaseResponse {
    meetups: Meetup[];
}

export class GetAllMeetupsRespons extends BaseResponse implements IGetAllMeetupsResponse {
    meetups: Meetup[];
}

export class CreateMeetupRequest implements ICreateMeetupRequest {
    meetup: Meetup;
}

export class CreateMeetupRespons extends BaseResponse implements ICreateMeetupResponse {
    id: String;
    meetup: Meetup;
}

export class GetMeetupRespons extends BaseResponse implements IGetMeetupResponse {
    meetup: Meetup;
}

export class DeleteMeetupRespons extends BaseResponse implements IDeleteMeetupResponse {
}

export class UpdateMeetupRequest implements IUpdateMeetupRequest {
    meetup: Meetup;
}

export class UpdateMeetupRespons extends BaseResponse implements IUpdateMeetupResponse {
    meetup: Meetup;
}

export class SearchMeetupsRequest implements ISearchMeetupsRequest {
    searchDto: SearchDto;
}

export class SearchMeetupsResponse extends BaseResponse implements ISearchMeetupsResponse {
    meetups: Meetup[];
}

export class GetNext5MeetupsResponse extends BaseResponse implements IGetNext5MeetupsResponse {
    meetups: Meetup[];
}
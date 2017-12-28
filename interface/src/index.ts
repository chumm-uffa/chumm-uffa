import {IBaseResponse, BaseResponse} from './interface/baseResponse';
import {ILoginRequest, ILoginResponse, LoginRequest, LoginResponse} from './interface/auth/login';
import {IRegisterRequest, IRegisterResponse, RegisterRequest, RegisterResponse} from './interface/auth/register';
import {
    CreateMeetupRequest, CreateMeetupRespons, DeleteMeetupRespons, GetAllMeetupsRespons, GetMeetupRespons,
    ICreateMeetupRequest,
    ICreateMeetupResponse, IDeleteMeetupResponse,
    IGetAllMeetupsResponse, IGetMeetupResponse, IUpdateMeetupRequest, IUpdateMeetupResponse, UpdateMeetupRequest,
    UpdateMeetupRespons
} from "./interface/meetups/meetups";
import {GetAllRequestsForMeetupRespons, IGetAllRequestsForMeetupResponse} from "./interface/meetups/meetup-requests";
import {
    CreateChatForMeetupRequest, CreateChatForMeetupRespons, DeleteChatForMeetupResponse,
    GetAllChatsForMeetupRespons, ICreateChatForMeetupRequest, ICreateChatForMeetupResponse,
    IDeleteChatForMeetupResponse,
    IGetAllChatsForMeetupResponse
} from "./interface/meetups/chats";

import {User} from './model/user';
import {Chat} from './model/chat';
import {Hall} from './model/hall';
import {Meetup} from './model/meetup';
import {MeetupRequest, RequestStatus} from './model/meetup-request';
import {SearchDto} from './model/searchDto';

import {AuthFactory} from './factory/authFactory';
import {MeetupsFactory} from './factory/meetupsFactory';

/**
 * The interface version
 * @type {string}
 */
export const Version: String = "v1";

/**
 * Export of factory classes
 */
export  {
    AuthFactory, MeetupsFactory
}


/**
 * Export of communication interface
 */
export {
    IBaseResponse, BaseResponse,

    //*************************
    // All for route "/auth"
    //*************************

    //post /auth/login
    ILoginRequest, LoginRequest,
    ILoginResponse, LoginResponse,

    //post /auth/register
    IRegisterRequest, RegisterRequest,
    IRegisterResponse, RegisterResponse,

    //*************************
    // All for route "/meetups"
    //*************************

    // get /meetups
    IGetAllMeetupsResponse, GetAllMeetupsRespons,

    // post /meetups
    ICreateMeetupRequest, CreateMeetupRequest,
    ICreateMeetupResponse, CreateMeetupRespons,

    // get /meetups/{id}
    IGetMeetupResponse, GetMeetupRespons,

    // delete /meetups/{id}
    IDeleteMeetupResponse, DeleteMeetupRespons,

    // put /meetups/{id}
    IUpdateMeetupRequest, UpdateMeetupRequest,
    IUpdateMeetupResponse, UpdateMeetupRespons,

    // get /meetups/{id}/meetup-requests
    IGetAllRequestsForMeetupResponse, GetAllRequestsForMeetupRespons,

    // get /meetups/{id}/chats
    IGetAllChatsForMeetupResponse, GetAllChatsForMeetupRespons,

    // post /meetups/{id}/chats
    ICreateChatForMeetupRequest, CreateChatForMeetupRequest,
    ICreateChatForMeetupResponse, CreateChatForMeetupRespons,

    // delete /meetups/{id}/chats{id}
    IDeleteChatForMeetupResponse, DeleteChatForMeetupResponse
}

/**
 * Export of model classes
 */
export  {
    User, Chat, Hall, Meetup, MeetupRequest, RequestStatus, SearchDto
}

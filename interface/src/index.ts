import {BaseResponse, IBaseResponse} from './interface/baseResponse';
import {ILoginRequest, ILoginResponse, LoginRequest, LoginResponse} from './interface/auth/login';
import {IRegisterRequest, IRegisterResponse, RegisterRequest, RegisterResponse} from './interface/auth/register';
import {
    IUpdatePasswordRequest,
    IUpdatePasswordResponse,
    UpdatePasswordRequest,
    UpdatePasswordResponse
} from './interface/auth/password';
import {
    CreateMeetupRequest,
    CreateMeetupRespons,
    DeleteMeetupRespons,
    GetAllMeetupsRespons,
    GetMeetupRespons,
    ICreateMeetupRequest,
    ICreateMeetupResponse,
    IDeleteMeetupResponse,
    IGetAllMeetupsResponse,
    IGetMeetupResponse,
    ISearchMeetupsRequest,
    ISearchMeetupsResponse,
    IUpdateMeetupRequest,
    IUpdateMeetupResponse,
    SearchMeetupsRequest,
    SearchMeetupsResponse,
    UpdateMeetupRequest,
    UpdateMeetupRespons
} from './interface/meetups/meetups';
import {
    CreateMeetupRequestRequest,
    CreateMeetupRequestResponse,
    DeleteMeetupRequestResponse,
    GetAllRequestsForMeetupRespons,
    GetMeetupRequestResponse,
    ICreateMeetupRequestRequest,
    ICreateMeetupRequestResponse,
    IDeleteMeetupRequestResponse,
    IGetAllRequestsForMeetupResponse,
    IGetMeetupRequestResponse,
    IUpdateMeetupRequestRequest,
    IUpdateMeetupRequestResponse,
    UpdateMeetupRequestRequest,
    UpdateMeetupRequestResponse
} from './interface/meetups/meetup-requests';
import {
    CreateChatForMeetupRequest,
    CreateChatForMeetupRespons,
    DeleteChatForMeetupResponse,
    GetAllChatsForMeetupRespons,
    ICreateChatForMeetupRequest,
    ICreateChatForMeetupResponse,
    IDeleteChatForMeetupResponse,
    IGetAllChatsForMeetupResponse
} from './interface/meetups/chats';
import {
    DeleteProfileResponse,
    GetProfileRespons,
    IDeleteProfileResponse,
    IGetProfileResponse,
    IUpdateProfileRequest,
    IUpdateProfileResponse,
    UpdateProfileRequest,
    UpdateProfileResponse
} from './interface/auth/profile';
import {
    GetAllMeetupsForUserResponse,
    GetAllRequestsForUserResponse,
    GetAllRequestsInStatusForUserResponse,
    IGetAllMeetupsForUserResponse,
    IGetAllRequestsForUserResponse,
    IGetAllRequestsInStatusForUserResponse
} from './interface/users/users';

import {
    GetAllHallsResponse,
    GetHallRespons,
    IGetAllHallsResponse,
    IGetHallResponse
} from './interface/halls/halls';

import {
    IPushNotification,
    PushNotification,
    NotificationId
} from './interface/notifications/pushNotification';


import {User, Sex} from './model/user';
import {Chat} from './model/chat';
import {Hall} from './model/hall';
import {Meetup} from './model/meetup';
import {MeetupRequest, RequestStatus} from './model/meetup-request';
import {LocationType, SearchDto} from './model/searchDto';

import {BaseFactory} from './factory/baseFactory';
import {AuthFactory} from './factory/authFactory';
import {MeetupsFactory} from './factory/meetupsFactory';
import {HallsFactory} from './factory/hallsFactory';
import {MeetupRequestsFactory} from './factory/meetupRequestsFactory';
import {UsersFactory} from './factory/usersFactory';

/**
 * The interface version
 * @type {string}
 */
export const Version: String = "v1";

/**
 * Export of factory classes
 */
export {
    BaseFactory, AuthFactory, MeetupsFactory, HallsFactory, MeetupRequestsFactory, UsersFactory
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

    //get /auth/profile
    IGetProfileResponse, GetProfileRespons,

    //put /auth/profile
    IUpdateProfileRequest, UpdateProfileRequest,
    IUpdateProfileResponse, UpdateProfileResponse,

    //delete /auth/profile
    IDeleteProfileResponse, DeleteProfileResponse,

    // put /auth/password
    IUpdatePasswordRequest, UpdatePasswordRequest,
    IUpdatePasswordResponse, UpdatePasswordResponse,

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
    IDeleteChatForMeetupResponse, DeleteChatForMeetupResponse,

    // post /meetups/search
    ISearchMeetupsResponse, ISearchMeetupsRequest,
    SearchMeetupsResponse, SearchMeetupsRequest,

    //*************************
    // All for route "/meetup-requests"
    //*************************

    // get /meetups
    IGetMeetupRequestResponse, GetMeetupRequestResponse,

    // post /meetups
    ICreateMeetupRequestRequest, CreateMeetupRequestRequest,
    ICreateMeetupRequestResponse, CreateMeetupRequestResponse,

    // put /meetups
    IUpdateMeetupRequestRequest, UpdateMeetupRequestRequest,
    IUpdateMeetupRequestResponse, UpdateMeetupRequestResponse,

    // delete /meetups
    IDeleteMeetupRequestResponse, DeleteMeetupRequestResponse,

    //*************************
    // All for route "/user"
    //*************************

    //get /users/{id}/meetups
    IGetAllMeetupsForUserResponse, GetAllMeetupsForUserResponse,

    //get /users/{id}/meetup-requests
    IGetAllRequestsForUserResponse, GetAllRequestsForUserResponse,

    //get /users/{id}/meetup-requests/{status}
    IGetAllRequestsInStatusForUserResponse, GetAllRequestsInStatusForUserResponse,

    //*************************
    // All for route "/halls"
    //*************************

    // get /halls
    IGetAllHallsResponse, GetAllHallsResponse,

    // get /halls/{id}
    IGetHallResponse, GetHallRespons
}

/**
 * Export of model classes
 */
export {
    User, Chat, Hall, Meetup, MeetupRequest, RequestStatus, SearchDto, LocationType, Sex
}

/**
 * Export Notification
 */
export {
    IPushNotification, PushNotification, NotificationId
}

/**
 * Interfaces for chat of a meetup
 */
import {IBaseResponse} from "../baseResponse";
import {Chat} from "../../model/chat";
import {BaseResponse} from "../../interface/baseResponse";

export  interface IGetAllChatsForMeetupResponse extends IBaseResponse {
    chats: Chat[];
}

export  interface ICreateChatForMeetupRequest {
    chat: Chat;
}

export  interface ICreateChatForMeetupResponse extends IBaseResponse {
    id: string;
    chat: Chat;
}

export  interface IDeleteChatForMeetupResponse extends IBaseResponse {
}

export class GetAllChatsForMeetupRespons extends BaseResponse implements IGetAllChatsForMeetupResponse {
    chats: Chat[];
}

export class CreateChatForMeetupRequest implements ICreateChatForMeetupRequest {
    chat: Chat;
}

export class CreateChatForMeetupRespons extends BaseResponse implements ICreateChatForMeetupResponse {
    id: string;
    chat: Chat;
}

export class DeleteChatForMeetupResponse extends BaseResponse implements IDeleteChatForMeetupResponse{

}
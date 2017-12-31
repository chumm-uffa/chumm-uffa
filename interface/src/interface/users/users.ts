import {Meetup} from "../../model/meetup";
import {BaseResponse, IBaseResponse} from "../baseResponse";

export  interface IGetAllMeetupsForUserResponse extends IBaseResponse {
    meetups: Meetup[];
}

export class GetAllMeetupsForUserResponse extends BaseResponse implements IGetAllMeetupsForUserResponse {
    meetups: Meetup[];
}

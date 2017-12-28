import {User} from "../../model/user";
import {BaseResponse, IBaseResponse} from "../baseResponse";

export  interface IGetProfileResponse extends IBaseResponse {
    profile: User;
}

export  interface IUpdateProfileRequest {
    profile: User;
}

export  interface IUpdateProfileResponse extends IBaseResponse {
    profile: User;
}

export  interface IDeleteProfileResponse extends IBaseResponse {
}

export class GetProfileRespons extends BaseResponse implements IGetProfileResponse {
    profile: User;
}

export class UpdateProfileRequest  implements IUpdateProfileRequest {
    profile: User;
}

export class UpdateProfileResponse extends BaseResponse implements UpdateProfileResponse{
    profile: User;
}

export class DeleteProfileResponse extends BaseResponse implements IDeleteProfileResponse {
}

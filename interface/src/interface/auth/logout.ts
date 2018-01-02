import {BaseResponse, IBaseResponse} from "../baseResponse";

export interface ILogoutResponse extends IBaseResponse{
    tocken: string;
}

export class LogoutResponse extends BaseResponse implements ILogoutResponse {
    tocken: string;
}

import {User} from '../../model/user';
import {BaseResponse, IBaseResponse} from '../baseResponse';

export interface ILoginRequest {
    user: User;
}

export interface ILoginResponse extends IBaseResponse{
    token: string;
    user: User;
}

export class LoginRequest implements ILoginRequest{
    user: User;
}

export class LoginResponse extends BaseResponse implements ILoginResponse {
    public token: string;
    public user: User;
}

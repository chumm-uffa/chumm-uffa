import {User} from '../../model/user';
import {BaseResponse, IBaseResponse} from '../baseResponse';

export interface ILoginRequest extends IBaseResponse{
    email: string;
    password: string;
}

export interface ILoginResponse extends IBaseResponse{
    token: string;
    user: User;
}

export class LoginRequest extends BaseResponse implements ILoginRequest{
    public email: string;
    public password: string;
}

export class LoginResponse extends BaseResponse implements ILoginResponse {
    public token: string;
    public user: User;
}

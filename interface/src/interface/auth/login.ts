import {User} from '../../model/user';
import {BaseResponse, IBaseResponse} from '../baseResponse';

export interface ILoginRequest extends IBaseResponse{
    user: User;
}

export interface ILoginResponse extends IBaseResponse{
    token: string;
    user: User;
}

export class LoginRequest extends BaseResponse implements ILoginRequest{
    user: User;
}

export class LoginResponse extends BaseResponse implements ILoginResponse {
    public token: string;
    public user: User;
}

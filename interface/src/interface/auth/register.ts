import {BaseResponse, IBaseResponse} from '../baseResponse';
import {User} from '../../model/user';

export interface IRegisterRequest extends IBaseResponse{
    user: User;
}

export interface IRegisterResponse extends IBaseResponse{
    id: string;
    user: User;
}

export class RegisterRequest extends BaseResponse implements IRegisterRequest{
    public user: User;
}

export class RegisterResponse extends BaseResponse implements IRegisterResponse{
    public id: string;
    public user: User;
}
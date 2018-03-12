import {BaseResponse, IBaseResponse} from '../baseResponse';

export interface IUpdatePasswordRequest extends IBaseResponse{
    oldPassord: string;
    newPassword: string;
}

export interface IUpdatePasswordResponse extends IBaseResponse{
}

export class UpdatePasswordRequest extends BaseResponse implements IUpdatePasswordRequest{
    oldPassord: string;
    newPassword: string;
}

export class UpdatePasswordResponse extends BaseResponse implements IUpdatePasswordResponse{
}
export interface IBaseResponse{
    success: boolean;
    message: string;
}

export class BaseResponse implements IBaseResponse{
    public success: boolean;
    public message: string;
}
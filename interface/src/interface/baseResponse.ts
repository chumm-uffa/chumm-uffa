export interface IBaseResponse{
    success: boolean;
    message: string;
}

export class BaseResponse implements IBaseResponse{
    public success: boolean;
    public message: string;

    public static fromJSON(json: any) {
        const response =  new BaseResponse();
        response.success = json.success;
        response.message = json.message;
        return response;
    }
}
import {BaseResponse, IBaseResponse} from "../interface/baseResponse";

export class BaseFactory {

    /**
     * Create general response message
     * @param {boolean} success
     * @param {string} message
     * @returns {IBaseResponse}
     */
    static createBaseResponse (success: boolean, message: string) : IBaseResponse {
        return this.createResponse(BaseResponse, success, message);
    }

    /**
     * Generic function to create response class an set member variables
     * @param {{new() => T}} baseResponse
     * @param {boolean} success
     * @param {string} message
     * @returns {T}
     */
    static createResponse <T extends IBaseResponse>(baseResponse:{new(): T;}, success: boolean, message: string): T {
        var response: T;
        response = new baseResponse();
        response.message = message;
        response.success = success;
        return response;
    }
}
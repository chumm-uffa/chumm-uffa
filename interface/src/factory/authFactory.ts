import {User} from "../model/user";
import {ILoginRequest, ILoginResponse, LoginRequest, LoginResponse} from "../interface/auth/login";
import {IRegisterRequest, IRegisterResponse, RegisterRequest, RegisterResponse} from "../interface/auth/register";
import {BaseFactory} from "./baseFactory";
import {
    DeleteProfileResponse,
    GetProfileRespons, IDeleteProfileResponse, IGetProfileResponse, IUpdateProfileRequest, IUpdateProfileResponse,
    UpdateProfileRequest, UpdateProfileResponse
} from "../interface/auth/profile";
import {ILogoutResponse, LogoutResponse} from "../interface/auth/logout";

export class AuthFactory extends BaseFactory{

    /**
     * Create request message for "post /auth/login" route
     * @param {User} user
     * @returns {LoginRequest}
     */
    static createLoginRequest (user: User) : ILoginRequest {
        const request = new LoginRequest();
        request.user = user;
        return request;
    }

    /**
     * Creates response message for "post /auth/login" route
     * @param {boolean} success
     * @param {string} message
     * @param {string} token
     * @param {User} user
     * @returns {LoginResponse}
     */
    static createLoginResponse (success: boolean, message: string, token?: string, user?: User) : ILoginResponse {
        const response = this.createResponse(LoginResponse, success, message);
        if (token) { response.token = token }
        if (user) { response.user = user }
        return response;
    }

    /**
     * Creates response message for "post /auth/logout" route
     * @param {boolean} success
     * @param {string} message
     * @returns {ILogoutResponse}
     */
    static createLogoutResponse (success: boolean, message: string) : ILogoutResponse {
        const response = this.createResponse(LogoutResponse, success, message);
        response.tocken = "";
        return response;
    }
    /**
     * Create request message for "post /auth/register" route
     * @param {User} user
     * @returns {IRegisterRequest}
     */
    static createRegisterRequest(user: User) :IRegisterRequest {
        const request = new RegisterRequest();
        request.user = user;
        return request;
    }

    /**
     * Create response message for "post /auth/register" route
     * @param {boolean} success
     * @param {string} message
     * @param {User} user
     * @param {string} id
     * @returns {IRegisterResponse}
     */
    static createRegisterResponse(success: boolean, message: string, user?: User, id?:string) :IRegisterResponse {
        const response = this.createResponse(RegisterResponse, success, message);
        if (id) { response.id = id }
        if (user) { response.user = user }
        return response;
    }

    /**
     * Create response message for "get /auth/profile" route
     * @param {boolean} success
     * @param {string} message
     * @param {User} profile
     * @returns {IGetProfileResponse}
     */
    static createGetProfileRespons(success: boolean, message: string, profile?: User) :IGetProfileResponse {
        const response = this.createResponse(GetProfileRespons, success, message);
        if (profile) { response.profile = profile }
        return response;
    }

    /**
     * Create request message for "put /auth/profile" route
     * @param {User} profile
     * @returns {IUpdateProfileRequest}
     */
    static createUpdateProfileRequest( profile: User) :IUpdateProfileRequest {
        const request =  new UpdateProfileRequest();
        request.profile = profile
        return request;
    }

    /**
     * Create response message for "put /auth/profile" route
     * @param {boolean} success
     * @param {string} message
     * @param {User} profile
     * @returns {IUpdateProfileResponse}
     */
    static createUpdateProfileResponse(success: boolean, message: string, profile?: User) :IUpdateProfileResponse {
        const response = this.createResponse(UpdateProfileResponse, success, message);
        if (profile) { response.profile = profile }
        return response;
    }

    /**
     * Create request message for "delete /auth/profile" route
     * @param {boolean} success
     * @param {string} message
     * @param {User} profile
     * @returns {IDeleteProfileResponse}
     */
    static createDeleteProfileResponse(success: boolean, message: string, profile?: User) :IDeleteProfileResponse {
        return this.createResponse(DeleteProfileResponse, success, message);
    }

}
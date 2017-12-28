import {User} from "../model/user";
import {ILoginRequest, ILoginResponse, LoginRequest, LoginResponse} from "../interface/auth/login";
import {IRegisterRequest, IRegisterResponse, RegisterRequest, RegisterResponse} from "../interface/auth/register";
import {BaseFactory} from "./baseFactory";

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
}
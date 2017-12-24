import {IBaseResponse, BaseResponse} from './interface/baseResponse';
import {ILoginRequest, ILoginResponse, LoginRequest, LoginResponse} from './interface/auth/login';
import {IRegisterRequest, IRegisterResponse, RegisterRequest, RegisterResponse} from './interface/auth/register';
import {User} from './model/user';

/**
 * The interface version
 * @type {string}
 */
export const Version: String = "v1";

/**
 * Create a login request
 * @param {User} user
 * @returns {LoginRequest}
 */
export function createLoginRequest (user: User) : ILoginRequest {
    const request = new LoginRequest();
    request.user = user;
    return request;
}

/**
 * Creates a login response
 * @param {boolean} success
 * @param {string} message
 * @param {string} token
 * @param {User} user
 * @returns {LoginResponse}
 */
export function createLoginResponse (success: boolean, message: string, token?: string, user?: User) : ILoginResponse {
    const response = new LoginResponse();
    response.success = success;
    response.message = message;
    if (token) { response.token = token }
    if (user) { response.user = user }
    return response;
}

/**
 * Creates a register request
 * @param {User} user
 * @returns {IRegisterRequest}
 */
export function createRegisterRequest(user: User) :IRegisterRequest {
    const request = new RegisterRequest();
    request.user = user;

    return request;
}

/**
 * Creates a register response
 * @param {boolean} success
 * @param {string} message
 * @param {User} user
 * @param {string} id
 * @returns {IRegisterResponse}
 */
export function createRegisterResponse(success: boolean, message: string, user?: User, id?:string) :IRegisterResponse {
    const response = new RegisterResponse();
    response.success = success;
    response.message = message;
    if (id) { response.id = id }
    if (user) { response.user = user }
    return response;
}

/**
 * Export of communication interface
 */
export {
    IBaseResponse,
    BaseResponse,

    ILoginRequest,
    LoginRequest,

    ILoginResponse,
    LoginResponse,

    IRegisterRequest,
    RegisterRequest,

    IRegisterResponse,
    RegisterResponse,
}

/**
 * Export of model classes
 */
export  {
    User
}

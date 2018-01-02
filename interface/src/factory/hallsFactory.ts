/**
 * Class factory for "/halls" route Rest API interface
 */
import {GetAllHallsResponse, GetHallRespons, IGetAllHallsResponse, IGetHallResponse} from "../interface/halls/halls";
import {Hall} from "../model/hall";
import {BaseFactory} from "./baseFactory";

/**
 * Class factory for "/halls" route Rest API interface
 */
export class HallsFactory extends BaseFactory {

    /**
     * Create response message for "get /halls" route
     * @param {boolean} success
     * @param {string} message
     * @param {Hall[]} halls
     * @returns {IGetAllHallsResponse}
     */
    static createGetAllHallsResponse(success: boolean, message: string, halls?: Hall[]): IGetAllHallsResponse {
        const response = this.createResponse(GetAllHallsResponse, success, message);
        if (halls) { response.halls = halls }
        return response;
    }

    /**
     * Create response message for "get /halls/{id}" route
     * @param {boolean} success
     * @param {string} message
     * @param {Hall} hall
     * @returns {IGetHallResponse}
     */
    static createGetHallRespons(success: boolean, message: string, hall?: Hall): IGetHallResponse {
        const response = this.createResponse(GetHallRespons, success, message);
        if (hall) { response.hall = hall }
        return response;
    }
}
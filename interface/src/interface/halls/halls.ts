/**
 * Interfaces for halls
 */
import {BaseResponse, IBaseResponse} from "../baseResponse";
import {Hall} from "../../model/hall";

export  interface IGetAllHallsResponse extends IBaseResponse {
    halls: Hall[];
}

export  interface IGetHallResponse extends IBaseResponse {
    hall: Hall;
}

export class GetAllHallsResponse extends BaseResponse implements IGetAllHallsResponse {
    halls: Hall[];
}

export class GetHallRespons extends BaseResponse implements IGetHallResponse {
    hall: Hall;
}

/**
 * chumm-uff
 **/
import { Request, Response, Router } from 'express';
import { BaseController } from './baseController';

export class HallController extends BaseController {

    /**
     * Getting all available hall
     * @param {Request} req
     * @param {Response} res
     */
    public allHall(req: Request, res: Response){
        res.json({success: true});
    }

}
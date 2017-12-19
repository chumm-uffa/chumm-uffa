/**
 * chumm-uff
 **/
import { Request, Response, Router } from 'express';
import { BaseController } from './baseController';

export class UserController extends BaseController {

    /**
     * Getting the details of the
     * @param {Request} req
     * @param {Response} res
     */
    public allUser(req: Request, res: Response){
        res.json({success: true});
    }

    /**
     * Getting the details of the
     * @param {Request} req
     * @param {Response} res
     */
    public detail(req: Request, res: Response){
        res.json({success: true});
    }
}
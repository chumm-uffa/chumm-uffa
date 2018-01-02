/**
 * chumm-uffa
 */
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

import { BaseFactory } from '@chumm-uffa/interface';


/**
 * http(s) middleware guard
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 * @returns {Response}
 */
export const guard = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.APPLICATION_SECRET, (err, user) => {
            if (err) {
                console.error(err);
                return res.status(401).send(BaseFactory.createBaseResponse(false,'Failed to authenticate token.'));
            } else {
                req.body.loginProfile = user._doc;
                next();
            }
        });
    } else {
        return res.status(403).send(BaseFactory.createBaseResponse( false, 'No token provided.'));
    }
};
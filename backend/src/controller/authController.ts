/**
 * chumm-uffa
 */
import * as jwt from 'jsonwebtoken';

import { Request, Response, Router } from 'express';
import { BaseController } from './baseController';

import { DBUser, IDBUser, IDBUserModel } from '../models/user/model';

import {
    createLoginResponse, createRegisterResponse, ILoginRequest, IRegisterRequest
} from '@chumm-uffa/interface';

export class AuthController extends BaseController {
    /**
     * Regular expression to test mail format
     * @type {RegExp}
     */
    private regExMail = /\S+@\S+\.\S+/;

    /**
     * Login the given email/password
     * @param {Request} req
     * @param {Response} res
     */
    public login(req: Request, res: Response) {
        const loginRequest: ILoginRequest = req.body;

        // Username and password must be present
        if (!loginRequest.user ||
            !loginRequest.user.username ||
            !loginRequest.user.password) {
            res.status(400);
            res.json(createRegisterResponse(false, 'wrong input.'));
            return;
        }

        // Find user via email
        DBUser.findOne({username: loginRequest.user.username}).then((dbUser) => {
            if (dbUser) {
                if (dbUser.comparePassword(loginRequest.user.password)) {
                    const token = jwt.sign(dbUser, process.env.APPLICATION_SECRET, {
                        expiresIn: 604800 // 1 week && npm pack
                    });
                    res.json(createLoginResponse(true, 'successfully logged in.', token, dbUser.toInterface()));
                    return;
                }
                res.status(400);
                res.json(createLoginResponse(false, 'wrong credentials.'));
                return;
            } else {
                res.status(400);
                res.json(createLoginResponse(false, 'user not exists.'));
            }
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(createLoginResponse(false, 'something went wrong.'));
        });
    }

    /**
     * Logout the current user profile
     * @param {Request} req
     * @param {Response} res
     */
    public logout(req: Request, res: Response) {
        res.status(200);
        res.json({success: true, auth: false, token: null });
    }

    /**
     * Register a new user profile
     * @param {Request} req
     * @param {Response} res
     */
    public register(req: Request, res: Response) {
        const registerRequest: IRegisterRequest = req.body;

        // Username and password must be present
        if (!registerRequest.user ||
            !registerRequest.user.username ||
            !registerRequest.user.password) {
            res.status(400);
            res.json(createRegisterResponse(false, 'wrong input.'));
            return;
        }

        // If email is present, the format must be valid
        if (registerRequest.user.email && !this.regExMail.test(registerRequest.user.email)) {
            res.status(400);
            res.json(createRegisterResponse(false, 'wrong email format.'));
        }

        DBUser.findOne({username: registerRequest.user.username}).then((dbUser) => {
            if (!dbUser) {
                const dbUser: IDBUserModel = new DBUser();
                dbUser.fromInterface(registerRequest.user);
                dbUser.save().then((result) => {
                    res.json(createRegisterResponse(true, 'user created.', result.toInterface(), result.id));
                }).catch((err) => {
                    this.logger.error(err.toString());
                    res.status(500);
                    res.json(createRegisterResponse(false, 'something went wrong.'));
                });
                return;
            }

            res.status(400);
            res.json(createRegisterResponse(false, 'this email address has already been taken.'));
            return;
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(createRegisterResponse(false, 'something went wrong.'));
            return;
        });
    }

    /**
     * Getting the current logged in profile
     * @param {Request} req
     * @param {Response} res
     */
    public profile(req: Request, res: Response) {
        res.json({success: true, user: req.body.user});
    }
}

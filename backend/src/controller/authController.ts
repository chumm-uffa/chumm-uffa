/**
 * chumm-uffa
 */
import * as jwt from 'jsonwebtoken';

import { Request, Response, Router } from 'express';
import { IUser, User } from '../models/user/model';
import { BaseController } from './baseController';

import {
    createLoginResponse, createRegisterResponse, ILoginRequest, IRegisterRequest,
    User as _User
} from '@pepe.black/chumm-uffa-interface';

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
        // Test email format
        if (!this.regExMail.test(loginRequest.email)) {
            res.status(400);
            res.json(createLoginResponse(false, 'wrong input.'));
        }

        // Find user via email
        User.findByEmail(loginRequest.email).then((user) => {
            if (user) {
                if (User.comparePassword(loginRequest.password, user.password)) {
                    const token = jwt.sign(user, process.env.APPLICATION_SECRET, {
                        expiresIn: 604800 // 1 week
                    });

                    const loginUser: _User = new _User();
                    loginUser.email = user.email;
                    loginUser.username = user.username;
                    loginUser.sex = user.sex;
                    loginUser.weight = user.weight;

                    res.json(createLoginResponse(true, 'successfully logged in.', token, loginUser));
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
    public logout(req: Request, res: Response){
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

        if (!registerRequest.user ||
            !registerRequest.user.username ||
            !this.regExMail.test(registerRequest.user.email) ||
            !registerRequest.user.password) {
            res.status(400);
            res.json(createRegisterResponse(false, 'wrong input.'));
            return;
        }

        User.findByEmail(registerRequest.user.email).then((user) => {
            if (!user) {
                const newUser: IUser = new User();
                newUser.username = registerRequest.user.username;
                newUser.email = registerRequest.user.email;
                newUser.password = registerRequest.user.password;
                newUser.sex = registerRequest.user.sex;
                newUser.weight = registerRequest.user.weight;

                User.createUser(newUser).then((result) => {
                    res.json(createRegisterResponse(true, 'user created.', registerRequest.user, result.id));
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
    public profile(req: Request, res: Response){
        res.json({success: true, user: req.body.user});
    }
}

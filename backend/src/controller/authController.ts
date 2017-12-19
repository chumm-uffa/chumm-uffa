/**
 * chumm-uffa
 */
import * as jwt from 'jsonwebtoken';

import { Request, Response, Router } from 'express';
import { User } from '../models/user/model';
import { BaseController } from './baseController';

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
        // Test email format
        if (!this.regExMail.test(req.body.email)) {
            res.status(400);
            res.json({success: false, message: 'wrong input.'});
        }

        // Find user via email
        User.findByEmail(req.body.email).then((user) => {
            if (user) {
                if (User.comparePassword(req.body.password, user.password)) {
                    const token = jwt.sign(user, process.env.APPLICATION_SECRET, {
                        expiresIn: 604800 // 1 week
                    });
                    res.json({success: true, token: token, message: 'successfully logged in'});
                    return;
                }
                res.status(400);
                res.json({success: false, token: null, message: 'wrong credentials.'});
                return;
            } else {
                res.status(400);
                res.json({success: false, token: null, message: 'user not exists.'});
            }
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json({success: false, message: 'something went wrong.'});
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
    public register(req: Request, res: Response){
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        if (!username || !this.regExMail.test(email) || !password || password.length < 6) {
            res.status(400);
            res.json({success: false, message: 'wrong input.'});
            return;
        }

        User.findByEmail(email).then((user) => {
            if (!user) {
                const newUser = new User({
                    username : username,
                    email: email,
                    password: password
                });

                User.createUser(newUser).then((result) => {
                    res.json({success: true, message: 'user created.'});
                }).catch((err) => {
                    this.logger.error(err.toString());
                    res.status(500);
                    res.json({success: false, message: 'something went wrong.'});
                });
                return;
            }

            res.status(400);
            res.json({success: false, message: 'this email address has already been taken.'});
            return;
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json({success: false, message: 'something went wrong.'});
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

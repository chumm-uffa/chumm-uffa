/**
 * chumm-uffa
 */
import * as jwt from 'jsonwebtoken';

import { Request, Response, Router } from 'express';
import { User } from '../models/user';
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
        const email = req.body.email;

        // Test email format
        if (!this.regExMail.test(email)) {
            res.status(400);
            res.json({success: false, message: 'wrong input.'});
        }

        // Find user via email
        User.findByEmail(email, (err, user) => {
            if (user) {
                User.comparePassword(req.body.password, user.password, (compareErr, isMatch) => {
                    if (compareErr) {
                        this.logger.error(compareErr.toString());
                        res.status(500);
                        res.json({success: false, message: 'something went wrong.'});
                        return;
                    }

                    if (isMatch) {
                        const token = jwt.sign(user, process.env.APPLICATION_SECRET, {
                            expiresIn: 604800 // 1 week
                        });
                        res.json({success: true, token: { token }, message: 'successfully logged in'});
                        return;
                    }

                    res.status(400);
                    res.json({success: false, token: null, message: 'wrong credentials.'});
                });
            } else {
                res.status(200);
                res.json({success: false, token: null, message: 'wrong credentials.'});
            }
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
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if (!name || !this.regExMail.test(email) || !password || password.length < 6) {
            res.status(400);
            res.json({success: false, message: 'wrong input.'});
            return;
        }

        User.findByEmail(email, (err, user) => {
            if (err) {
                this.logger.error(err.toString());
                res.status(500);
                res.json({success: false, message: 'something went wrong.'});
                return;
            }

            if (!user) {
                const newUser = new User({
                    name : name,
                    email: email,
                    password: password
                });

                User.createUser(newUser, (createErr, createdUser) => {
                    if (createErr) {
                        this.logger.error(createErr.toString());
                        res.status(500);
                        res.json({success: false, message: 'something went wrong.'});
                    } else {
                        res.json({success: true, message: 'user created.'});
                    }
                });
                return;
            }

            res.status(400);
            res.json({success: false, message: 'this email address has already been taken.'});
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

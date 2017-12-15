/**
 * chumm-uffa
 */
import * as jwt from 'jsonwebtoken';

import { Request, Response, Router } from 'express';

import { User } from '../../models/user';
import { BaseRoute } from '../BaseRoute';

export class Auth extends BaseRoute {

    public loginAction(router: Router): void {
        router.post('/login', (req: Request, res: Response) => {
            const email = req.body.email;
            const re = /\S+@\S+\.\S+/;

            if (!re.test(email)) {
                res.status(400);
                res.json({
                    success: false,
                    message: 'wrong input.'
                });
                return false;
            }

            User.findByEmail(email, (err, user) => {
                if (user) {
                    User.comparePassword(req.body.password, user.password, (compareErr, isMatch) => {
                        if (compareErr) {
                            this.logger.error(compareErr.toString());
                            res.status(500);
                            res.json({
                                success: false,
                                message: 'something went wrong.'
                            });
                        } else if (isMatch) {
                            const token = jwt.sign(user, process.env.APPLICATION_SECRET, {
                                expiresIn: 604800 // 1 week
                            });

                            res.json({
                                success: true,
                                token: { token }
                            });
                        } else {
                            res.status(400);
                            res.json({
                                success: false,
                                message: 'wrong credentials.'
                            });
                        }
                    });
                } else {
                    res.status(400);
                    res.json({
                        success: false,
                        message: 'wrong credentials.'
                    });
                }
            });
        });
    }

    public registerAction(router: Router): void {
        router.post('/register', (req: Request, res: Response) => {
            const re = /\S+@\S+\.\S+/;

            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;

            if (!name || !re.test(email) || !password || password.length < 6) {
                res.status(400);
                res.json({
                    success: false,
                    message: 'wrong input.'
                });
                return false;
            }

            User.findByEmail(email, (err, user) => {
                if (err) {
                    this.logger.error(err.toString());
                    res.status(500);
                    res.json({
                        success: false,
                        message: 'something went wrong.'
                    });
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
                            res.json({
                                success: false,
                                message: 'something went wrong.'
                            });
                        } else {
                            res.json({
                                success: true,
                                message: 'user created.'
                            });
                        }
                    });
                    return;
                }

                res.status(400);
                res.json({
                    success: false,
                    message: 'this email address has already been taken.'
                });
            });
        });
    }

    public profileAction(router: Router): void {
        router.get('/profile', this.guard, (req: Request, res: Response) => {
            res.json({
                success: true,
                user: req.body.user
            });
        });
    }
}

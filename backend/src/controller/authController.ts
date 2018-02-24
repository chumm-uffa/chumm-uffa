/**
 * chumm-uffa
 */
import * as jwt from 'jsonwebtoken';

import {Request, Response} from 'express';
import {BaseController} from './baseController';

import {DBUser, IDBUserModel} from '../models/user/model';

import {
    AuthFactory,
    ILoginRequest,
    IRegisterRequest,
    IUpdatePasswordRequest,
    IUpdateProfileRequest
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
            res.json(AuthFactory.createRegisterResponse(false, 'wrong input.'));
            return;
        }

        // Find user via email
        DBUser.findOne({username: loginRequest.user.username}).then((dbUser) => {
            if (dbUser) {
                if (dbUser.comparePassword(loginRequest.user.password)) {
                    const token = jwt.sign(dbUser, process.env.APPLICATION_SECRET, {
                        expiresIn: 604800 // 1 week && npm pack
                    });
                    dbUser.toInterface().then((user) => {
                        res.json(AuthFactory.createLoginResponse(true, 'successfully logged in.', token, user));
                    });
                    return;
                }
                res.status(400);
                res.json(AuthFactory.createLoginResponse(false, 'wrong credentials.'));
                return;
            } else {
                res.status(400);
                res.json(AuthFactory.createLoginResponse(false, 'user not exists.'));
            }
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(AuthFactory.createLoginResponse(false, 'something went wrong.'));
        });
    }

    /**
     * Logout the current user profile
     * @param {Request} req
     * @param {Response} res
     */
    public logout(req: Request, res: Response) {
        res.status(200);
        res.json(AuthFactory.createLogoutResponse(true, ''));
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
            res.json(AuthFactory.createRegisterResponse(false, 'wrong input.'));
            return;
        }

        // If email is present, the format must be valid
        if (registerRequest.user.email && !this.regExMail.test(registerRequest.user.email)) {
            res.status(400);
            res.json(AuthFactory.createRegisterResponse(false, 'wrong email format.'));
        }

        DBUser.findOne({username: registerRequest.user.username}).then((dbUser) => {
            if (!dbUser) {
                const dbUser: IDBUserModel = new DBUser();
                dbUser.fromInterface(registerRequest.user);
                dbUser.hashPassword(registerRequest.user.password);
                dbUser.save().then((dbUser) => {
                    return dbUser.toInterface();
                }).then((user) => {
                    res.json(AuthFactory.createRegisterResponse(true, 'user created.', user, user.id));
                }).catch((err) => {
                    this.logger.error(err.toString());
                    res.status(500);
                    res.json(AuthFactory.createRegisterResponse(false, 'something went wrong.'));
                });
                return;
            }

            res.status(400);
            res.json(AuthFactory.createRegisterResponse(false, 'this user name has already been taken.'));
            return;
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(AuthFactory.createRegisterResponse(false, 'something went wrong.'));
            return;
        });
    }

    /**
     * Getting the current logged in profile
     * @param {Request} req
     * @param {Response} res
     */
    public getProfile(req: Request, res: Response) {
        res.json(AuthFactory.createGetProfileRespons(true, '', req.body.profile));
    }

    /**
     * Changes the current logged in profile
     * @param {Request} req
     * @param {Response} res
     */
    public updateProfile(req: Request, res: Response) {
        const updateRequest: IUpdateProfileRequest = req.body;

        // Check if id of profile and user to change are the same
        if (updateRequest.profile.id !== req.body.loginProfile._id) {
            res.status(400);
            res.json(AuthFactory.createUpdateProfileResponse(false, 'wrong user id, only login user can be changed.'));
            return;
        }

        // If email is present, the format must be valid
        if (updateRequest.profile.email && !this.regExMail.test(updateRequest.profile.email)) {
            res.status(400);
            res.json(AuthFactory.createUpdateProfileResponse(false, 'wrong email format.'));
            return;
        }

        // Getting the current user based on user name
        DBUser.findOne({username: req.body.loginProfile.username}).then((profileDbUser) => {
            if (profileDbUser) {
                // Getting the new user based on user name
                DBUser.findOne({username: updateRequest.profile.username}).then((newDbUser) => {
                    // Check if the username alreday exist
                    if (!newDbUser || newDbUser.id === profileDbUser.id) {
                        profileDbUser.fromInterface(updateRequest.profile);
                        if (updateRequest.profile.password) {
                            profileDbUser.hashPassword(updateRequest.profile.password);
                        }
                        profileDbUser.save().then((dbUser) => {
                            return dbUser.toInterface();
                        }).then((user) => {
                            res.json(AuthFactory.createUpdateProfileResponse(true, 'user changed.', user));
                        }).catch((err) => {
                            this.logger.error(err.toString());
                            res.status(500);
                            res.json(AuthFactory.createUpdateProfileResponse(false, 'something went wrong.'));
                        });
                        return;
                    }
                    res.status(400);
                    res.json(AuthFactory.createUpdateProfileResponse(false, 'user name already exists'));
                    return;
                }).catch((err) => {
                    this.logger.error(err.toString());
                    res.status(500);
                    res.json(AuthFactory.createUpdateProfileResponse(false, 'something went wrong.'));
                    return;
                });
                return;
            }

            res.status(400);
            res.json(AuthFactory.createUpdateProfileResponse(false, 'user not exists.'));
            return;
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(AuthFactory.createUpdateProfileResponse(false, 'something went wrong.'));
            return;
        });
    }


    /**
     * Changes the password of the logged in profile
     * @param {Request} req
     * @param {Response} res
     */
    public updatePassword(req: Request, res: Response) {
        const updateRequest: IUpdatePasswordRequest = req.body;

        // If password is present, the format must be valid
        if (!updateRequest.newPassword || updateRequest.newPassword.length < 8) {
            res.status(400);
            res.json(AuthFactory.createUpdatePasswordResponse(false, 'invalid new password.'));
            return;
        }

        // Getting the current user based on user name
        DBUser.findOne({username: req.body.loginProfile.username}).then((profileDbUser) => {
            if (profileDbUser) {

                if (profileDbUser.comparePassword(updateRequest.oldPassord)) {
                    profileDbUser.hashPassword(updateRequest.newPassword);
                    profileDbUser.save().then((dbUser) => {
                        return dbUser.toInterface();
                    }).then((user) => {
                        res.json(AuthFactory.createUpdatePasswordResponse(true, 'user password changed.'));
                    }).catch((err) => {
                        this.logger.error(err.toString());
                        res.status(500);
                        res.json(AuthFactory.createUpdatePasswordResponse(false, 'something went wrong.'));
                    });
                } else {
                    this.logger.error('wrong password');
                    res.status(400);
                    res.json(AuthFactory.createUpdatePasswordResponse(false, 'something went wrong.'));
                }
                return;
            }

            res.status(400);
            res.json(AuthFactory.createUpdatePasswordResponse(false, 'user not exists.'));
            return;
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(AuthFactory.createUpdatePasswordResponse(false, 'something went wrong.'));
            return;
        });
    }

}

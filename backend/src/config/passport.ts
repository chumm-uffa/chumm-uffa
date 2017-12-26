/**
 * chumm-uffa
 */
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PassportStatic } from 'passport';

import { DBUser } from '../models/user/model';

/**
 * passport jwt configuration
 */
export class PassportConfig {

    public passport: PassportStatic;

    constructor(passport: any) {
        this.passport = passport;
    }

    public init() {
        const opts = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
            secretOrKey: process.env.APPLICATION_SECRET
        };

        this.passport.use(new Strategy(opts, (jwtPayload, done) => {
            DBUser.findOne({_id: jwtPayload._doc._id}, (err, user) => {
                if (err) {
                    return done(err, false);
                } else if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }));
    }
}

/**
 * chumm-uffa
 */
import * as express from 'express';
import {Auth} from './auth';

const user = express.Router();

user.use('/auth', new Auth().getRoutes());

export default user;

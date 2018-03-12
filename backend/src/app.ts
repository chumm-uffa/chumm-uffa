/**
 * chumm-uffa
 */
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as logger from 'morgan';

import * as Q from 'q';

import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as passport from 'passport';

import { IndexRoutes } from './routers/indexRoutes';

import { PassportConfig } from './config/passport';

import { Mockgoose } from 'mockgoose-fix';

import { HallController } from './controller/hallController';

class App {

    public express: express.Application;

    constructor() {
        this.setEnvironment();
        this.express = express();
        this.database();
        this.middleware();
        this.routes();
    }

    /**
     * database connection
     */
    private database(): void {
        (<any>mongoose).Promise = Q.Promise;
        if (process.env.NODE_ENV === 'testing') {
            const mockgoose = new Mockgoose(mongoose);
            // This must be set to 3.5.7 to avoid a problem wit mongoDB wir mockgoose
            mockgoose.helper.setDbVersion('3.5.7');
            mockgoose.prepareStorage().then((): void => {
                mongoose.connect(process.env.MONGODB_URI);
            });
        } else {
            if (process.argv.length > 2 && process.argv[2] === 'docker') {
                console.log(`Connect to MongoDB ${process.env.DOCKER_MONGODB_URI}`);
                mongoose.connect(process.env.DOCKER_MONGODB_URI, { useMongoClient: true });
            } else {
                console.log(`Connect to MongoDB ${process.env.MONGODB_URI}`);
                mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
            }
        }

        mongoose.connection.on('error', () => {
            console.log('MongoDB connection error. Please make sure MongoDB is running.');
            process.exit();
        });

        mongoose.connection.on('open', () => {
            console.log('MongoDB is running, inital load of data');
            new HallController().loadAllHall();
        });
    }

    /**
     * http(s) request middleware
     */
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*'); // dev only
            res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            if (req.method === 'OPTIONS') {
                res.status(200).send();
            } else {
                next();
            }
        });
        this.express.use(passport.initialize());
        this.express.use(passport.session());
        const pConfig = new PassportConfig(passport);
        pConfig.init();
    }

    /**
     * app environment configuration
     */
    private setEnvironment(): void {
        dotenv.config({ path: '.env' });
    }

    /**
     * API main v1 routes
     */
    private routes(): void {
        const router = express.Router();
        this.express.use('/api/v1', new IndexRoutes().getRoutes());
        this.express.use('/', (req, res) => {
            res.status(404).send({ error: `path doesn't exist ssss`});
        });
    }
}

export default new App().express;
export { mongoose };

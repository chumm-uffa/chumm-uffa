/**
 * chumm-uffa
 *
 * Unit test base class
 */
import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

// This must be here, before server is loading!
process.env.NODE_ENV = 'testing';

import { server } from '../server';

import * as cuint from '@chumm-uffa/interface';

export class BaseTest {

    public chai: any;
    public should: any;
    public route: string;
    public server: any;

    constructor() {
        this.server = server.getServerInstance();
        this.route = `/api/${process.env.API_VERSION}/`;
        this.chai = chai;
        this.chai.use(chaiHttp);
        this.should = chai.should();
        this.createTestUser();
    }

    /**
     * creates a new test user for later test
     */
    public createTestUser(): cuint.User {
        const random = Math.floor(Math.random() * 100000);
        const newUser: cuint.User = new cuint.User();
        newUser.username = `test${random}`;
        newUser.email = `${newUser.username}@mailinator.com`;
        newUser.password = 'loginpw1';
        newUser.sex = 'Frau';
        newUser.weight = 'geheim';
        return newUser;
    }

    /**
     * Helper to test successfully response
     * @param res the response received
     */
    public assertSuccess(res) {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.success.should.equal(true);
    }

    /**
     * Helper to test failed response with given status
     * @param res the response received
     * @param status the expected status
     */
    public assertFailed(res, status: number, message: string) {
        res.status.should.equal(status);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.success.should.equal(false);
        if (message.length > 0) {
            res.body.should.have.property('message');
            res.body.message.should.equal(message);
        }
    }
}

/**
 * chumm-uffa
 *
 * Unit test base class
 */
import * as chai from 'chai';
import * as chaiHttp from 'chai-http';
import {server} from '../server';
import * as cuint from '@chumm-uffa/interface';

// This must be here, before server is loading! Comment this in if you want to work with in memory DB
// process.env.NODE_ENV = 'testing';


export class BaseTest {

    public chai: any;
    public should: any;
    public route: string;
    public server: any;
    public wss: any;
    public token: string;
    public testUser: cuint.User;
    public halls: cuint.Hall[];

    constructor() {
        this.server = server.getServerInstance();
        this.route = `/api/${process.env.API_VERSION}/`;
        this.chai = chai;
        this.chai.use(chaiHttp);
        this.should = chai.should();
        this.testUser = this.createTestUser();
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
        newUser.sex = cuint.Sex.FEMALE;
        newUser.weight = 'geheim';
        return newUser;
    }

    /**
     * Helper to test successfully response
     * @param res the response received
     */
    public assertSuccess(res) {
        res.body.should.have.property('message');
        console.log(res.body.message);
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.success.should.equal(true);
    }

    /**
     * Helper to test failed response with given status
     * @param res
     * @param {number} status
     * @param {string} message
     */
    public assertFailed(res, status: number, message: string) {
        res.body.should.have.property('message');
        console.log(res.body.message);
        res.status.should.equal(status);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.success.should.equal(false);
        if (message.length > 0) {
            res.body.message.should.equal(message);
        }
    }

    public login(done) {
        this.testUser = this.createTestUser();
        // First register test user
        this.chai.request(this.server)
            .post(`${this.route}auth/register`)
            .send(cuint.AuthFactory.createRegisterRequest(this.testUser))
            .end((err, res) => {
                this.assertSuccess(res);
                // Second login the test user
                this.chai.request(this.server)
                    .post(`${this.route}auth/login`)
                    .send(cuint.AuthFactory.createLoginRequest(this.testUser))
                    .end((err, res) => {
                        this.assertSuccess(res);
                        res.body.should.have.property('token');
                        this.token = res.body.token;
                        res.body.should.have.property('profile');
                        this.testUser = res.body.profile;
                        // Getting all halls
                        this.chai.request(this.server)
                            .get(`${this.route}halls/`)
                            .set({authorization: this.token})
                            .end((err, res) => {
                                this.assertSuccess(res);
                                res.body.should.have.property('halls');
                                this.halls = res.body.halls;
                                done();
                            });
                    });
            });
    }
}

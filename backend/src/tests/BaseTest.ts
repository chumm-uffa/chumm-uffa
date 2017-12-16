/**
 * chumm-uffa
 *
 * Unit test base class
 */
import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

import { server } from '../server';

export class BaseTest {

    public chai: any;
    public should: any;
    public route: string;
    public server: any;

    private user = {
        name: 'test user login',
        email: `test@login.com`,
        password: 'login'
    };

    constructor() {
        this.server = server.getServerInstance();
        this.route = `/${process.env.API_VERSION}/`;
        this.chai = chai;
        this.chai.use(chaiHttp);
        this.should = chai.should();
    }

    /**
     * creates a test user for later test
     */
    public createTestUser(callback: Function): void {
        this.chai.request(this.server)
            .post(`${this.route}user`)
            .send(this.user)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                callback(this.user);
            });
    }
}

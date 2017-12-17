/**
 * chumm-uffa
 *
 * Unit test for authentication a user
 */

import { BaseTest } from '../BaseTest';

describe('/POST login', () => {

    const test = new BaseTest();
    let user = {};

    before(() => {
        // create test uster for later use
        test.createTestUser((testUser) => {
            user = testUser;
        });
    });

    it('it should login and logout the test user', (done) => {
        test.chai.request(test.server)
            .post(`${test.route}auth/login`)
            .send(user)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                done();
            });
        test.chai.request(test.server)
            .post(`${test.route}auth/logout`)
            .send(user)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.equal(true);
                done();
            });
    });
});

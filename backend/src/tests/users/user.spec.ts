/**
 * chumm-uffa
 *
 * Unit test for users resource
 */

import { BaseTest } from '../BaseTest';

describe('/POST users', () => {

    const baseTest: BaseTest = new BaseTest();
    const testUser = baseTest.createTestUser();
    let token: string;

    before((done) => {
        // First saveUser test user
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}auth/register`)
            .send({username: testUser.username, email: testUser.email, password: testUser.password})
            .end((err, res) => {
                baseTest.assertSuccess(res);

                // Second login the test user
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}auth/login`)
                    .send({email: testUser.email, password: testUser.password})
                    .end((err, res) => {
                        baseTest.assertSuccess(res);
                        // Test if we got a token back
                        res.body.should.have.property('token');
                        token = res.body.token;
                        done();
            });
        });
    });

    it('it should get all user', (done) => {
        // Getting all user TODO real test impl
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}users/`)
            .set({authorization: token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                done();
            });
    });

    it('it should send an error back, without a valid token auth/profile fails', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}users/`)
            .end((err, res) => {
                baseTest.assertFailed(res, 403, 'No token provided.');
                done();
            });
    });

});

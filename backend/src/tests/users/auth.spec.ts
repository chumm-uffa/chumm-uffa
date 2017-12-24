/**
 * chumm-uffa
 *
 * Unit test for authentication a user
 */

import { BaseTest } from '../BaseTest';

import * as cuint from '@chumm-uffa/interface';

describe('/POST login', () => {

    const baseTest: BaseTest = new BaseTest();
    let testUser: cuint.User;

    beforeEach((done) => {
        testUser = baseTest.createTestUser();
        done();
    });

    it('it should saveUser the test user', (done) => {
        testUser.id = null;
        testUser.email = null;
        testUser.sex = null;
        testUser.weight = null;
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}auth/register`)
            .send(cuint.createRegisterRequest(testUser))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                done();
            });
    });

    it('two times saveUser the test user must fail the second time', (done) => {
        // First saveUser
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}auth/register`)
            .send(cuint.createRegisterRequest(testUser))
            .end((err, res) => {
                baseTest.assertSuccess(res);

                // second saveUser
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}auth/register`)
                    .send(cuint.createRegisterRequest(testUser))
                    .end((err, res) => {
                        baseTest.assertFailed(res, 400, 'this email address has already been taken.');
                        done();
                    });

            });
    });

    it('it should saveUser, login, getting profile of the test user and logout again', (done) => {
        // First saveUser test user
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}auth/register`)
            .send(cuint.createRegisterRequest(testUser))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                // Second login the test user
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}auth/login`)
                    .send(cuint.createLoginRequest(testUser))
                    .end((err, res) => {
                        baseTest.assertSuccess(res);

                        // Test if we got a token back
                        res.body.should.have.property('token');
                        const token = res.body.token;

                        // Third getting the profile
                        baseTest.chai.request(baseTest.server)
                            .get(`${baseTest.route}auth/profile`)
                            .set({authorization: token})
                            .end((err, res) => {
                                baseTest.assertSuccess(res);
                                // Last logout again
                                baseTest.chai.request(baseTest.server)
                                    .get(`${baseTest.route}auth/logout`)
                                    .end((err, res) => {
                                        baseTest.assertSuccess(res);
                                        done();
                                    });
                            });
                    });
            });
    });

    it('it should logout the test user', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}auth/logout`)
            .end((err, res) => {
                baseTest.assertSuccess(res);
                done();
            });
    });

    it('it should send an error back, without a valid token auth/profile fails', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}auth/profile`)
            .end((err, res) => {
                baseTest.assertFailed(res, 403, 'No token provided.');
                done();
            });
    });

    it('it should send a login error back, wrong password', (done) => {
        const testUser = baseTest.createTestUser();
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}auth/register`)
            .send(cuint.createRegisterRequest(testUser))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                testUser.password = 'ichBinBlöd';
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}auth/login`)
                    .send(cuint.createLoginRequest(testUser))
                    .end((err, res) => {
                        baseTest.assertFailed(res, 400, 'wrong credentials.');
                        done();
                    });
            });
    });
});

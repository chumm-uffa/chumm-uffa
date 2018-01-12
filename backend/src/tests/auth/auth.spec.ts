/**
 * chumm-uffa
 *
 * Unit test for authentication a user
 */

import { BaseTest } from '../BaseTest';

import * as cuint from '@chumm-uffa/interface';

describe('Test /auth/register', () => {

    const baseTest: BaseTest = new BaseTest();
    let testUser: cuint.User;

    beforeEach((done) => {
        testUser = baseTest.createTestUser();
        done();
    });

    it('it should register the test user', (done) => {
        testUser.id = null;
        testUser.email = null;
        testUser.sex = null;
        testUser.weight = null;
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}auth/register`)
            .send(cuint.AuthFactory.createRegisterRequest(testUser))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                done();
            });
    });

    it('two times register the test user must fail the second time', (done) => {
        // First register the user
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}auth/register`)
            .send(cuint.AuthFactory.createRegisterRequest(testUser))
            .end((err, res) => {
                baseTest.assertSuccess(res);

                // second saveUser
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}auth/register`)
                    .send(cuint.AuthFactory.createRegisterRequest(testUser))
                    .end((err, res) => {
                        baseTest.assertFailed(res, 400, 'this user name has already been taken.');
                        done();
                    });

            });
    });

    it('it shoult register the user, login, getting profile of the test user and logout again', (done) => {
        // First saveUser test user
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}auth/register`)
            .send(cuint.AuthFactory.createRegisterRequest(testUser))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                // Second login the test user
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}auth/login`)
                    .send(cuint.AuthFactory.createLoginRequest(testUser))
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

    it('it should send an error back, without a valid token auth/profile fails', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}auth/profile`)
            .end((err, res) => {
                baseTest.assertFailed(res, 403, 'No token provided.');
                done();
            });
    });

    it('it should register the test user and change it later', (done) => {
        // First register the user
        baseTest.chai.request(baseTest.server)
            // First register the user
            .post(`${baseTest.route}auth/register`)
            .send(cuint.AuthFactory.createRegisterRequest(testUser))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                // Second login the test user
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}auth/login`)
                    .send(cuint.AuthFactory.createLoginRequest(testUser))
                    .end((err, res) => {
                        baseTest.assertSuccess(res);

                        // Test if we got a token back
                        res.body.should.have.property('token');
                        const token = res.body.token;
                        res.body.should.have.property('profile');
                        res.body.profile.email = 'ich@change.ch';
                        const userid = res.body.profile.id;

                        // Third change user
                        baseTest.chai.request(baseTest.server)
                            .put(`${baseTest.route}auth/profile`)
                            .set({authorization: token})
                            .send(cuint.AuthFactory.createUpdateProfileRequest(res.body.profile))
                            .end((err, res) => {
                                baseTest.assertSuccess(res);
                                res.body.should.have.property('profile');
                                res.body.profile.id.should.be.equal(userid);
                                res.body.profile.email.should.be.equal('ich@change.ch');
                                done();
                            });
                    });
            });
    });


    it('it should register the test user and change the username', (done) => {
        // First register the user
        baseTest.chai.request(baseTest.server)
        // First register the user
            .post(`${baseTest.route}auth/register`)
            .send(cuint.AuthFactory.createRegisterRequest(testUser))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                // Second login the test user
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}auth/login`)
                    .send(cuint.AuthFactory.createLoginRequest(testUser))
                    .end((err, res) => {
                        baseTest.assertSuccess(res);

                        // Test if we got a token back
                        res.body.should.have.property('token');
                        const token = res.body.token;
                        res.body.should.have.property('profile');

                        const newUserName = `${res.body.profile.username}ichbinneu`;
                        const userid = res.body.profile.id;
                        res.body.profile.username = newUserName;

                        // Third change profile
                        baseTest.chai.request(baseTest.server)
                            .put(`${baseTest.route}auth/profile`)
                            .set({authorization: token})
                            .send(cuint.AuthFactory.createUpdateProfileRequest(res.body.profile))
                            .end((err, res) => {
                                baseTest.assertSuccess(res);
                                res.body.should.have.property('profile');
                                res.body.profile.id.should.be.equal(userid);
                                res.body.profile.username.should.be.equal(newUserName);
                                done();
                            });
                    });
            });
    });
});


describe('Test /auth/login and /auth/logout', () => {

    const baseTest: BaseTest = new BaseTest();
    const testUser = baseTest.createTestUser();

    before((done) => {
        // First saveUser test user
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}auth/register`)
            .send(cuint.AuthFactory.createRegisterRequest(testUser))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                done();
            });
    });

    it('it should login and logout the test user', (done) => {
        // First login the test user
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}auth/login`)
            .send(cuint.AuthFactory.createLoginRequest(testUser))
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

    it('it should logout the test user', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}auth/logout`)
            .end((err, res) => {
                baseTest.assertSuccess(res);
            });

        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}auth/logout`)
            .end((err, res) => {
                baseTest.assertSuccess(res);
                done();
            });
    });

    it('it should send a login error back, wrong password', (done) => {
        testUser.password = 'ichBinBlöd';
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}auth/login`)
            .send(cuint.AuthFactory.createLoginRequest(testUser))
            .end((err, res) => {
                baseTest.assertFailed(res, 400, 'wrong credentials.');
                done();
            });
    });

    it('it should send a login error back, unknown user', (done) => {
        testUser.username = 'michKenntKeiner';
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}auth/login`)
            .send(cuint.AuthFactory.createLoginRequest(testUser))
            .end((err, res) => {
                baseTest.assertFailed(res, 400, 'user not exists.');
                done();
            });
    });

});

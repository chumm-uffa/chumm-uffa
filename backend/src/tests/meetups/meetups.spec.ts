/**
 * chumm-uffa
 *
 * Unit test for authentication a user
 */

import { BaseTest } from '../BaseTest';

import * as cuint from '@chumm-uffa/interface';

describe('Test /meetups', () => {

    const baseTest: BaseTest = new BaseTest();
    let testUser = baseTest.createTestUser();
    let token: string;

    before((done) => {
        // First saveUser test user
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}auth/register`)
            .send(cuint.AuthFactory.createRegisterRequest(testUser))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                // First login the test user
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}auth/login`)
                    .send(cuint.AuthFactory.createLoginRequest(testUser))
                    .end((err, res) => {
                        baseTest.assertSuccess(res);
                        res.body.should.have.property('token');
                        token = res.body.token;
                        res.body.should.have.property('profile');
                        testUser = res.body.profile;
                        done();
                });
        });
    });

    it('it should create a new meetup', (done) => {
        let meetup: cuint.Meetup = new cuint.Meetup(
            "", testUser, new Date(), new Date(), "outdoor", "indoor", "activity"
        );
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetups`)
            .set({authorization: token})
            .send(cuint.MeetupsFactory.createCreateMeetupRequest(meetup))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetup');
                res.body.should.have.property('id');
                done();
        });
    });

    it('it should get all meetup', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}meetups`)
            .set({authorization: token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetups');
                done();
            });
    });

});


describe('Test /meetups/:id', () => {

    const baseTest: BaseTest = new BaseTest();
    const testUser = baseTest.createTestUser();
    let token: string;

    before((done) => {
        // First saveUser test user
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}auth/register`)
            .send(cuint.AuthFactory.createRegisterRequest(testUser))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                // First login the test user
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}auth/login`)
                    .send(cuint.AuthFactory.createLoginRequest(testUser))
                    .end((err, res) => {
                        baseTest.assertSuccess(res);
                        token = res.body.token;
                        done();
                    });
            });
    });

    it('it should get a single meetup', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}meetups/123456789`)
            .set({authorization: token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetups');
                done();
            });
    });

    it('it should delete a single meetup', (done) => {
        baseTest.chai.request(baseTest.server)
            .delete(`${baseTest.route}meetups/123456789`)
            .set({authorization: token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                done();
            });
    });

    it('it should update a single meetup', (done) => {
        let meetup: cuint.Meetup = new cuint.Meetup(
            "", testUser, new Date(), new Date(), "outdoor", "indoor", "activity"
        );
        baseTest.chai.request(baseTest.server)
            .put(`${baseTest.route}meetups/123456789`)
            .set({authorization: token})
            .send(cuint.MeetupsFactory.createUpdateMeetupRequest(meetup))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetup');
                done();
            });
    });
});

describe('Test /meetups/:id/meetup-requests', () => {

    before((done) => {
        // First saveUser test user
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}auth/register`)
            .send(cuint.AuthFactory.createRegisterRequest(testUser))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                // First login the test user
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}auth/login`)
                    .send(cuint.AuthFactory.createLoginRequest(testUser))
                    .end((err, res) => {
                        baseTest.assertSuccess(res);
                        token = res.body.token;
                        done();
                    });
            });
    });

    const baseTest: BaseTest = new BaseTest();
    const testUser = baseTest.createTestUser();
    let token: string;

    it('it should get all requests for a meetup', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}meetups/123456789/meetup-requests`)
            .set({authorization: token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('requests');
                done();
            });
    });
});

describe('Test /meetups/:id/chats', () => {

    before((done) => {
        // First saveUser test user
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}auth/register`)
            .send(cuint.AuthFactory.createRegisterRequest(testUser))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                // First login the test user
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}auth/login`)
                    .send(cuint.AuthFactory.createLoginRequest(testUser))
                    .end((err, res) => {
                        baseTest.assertSuccess(res);
                        token = res.body.token;
                        done();
                    });
            });
    });

    const baseTest: BaseTest = new BaseTest();
    const testUser = baseTest.createTestUser();
    let token: string;

    it('it should get all chats for a meetup', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}meetups/123456789/chats`)
            .set({authorization: token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('chats');
                done();
            });
    });

    it('it should create a chats for a single meetup', (done) => {
        let chat: cuint.Chat = new cuint.Chat("chat", testUser, new Date());

        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetups/123456789/chats`)
            .set({authorization: token})
            .send(cuint.MeetupsFactory.createCreateChatForMeetupRequest(chat))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('chat');
                res.body.should.have.property('id');
                done();
            });
    });
});

describe('Test /meetups/:id/chats/:chat_id', () => {

    const baseTest: BaseTest = new BaseTest();
    const testUser = baseTest.createTestUser();
    let token: string;

    before((done) => {
        // First saveUser test user
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}auth/register`)
            .send(cuint.AuthFactory.createRegisterRequest(testUser))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                // First login the test user
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}auth/login`)
                    .send(cuint.AuthFactory.createLoginRequest(testUser))
                    .end((err, res) => {
                        baseTest.assertSuccess(res);
                        token = res.body.token;
                        done();
                    });
            });
    });

    it('it delete a single chat from a meetup', (done) => {
        baseTest.chai.request(baseTest.server)
            .delete(`${baseTest.route}meetups/123456789/chats/12345`)
            .set({authorization: token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                done();
            });
    });

});

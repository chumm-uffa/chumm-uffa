/**
 * chumm-uffa
 *
 * Unit test for authentication a user
 */

import { BaseTest } from '../BaseTest';

import * as cuint from '@chumm-uffa/interface';

const baseTest: BaseTest = new BaseTest();

describe('Test /meetups', () => {

    before((done) => {
        baseTest.login(done);
    });

    it('it should create a new meetup', (done) => {
        let meetup: cuint.Meetup = new cuint.Meetup(
            '', baseTest.testUser, new Date(), new Date(), 'outdoor', baseTest.halls[0].key, 'activity'
        );
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetups`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupsFactory.createCreateMeetupRequest(meetup))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetup');
                res.body.should.have.property('id');
                done();
        });
    });

    it('it should not create a meetup because indoor and outdoor are missing ', (done) => {
        let meetup: cuint.Meetup = new cuint.Meetup(
            '', baseTest.testUser, new Date(), new Date(), '', '', 'activity'
        );
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetups`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupsFactory.createCreateMeetupRequest(meetup))
            .end((err, res) => {
                baseTest.assertFailed(res, 400, 'wrong input.');
                done();
            });
    });

    it('it should get all meetup', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}meetups`)
            .set({authorization: baseTest.token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetups');
                res.body.meetups.length.should.be.greaterThan(0);
                done();
            });
    });

});


describe('Test /meetups/:id', () => {

    let meetup: cuint.Meetup;

    before((done) => {
        baseTest.login(done);
    });

    beforeEach((done) =>{
        // create a single meetup
        let myMeetup: cuint.Meetup = new cuint.Meetup(
            '', baseTest.testUser, new Date(), new Date(), 'outdoor', baseTest.halls[0].key, 'activity'
        );

        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetups`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupsFactory.createCreateMeetupRequest(myMeetup))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetup');
                res.body.should.have.property('id');
                meetup = res.body.meetup;
                let meetupRequest: cuint.MeetupRequest = new cuint.MeetupRequest(
                    '', baseTest.testUser, meetup, cuint.RequestStatus.OPEN);
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}meetup-requests`)
                    .set({authorization: baseTest.token})
                    .send(cuint.MeetupRequestsFactory.createCreateMeetupRequestRequest(meetupRequest))
                    .end((err, res) => {
                        baseTest.assertSuccess(res);
                        let meetupRequest: cuint.MeetupRequest = new cuint.MeetupRequest(
                            '', baseTest.testUser, meetup, cuint.RequestStatus.ACCEPT);
                        baseTest.chai.request(baseTest.server)
                            .post(`${baseTest.route}meetup-requests`)
                            .set({authorization: baseTest.token})
                            .send(cuint.MeetupRequestsFactory.createCreateMeetupRequestRequest(meetupRequest))
                            .end((err, res) => {
                                baseTest.assertSuccess(res);
                            done();
                            });
                    });
            });
    });

    it('it should get a single meetup', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}meetups/${meetup.id}`)
            .set({authorization: baseTest.token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetup');
                res.body.meetup.numberOfParticipant.should.be.equals(1);
                res.body.meetup.numberOfRequest.should.be.equals(1);
                done();
            });
    });

    it('it should delete a single meetup', (done) => {
        baseTest.chai.request(baseTest.server)
            .delete(`${baseTest.route}meetups/${meetup.id}`)
            .set({authorization: baseTest.token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                done();
            });
    });

    it('it should update a single meetup', (done) => {
        meetup.activity = 'jetzt mach i was anderes';
        baseTest.chai.request(baseTest.server)
            .put(`${baseTest.route}meetups/${meetup.id}`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupsFactory.createUpdateMeetupRequest(meetup))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetup');
                res.body.meetup.activity.should.equal('jetzt mach i was anderes');
                done();
            });
    });


    it('it should not update a single meetup because indoor and outdoor are missing', (done) => {
        meetup.indoor = '';
        meetup.outdoor = '';
        baseTest.chai.request(baseTest.server)
            .put(`${baseTest.route}meetups/${meetup.id}`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupsFactory.createUpdateMeetupRequest(meetup))
            .end((err, res) => {
                baseTest.assertFailed(res, 400, 'wrong input.');
                done();
            });
    });
});

describe('Test /meetups/:id/meetup-requests', () => {

    let meetup: cuint.Meetup;

    before((done) => {
        baseTest.login(done);
    });

    beforeEach((done) =>{
        // create a single meetup
        let myMeetup: cuint.Meetup = new cuint.Meetup(
            '', baseTest.testUser, new Date(), new Date(), 'outdoor', baseTest.halls[0].key, 'activity'
        );
        // Add meetup
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetups`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupsFactory.createCreateMeetupRequest(myMeetup))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetup');
                res.body.should.have.property('id');
                meetup = res.body.meetup;
                // Add meetup-request
                let meetupRequest: cuint.MeetupRequest = new cuint.MeetupRequest(
                    '', baseTest.testUser, meetup, cuint.RequestStatus.OPEN);
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}meetup-requests`)
                    .set({authorization: baseTest.token})
                    .send(cuint.MeetupRequestsFactory.createCreateMeetupRequestRequest(meetupRequest))
                    .end((err, res) => {
                        baseTest.assertSuccess(res);
                        // Add meetup-request
                        let meetupRequest: cuint.MeetupRequest = new cuint.MeetupRequest(
                            '', baseTest.testUser, meetup, cuint.RequestStatus.ACCEPT);
                        baseTest.chai.request(baseTest.server)
                            .post(`${baseTest.route}meetup-requests`)
                            .set({authorization: baseTest.token})
                            .send(cuint.MeetupRequestsFactory.createCreateMeetupRequestRequest(meetupRequest))
                            .end((err, res) => {
                                baseTest.assertSuccess(res);
                                done();
                            });
                    });
            });
    });

    it('it should get all requests for a meetup', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}meetups/${meetup.id}/meetup-requests`)
            .set({authorization: baseTest.token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('requests');
                res.body.requests.length.should.be.equals(2);
                done();
            });
    });
});

describe('Test /meetups/:id/chats', () => {

    let meetup: cuint.Meetup;

    before((done) => {
        baseTest.login(done);
    });

    beforeEach((done) =>{
        // create a single meetup
        let myMeetup: cuint.Meetup = new cuint.Meetup(
            '', baseTest.testUser, new Date(), new Date(), 'outdoor', baseTest.halls[0].key, 'activity'
        );
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetups`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupsFactory.createCreateMeetupRequest(myMeetup))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetup');
                res.body.should.have.property('id');
                meetup = res.body.meetup;
                done();
            });
    });

    it('it should create a chats for a single meetup', (done) => {
        let newChat: cuint.Chat = new cuint.Chat('', 'mal was anderes', baseTest.testUser);

        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetups/${meetup.id}/chats`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupsFactory.createCreateChatForMeetupRequest(newChat))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('chat');
                res.body.should.have.property('id');
                done();
            });
    });

    it('it should get all chats for a meetup', (done) => {
        let newChat: cuint.Chat = new cuint.Chat('', 'kukukkkkkk', baseTest.testUser);

        // first crate a new chat
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetups/${meetup.id}/chats`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupsFactory.createCreateChatForMeetupRequest(newChat))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('chat');
                res.body.should.have.property('id');
                // second receive new created chat
                baseTest.chai.request(baseTest.server)
                    .get(`${baseTest.route}meetups/${meetup.id}/chats`)
                    .set({authorization: baseTest.token})
                    .end((err, res) => {
                        baseTest.assertSuccess(res);
                        res.body.should.have.property('chats');
                        res.body.chats.length.should.be.greaterThan(0);
                        res.body.chats[0].text.should.be.equals('kukukkkkkk');
                        done();
                    });
            });
    });
});

describe('Test /meetups/:id/chats/:chat_id', () => {

    let meetup: cuint.Meetup;
    let chat: cuint.Chat;

    before((done) => {
        baseTest.login(done);
    });

    beforeEach((done) =>{
        // create a single meetup
        let myMeetup: cuint.Meetup = new cuint.Meetup(
            '', baseTest.testUser, new Date(), new Date(), 'outdoor', baseTest.halls[0].key, 'activity'
        );
        let myChat: cuint.Chat = new cuint.Chat(
            '', 'das ist ein Gespräck', baseTest.testUser
        );
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetups`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupsFactory.createCreateMeetupRequest(myMeetup))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetup');
                res.body.should.have.property('id');
                meetup = res.body.meetup;
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}meetups/${meetup.id}/chats`)
                    .set({authorization: baseTest.token})
                    .send(cuint.MeetupsFactory.createCreateChatForMeetupRequest(myChat))
                    .end((err, res) => {
                        res.body.should.have.property('chat');
                        res.body.should.have.property('id');
                        chat = res.body.chat;
                        done();
                    });
            });
    });

    it('it delete a single chat from a meetup', (done) => {
        baseTest.chai.request(baseTest.server)
            .delete(`${baseTest.route}meetups/${meetup.id}/chats/${chat.id}`)
            .set({authorization: baseTest.token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                done();
            });
    });

});

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
            "", baseTest.testUser, new Date(), new Date(), "outdoor", baseTest.halls[0], "activity"
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
            "", baseTest.testUser, new Date(), new Date(), "outdoor", baseTest.halls[0], "activity"
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

    it('it should get a single meetup', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}meetups/${meetup.id}`)
            .set({authorization: baseTest.token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetup');
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
        meetup.activity = "jetzt mach i was anderes";
        baseTest.chai.request(baseTest.server)
            .put(`${baseTest.route}meetups/${meetup.id}`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupsFactory.createUpdateMeetupRequest(meetup))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetup');
                res.body.meetup.activity.should.equal("jetzt mach i was anderes");
                done();
            });
    });
});

describe('Test /meetups/:id/meetup-requests', () => {

    before((done) => {
        baseTest.login(done);
    });

    it('it should get all requests for a meetup', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}meetups/123456789/meetup-requests`)
            .set({authorization: baseTest.token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('requests');
                done();
            });
    });
});

describe('Test /meetups/:id/chats', () => {

    before((done) => {
        baseTest.login(done);
    });

    it('it should get all chats for a meetup', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}meetups/123456789/chats`)
            .set({authorization: baseTest.token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('chats');
                done();
            });
    });

    it('it should create a chats for a single meetup', (done) => {
        let chat: cuint.Chat = new cuint.Chat("chat", baseTest.testUser, new Date());

        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetups/123456789/chats`)
            .set({authorization: baseTest.token})
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

    before((done) => {
        baseTest.login(done);
    });

    it('it delete a single chat from a meetup', (done) => {
        baseTest.chai.request(baseTest.server)
            .delete(`${baseTest.route}meetups/123456789/chats/12345`)
            .set({authorization: baseTest.token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                done();
            });
    });

});

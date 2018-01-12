/**
 * chumm-uffa
 *
 * Unit test for users resource
 */

import { BaseTest } from '../BaseTest';

import * as cuint from '@chumm-uffa/interface';

const baseTest: BaseTest = new BaseTest();

describe('/POST users', () => {

    let meetup1: cuint.Meetup;
    let meetup2: cuint.Meetup;

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
                meetup1 = res.body.meetup;
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}meetups`)
                    .set({authorization: baseTest.token})
                    .send(cuint.MeetupsFactory.createCreateMeetupRequest(myMeetup))
                    .end((err, res) => {
                        baseTest.assertSuccess(res);
                        res.body.should.have.property('meetup');
                        res.body.should.have.property('id');
                        meetup2 = res.body.meetup;
                        done();
                    });
            });
    });

    it('it should get all meetups for a user', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}users/${baseTest.testUser.id}/meetups`)
            .set({authorization: baseTest.token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetups');
                res.body.meetups.length.should.be.equals(2);
                res.body.meetups[0].id.should.be.equals(meetup1.id);
                res.body.meetups[1].id.should.be.equals(meetup2.id);
                done();
            });
    });

    it('it should get all meetup-request for a user', (done) => {
        let meetupRequest1: cuint.MeetupRequest = new cuint.MeetupRequest('', baseTest.testUser, meetup1, cuint.RequestStatus.OPEN);
        let meetupRequest2: cuint.MeetupRequest = new cuint.MeetupRequest('', baseTest.testUser, meetup2, cuint.RequestStatus.DECLINED);
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetup-requests`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupRequestsFactory.createCreateMeetupRequestRequest(meetupRequest1))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}meetup-requests`)
                    .set({authorization: baseTest.token})
                    .send(cuint.MeetupRequestsFactory.createCreateMeetupRequestRequest(meetupRequest2))
                    .end((err, res) => {
                        baseTest.assertSuccess(res);
                        baseTest.chai.request(baseTest.server)
                            .get(`${baseTest.route}users/${baseTest.testUser.id}/meetup-requests`)
                            .set({authorization: baseTest.token})
                            .end((err, res) => {
                                baseTest.assertSuccess(res);
                                res.body.should.have.property('requests');
                                res.body.requests.length.should.be.equals(2);
                                done();
                            });
                    });
            });
    });

    it('it should get all meetup-request in ACCEPT status for a user', (done) => {
        let meetupRequest1: cuint.MeetupRequest = new cuint.MeetupRequest('', baseTest.testUser, meetup1, cuint.RequestStatus.ACCEPT);
        let meetupRequest2: cuint.MeetupRequest = new cuint.MeetupRequest('', baseTest.testUser, meetup2, cuint.RequestStatus.ACCEPT);
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetup-requests`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupRequestsFactory.createCreateMeetupRequestRequest(meetupRequest1))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}meetup-requests`)
                    .set({authorization: baseTest.token})
                    .send(cuint.MeetupRequestsFactory.createCreateMeetupRequestRequest(meetupRequest2))
                    .end((err, res) => {
                        baseTest.assertSuccess(res);
                        baseTest.chai.request(baseTest.server)
                            .get(`${baseTest.route}users/${baseTest.testUser.id}/meetup-requests/ACCEPT`)
                            .set({authorization: baseTest.token})
                            .end((err, res) => {
                                baseTest.assertSuccess(res);
                                res.body.should.have.property('requests');
                                res.body.requests.length.should.be.equals(2);
                                done();
                            });
                    });
            });
    });
});

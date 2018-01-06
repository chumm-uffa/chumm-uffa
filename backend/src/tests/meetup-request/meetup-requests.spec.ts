/**
 * chumm-uffa
 *
 * Unit test for authentication a user
 */

import {BaseTest} from '../BaseTest';

import * as cuint from '@chumm-uffa/interface';

const baseTest: BaseTest = new BaseTest();

describe('Test /meetupRequests', () => {

    let meetup: cuint.Meetup;

    before((done) => {
        baseTest.login(_ => {
            meetup = new cuint.Meetup(
                '', baseTest.testUser, new Date(), new Date(), 'outdoor', baseTest.halls[0].key, 'activity'
            );
            baseTest.chai.request(baseTest.server)
                .post(`${baseTest.route}meetups`)
                .set({authorization: baseTest.token})
                .send(cuint.MeetupsFactory.createCreateMeetupRequest(meetup))
                .end((err, res) => {
                    meetup = res.body.meetup;
                    done();
                });
        });
    });

    it('it should create a new meetup-request', (done) => {
        let meetupRequest: cuint.MeetupRequest = new cuint.MeetupRequest('', baseTest.testUser, meetup, cuint.RequestStatus.OPEN);
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetup-requests`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupRequestsFactory.createCreateMeetupRequestRequest(meetupRequest))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('request');
                done();
            });
    });

    it('it should not create a meetup-create because user is missing ', (done) => {
        let meetupRequest: cuint.MeetupRequest = new cuint.MeetupRequest('', null, meetup, cuint.RequestStatus.OPEN);
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetup-requests`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupRequestsFactory.createCreateMeetupRequestRequest(meetupRequest))
            .end((err, res) => {
                baseTest.assertFailed(res, 400, 'wrong input.');
                done();
            });
    });

    it('it should read a meetup-request', (done) => {
        let meetupRequest: cuint.MeetupRequest = new cuint.MeetupRequest('', baseTest.testUser, meetup, cuint.RequestStatus.OPEN);
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetup-requests`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupRequestsFactory.createCreateMeetupRequestRequest(meetupRequest))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('request');

                baseTest.chai.request(baseTest.server)
                    .get(`${baseTest.route}meetup-requests/${res.body.request.id}`)
                    .set({authorization: baseTest.token})
                    .end((err, res) => {
                        baseTest.assertSuccess(res);
                        res.body.should.have.property('request');
                        done();
                    })
            });
    });

    it('it should update a meetup-request', (done) => {
        let meetupRequest: cuint.MeetupRequest = new cuint.MeetupRequest('', baseTest.testUser, meetup, cuint.RequestStatus.OPEN);
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetup-requests`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupRequestsFactory.createCreateMeetupRequestRequest(meetupRequest))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('request');
                res.body.request.status.should.equal(cuint.RequestStatus.OPEN);

                let meetupReq: cuint.MeetupRequest = res.body.request;
                meetupReq.status = cuint.RequestStatus.ACCEPT;

                baseTest.chai.request(baseTest.server)
                    .put(`${baseTest.route}meetup-requests/${res.body.request.id}`)
                    .set({authorization: baseTest.token})
                    .send(cuint.MeetupRequestsFactory.createUpdateMeetupRequestRequest(meetupReq))
                    .end((err, res) => {
                        baseTest.assertSuccess(res);
                        res.body.should.have.property('request');
                        res.body.request.status.should.equal(cuint.RequestStatus.ACCEPT);
                        done();
                    })
            });
    });

    it('it should delete a meetup-request', (done) => {
        let meetupRequest: cuint.MeetupRequest = new cuint.MeetupRequest('', baseTest.testUser, meetup, cuint.RequestStatus.OPEN);
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetup-requests`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupRequestsFactory.createCreateMeetupRequestRequest(meetupRequest))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('request');
                let meetupRequestToDel = res.body.request;
                baseTest.chai.request(baseTest.server)
                    .delete(`${baseTest.route}meetup-requests/${meetupRequestToDel.id}`)
                    .set({authorization: baseTest.token})
                    .end((err, res) => {
                        baseTest.assertSuccess(res);
                        baseTest.chai.request(baseTest.server)
                            .get(`${baseTest.route}meetup-requests/${meetupRequestToDel.id}`)
                            .set({authorization: baseTest.token})
                            .end((err, res) => {
                                baseTest.assertFailed(res, 400, 'meetup not exits.');
                                done();
                            })
                    })
            });
    });
});

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
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}users/${baseTest.testUser.id}/meetup-requests`)
            .set({authorization: baseTest.token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetups');
                done();
            });
    });

    it('it should get all meetup-request in OPEN status for a user', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}users/${baseTest.testUser.id}/meetup-requests/OPEN`)
            .set({authorization: baseTest.token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetups');
                done();
            });
    });

});

/**
 * chumm-uffa
 *
 * Unit test for authentication a user
 */

import { BaseTest } from '../BaseTest';

import * as cuint from '@chumm-uffa/interface';

const baseTest: BaseTest = new BaseTest();


describe('Test /meetups/search', () => {

    let meetup: cuint.Meetup;
    let chat: cuint.Chat;
    let activity = 'activity' +  Math.random();

    before((done) => {
        baseTest.login(done);
    });

    beforeEach((done) =>{
        // create a single meetup

        let myMeetup: cuint.Meetup = new cuint.Meetup(
            '', baseTest.testUser, new Date(), new Date(), 'outdoor', baseTest.halls[0].key, activity,0, 0, 10.1, 5
        );
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetups`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupsFactory.createCreateMeetupRequest(myMeetup))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                myMeetup.longitude = 6;
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}meetups`)
                    .set({authorization: baseTest.token})
                    .send(cuint.MeetupsFactory.createCreateMeetupRequest(myMeetup))
                    .end((err, res) => {
                        baseTest.assertSuccess(res);
                        done();
                    });

            });
    });

    it('it search for Meetups by coordinates', (done) => {
        const search = new cuint.SearchDto(new Date(1900, 1), new Date(2200, 1), cuint.LocationType.OUTDOOR, null,
            'outdoor', null, null, null, 10, 5, 50);
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetups/search`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupsFactory.createSearchMeetupRequest(search))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetups');
                res.body.meetups.length.should.be.greaterThan(0);
                const actualMeetups = res.body.meetups.filter(mu => mu.activity === activity);
                actualMeetups.length.should.be.equal(1);
                done();
            });
    });
});

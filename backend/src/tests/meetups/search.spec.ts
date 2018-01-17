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

    it('it search for Meetups', (done) => {
        const search = new cuint.SearchDto(new Date(1900, 1), new Date(), cuint.LocationType.OUTDOOR, null, 'outdoor', null, null, null);
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetups/search`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupsFactory.createSearchMeetupRequest(search))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetups');
                res.body.meetups.length.should.be.greaterThan(0);
                done();
            });
    });
});

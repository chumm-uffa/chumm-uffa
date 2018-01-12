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

    it('it search for Meetups', (done) => {
        const search = new cuint.SearchDto(new Date(1900, 1), new Date(), null, null, null, null, null, null);
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

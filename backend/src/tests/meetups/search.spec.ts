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
        const search = new cuint.SearchDto(null, null, null, null, null, null, null, null);
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

    it('it search for Meetups test', (done) => {
        const search = new cuint.SearchDto(new Date('2018-01-07T11:11'), new Date('2018-01-07T16:11'),
            cuint.LocationType.OUTDOOR, '5a49fc4ebb17414224c7e8a1', 'OUtD', 'Frau', 40, 50);
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetups/searchtest`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupsFactory.createSearchMeetupRequest(search))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('meetups');
                res.body.meetups.length.should.be.greaterThan(0);
                console.log('Anzahl gefundene Meetups: ', res.body.meetups.length);
                done();
            });
    });

});

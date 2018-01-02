/**
 * chumm-uffa
 *
 * Unit test for authentication a user
 */

import { BaseTest } from '../BaseTest';

import * as cuint from '@chumm-uffa/interface';

const baseTest: BaseTest = new BaseTest();

describe('Test /halls', () => {

    before((done) => {
        baseTest.login(done);
    });

    it('it should get all halls', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}halls`)
            .set({authorization: baseTest.token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('halls');
                res.body.halls.length.should.be.greaterThan(0);
                done();
        });
    });

    it('it should a single hall', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}halls/${baseTest.halls[0].key}`)
            .set({authorization: baseTest.token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('hall');
                done();
            });
    });

});
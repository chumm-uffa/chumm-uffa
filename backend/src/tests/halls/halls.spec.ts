/**
 * chumm-uffa
 *
 * Unit test for authentication a user
 */

import { BaseTest } from '../BaseTest';

import * as cuint from '@chumm-uffa/interface';

describe('Test /halls', () => {

    const baseTest: BaseTest = new BaseTest();
    let testUser = baseTest.createTestUser();
    let token: string;

    before((done) => {
        // First register test user
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}auth/register`)
            .send(cuint.AuthFactory.createRegisterRequest(testUser))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                // First login the test user
                baseTest.chai.request(baseTest.server)
                    .post(`${baseTest.route}auth/login`)
                    .send(cuint.AuthFactory.createLoginRequest(testUser))
                    .end((err, res) => {
                        baseTest.assertSuccess(res);
                        res.body.should.have.property('token');
                        token = res.body.token;
                        res.body.should.have.property('profile');
                        testUser = res.body.profile;
                        done();
                });
        });
    });

    it('it should get all halls', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}halls`)
            .set({authorization: token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('halls');
                res.body.halls.length.should.be.greaterThan(1);
                done();
        });
    });

    it('it should a single hall', (done) => {
        baseTest.chai.request(baseTest.server)
            .get(`${baseTest.route}halls/10`)
            .set({authorization: token})
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('hall');
                done();
            });
    });

});
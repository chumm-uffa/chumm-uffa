/**
 * chumm-uffa
 *
 * Unit test for users resource
 */

import { BaseTest } from '../BaseTest';

describe('/POST users', () => {

    const test = new BaseTest();
    const random = Math.floor(Math.random() * 1000);

    const user = {
        name: 'test user',
        email: `test${random}@mailinator.com`,
        password: '123456'
    };

    it('it should register a new User', (done) => {
    });

    it('it should return error message', (done) => {
    });

});

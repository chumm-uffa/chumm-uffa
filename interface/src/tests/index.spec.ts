import {createLoginRequest} from '../index';
import {LoginRequest} from '../interface/auth/login';
import { expect } from 'chai';

describe('interface factory for login', () => {
    it('should return a login request', () => {
        let request: LoginRequest = createLoginRequest("my@email.ch", "password");
        expect(request.email).to.equal('my@email.ch');
        expect(request.password).to.equal('password');
    });
})

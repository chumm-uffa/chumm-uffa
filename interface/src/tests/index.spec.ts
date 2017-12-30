import {createLoginRequest} from '../index';
import {LoginRequest} from '../interface/auth/login';
import { expect } from 'chai';
import {User} from '../model/user';

describe('interface factory for login', () => {

    it('should return a login request', () => {
        const user: User = new User();
        user.username = "myUsername";
        user.email = "my@email.ch";
        user.password = "password";
        let request: LoginRequest = createLoginRequest(user);
        expect(request.user.email).to.equal('my@email.ch');
        expect(request.user.password).to.equal('password');
        expect(request.user.username).to.equal('myUsername');
    });
})
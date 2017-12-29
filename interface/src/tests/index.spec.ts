import {LoginRequest, LoginResponse} from '../interface/auth/login';
import { expect } from 'chai';
import {User} from '../model/user';
import {AuthFactory} from "../factory/authFactory";

describe('interface factory for login', () => {

    it('should return a login request', () => {
        const user: User = new User();
        user.username = "myUsername";
        user.email = "my@email.ch";
        user.password = "password";
        let request: LoginRequest = AuthFactory.createLoginRequest(user);
        expect(request.user.email).to.equal('my@email.ch');
        expect(request.user.password).to.equal('password');
        expect(request.user.username).to.equal('myUsername');
        let response: LoginResponse = AuthFactory.createLoginResponse(true, "test", "token", user);
        expect(response.profile.email).to.equal('my@email.ch');
        expect(response.profile.password).to.equal('password');
        expect(response.profile.username).to.equal('myUsername');
        expect(response.token).to.equal('token');
        expect(response.success).to.equal(true);
        expect(response.message).to.equal('test');
    });
})
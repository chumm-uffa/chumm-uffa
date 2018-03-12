/**
 * chumm-uffa
 */
import * as WebSocket from 'ws';
import { User, Sex} from '@chumm-uffa/interface';

export class Connection {
    private _connection: WebSocket;
    private _user: User;
    private _isAlive: boolean;


    constructor(connection: WebSocket, user: User, isAlive: boolean) {
        this._connection = connection;
        this._user = user;
    }

    get connection(): WebSocket {
        return this._connection;
    }

    get user(): User {
        return this._user;
    }
}
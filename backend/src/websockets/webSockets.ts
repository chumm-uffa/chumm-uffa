/**
 * chumm-uffa
 */
import * as WebSocket from 'ws';
import * as jwt from 'jsonwebtoken';
import * as http from 'http';
import * as parse from 'url-parse';
import {Connection} from './connection';

import {
    User, PushNotification
} from '@chumm-uffa/interface';

export class WebSockets {
    private wss: WebSocket.Server;
    private connections = new Map<string, Connection>();

    /**
     * Starts listen
     * @param {"http".Server} server
     */
    public listen(server: http.Server) {
        this.wss = new WebSocket.Server({server: server});

        this.wss.on('error', (error: Error) => {
            console.error(error);
            process.exit(1);
        });

        this.setConnectionListener();
    }

    /**
     * Notify all user with the given push notification
     * @param {string[]} users
     * @param {PushNotification} notification
     */
    public notify(users: string[], notification: PushNotification) {
        console.info('WS: Notification [' + this.connections.size + ']');
        users.map((userid) => {
            const connection: Connection = this.connections.get(userid.toString());
            if (connection) {
                connection.connection.send(JSON.stringify(notification.toJSON()));
                console.info('WS: Notification send : ' + connection.user.username);
            }
        });
    }

    /**
     * Sets the connection listener
     */
    private setConnectionListener() {
        this.wss.on('connection', (ws: WebSocket, req) => {
            const user: User = this.guard(req);
            if (user === null) {
                ws.terminate();
                return;
            }
            this.connections.set(user.id.toString(), new Connection(ws, user, true));
            console.warn(`WS: Connection for user ${user.username} registered [ ${this.connections.size} ]`);

            ws.on('error', (error) => {
                this.connections.delete(user.id.toString());
                console.warn(`WS: Connection for user ${user.username} disconnected - reason: ${error} [ ${this.connections.size} ]`);
            });
            ws.on('close', (num, reason) => {
                this.connections.delete(user.id.toString());
                console.warn(`WS: Connection for user ${user.username} closed - reason: ${reason} [ ${this.connections.size} ]`);
            });
        });
    }

    /**
     * Check authorization toker
     * @param {"http".IncomingMessage} req
     * @returns {any}
     */
    private guard(req: http.IncomingMessage): User {
        const url = parse(req.url, true);
        if (!url.query.token) {
            return null;
        }
        try {
            const tocken = jwt.verify(url.query.token, process.env.APPLICATION_SECRET)._doc;
            const user: User = User.fromJSON(tocken);
            user.id = tocken._id;
            return user;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}

export default new WebSockets();

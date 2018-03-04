/**
 * chumm-uffa
 */
import * as WebSocket from 'ws';
import * as jwt from 'jsonwebtoken';
import * as http from 'http';
import * as parse from 'url-parse';
import {Connection} from './connection';

import {
    User, IPushNotification
} from '@chumm-uffa/interface';

export class WebSockets {
    private wss: WebSocket.Server;
    private connections = new Map<string, Connection>();

    /**
     * Starts listen
     * @param {"http".Server} server
     */
    public listen(server: http.Server){
        this.wss = new WebSocket.Server({ server: server });

        this.wss.on('error', (error: Error) => {
            console.error(error);
            process.exit(1);
        });

        this.setConnectionListener();
        this.startIsAlive();
    }

    /**
     * Notify all user with the given push notification
     * @param {string[]} users
     */
    public notify(users: string[], notification: IPushNotification) {
        users.map((userid) =>{
            const connection: Connection = this.connections.get(userid);
            if (connection) {
                connection.connection.send(notification);
            }
        });
    }

    /**
     * Sets the connection listener
     */
    private setConnectionListener(){
        this.wss.on('connection', (ws: WebSocket, req) => {
            const user: User = this.guard(req);
            if (user === null) {
                ws.terminate();
                return;
            }
            this.connections.set(user.id, new Connection(ws, user, true));

            // send immediatly a feedback to the incoming connection
            ws.send('Hi there, I am a WebSocket server');

            ws.on('error', (error) => {
                console.warn(`Client disconnected - reason: ${error}`);
            })
        });
    }

    /**
     * Starts the is alive timer
     */
    private startIsAlive (){
        this.wss.on('pong', (ws: WebSocket, req) => {
            const user: User = this.guard(req);
            if (user === null) {
                ws.terminate();
            }
            this.connections.get(user.id).isAlive = true;
        });

        setInterval(() => {
            this.connections.forEach((con: Connection) => {
                if (!con.isAlive) {
                    con.connection.terminate();
                    return;
                }
                con.isAlive = false;
                con.connection.ping(null, undefined);
            });
        }, 10000);
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
            return User.fromJSON(jwt.verify(url.query.token, process.env.APPLICATION_SECRET));
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}

export default new WebSockets();

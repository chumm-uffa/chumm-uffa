/**
 * chumm-uffa
 */
import * as debug from 'debug';
import * as http from 'http';
import * as winston from 'winston';

import App from './app';

/**
 * Encapsulates the http server. Is responsable for bootstrapping the
 * http server.
 */
class Server {

    private static serverInstance: Server;
    private server: any;
    private port: number;

    /**
     * Static function to bootstrap the http server
     * @returns {Server} the http server instance
     */
    public static bootstrap(): Server {
        if (!this.serverInstance) {
            this.serverInstance = new Server();
            return this.serverInstance;
        } else {
            return  this.serverInstance;
        }

    }

    /**
     * Constructor
     */
    public constructor() {
        this.debugMod();
        this.runServer();
    }

    /**
     * Returns the current serve instance
     * @returns {any} the server instance
     */
    public getServerInstance(): any {
        return this.server;
    }

    /**
     * Setting debub mode and logging
     */
    private debugMod(): void {
        debug('ts-express:server');
        winston.add(winston.transports.File, { filename: 'application.log' });
    }

    /**
     * Runs the http server
     */
    private runServer(): void {
        this.port = this.normalizePort(process.env.PORT || 8080);
        App.set('port', this.port);
        this.createServer();
    }

    /**
     * Creates a new http server instance
     */
    private createServer() {
        this.server = http.createServer(App);
        this.server.listen(this.port);

        this.server.on('listening', () => {
            const address = this.server.address();
            const bind = (typeof address === 'string') ? `pipe ${address}` : `port ${address.port}`;
            debug(`Listening on adress ${bind}`);
            console.log(`Listening on ${bind}`);
        });

        this.server.on('error', (error: NodeJS.ErrnoException) => {
            if (error.syscall !== 'listen') {
                throw error;
            }
            console.error(error);
            process.exit(1);
        });
    }

    /**
     * Normalize port
     * @param {number | string} val
     * @returns {number} the normalized port
     */
    private normalizePort(val: number | string): number {
        return (typeof val === 'string') ? parseInt(val, 10) : val;
    }

}

export const server = Server.bootstrap();

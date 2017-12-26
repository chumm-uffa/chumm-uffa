/**
 * chumm-uffa
 */
import * as winston from 'winston';

export class BaseController {

    protected logger: any;

    constructor() {
        this.logger = winston;
    }
}

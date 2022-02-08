import { ResponseError } from './response-error';

export class InvalidParamsError extends ResponseError {
    constructor(message: string) {
        super(400, message);
    }
}

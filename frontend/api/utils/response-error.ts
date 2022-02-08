export class ResponseError extends Error {
    date?: Date;

    constructor(public code: number, public message: string) {
        super(message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ResponseError);
        }

        this.name = 'ResponseError';
        this.date = new Date();
    }
}

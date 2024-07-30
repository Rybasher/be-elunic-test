export class ErrorHandler extends Error {
    message:string;
    status:number;

    constructor(message:string, status:number = 400) {
        super(message);
        this.status = status;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}

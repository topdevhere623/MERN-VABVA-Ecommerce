import { AxiosResponse } from 'axios';
import { ResponseError } from '.';
import { ErrorResponse } from '../types/response';
import { InvalidParamsError } from './invalid-params-error';

export class HttpResponseAdapter<T = ErrorResponse> {
    private _response: AxiosResponse;

    result: T;

    constructor(response: AxiosResponse) {
        this.result = response.data || {};

        this._response = response;
        this._validateResult();
    }

    private _validateResult() {
        const status = this._response.status;
        const message = (this.result as ErrorResponse)?.message || this._response.statusText;

        if (status === 400) {
            throw new InvalidParamsError(message);
        } else if (status > 400) {
            throw new ResponseError(status, message);
        }
    }
}

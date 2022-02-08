import { fakeRequest } from './utils/fakeRequest';
import { http } from './utils/http';
import { ErrorResponse } from './types/response';
import { HttpResponseAdapter } from './utils/http-response-adapter';
import { InvalidParamsError } from './utils/invalid-params-error';
import { ICountryPhoneCode } from './country.api';

export interface IAuthSignUpByPhoneValues {
    phone: string;
    country: ICountryPhoneCode;
}

export interface IAuthSignUpByPhoneResponse {
    sessionId?: string;
}

export interface IAuthSignUpConfirmCodeValues {
    code: string;
    sessionId: string;
}

export interface IAuthSignUpUserProfileValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    sessionId: string;
}

export interface IAuthSignInByLoginValues {
    login: string;
}

export interface IAuthSignInByLoginResponse {
    sessionId?: string;
}

export interface IAuthSignInByPasswordValues {
    password: string;
    sessionId: string;
}

export class AuthApi {
    static async signUpByPhone(values: IAuthSignUpByPhoneValues) {
        const { country, phone } = values;
        const countryPhoneCode = country.phone_code;
        const submittedValues = { country, phone: `${countryPhoneCode}${phone}` };

        console.log('SingUp verifyPhone:', submittedValues);

        // Fake requests
        const response = await fakeRequest<IAuthSignUpByPhoneResponse & ErrorResponse>(
            { sessionId: 'test' },
            { success: true, delay: 1000 }
        );
        // const response = await fakeRequest<IVerifyPhoneResponse & ErrorResponse>(
        //     { code: 400, message: 'An account with this number already exists. Please sign in.' },
        //     { success: true, delay: 1000 }
        // );

        if (response?.code === 400 && response?.message) {
            throw new InvalidParamsError(response.message);
        }

        return response as IAuthSignUpByPhoneResponse;

        // Real request
        // const httpResponse = await http.post('/v1/auth/register', submittedValues);
        // const response = new HttpResponseAdapter<IVerifyPhoneResponse>(httpResponse);
        // return response.result;
    }

    static async verifyConfirmCode(values: IAuthSignUpConfirmCodeValues) {
        console.log('SingUp verifyConfirmCode:', values);

        // Fake requests
        const response = await fakeRequest<IAuthSignUpByPhoneResponse & ErrorResponse>(
            { sessionId: values.sessionId },
            { success: true, delay: 1000 }
        );
        // const response = await fakeRequest<IVerifyPhoneResponse & ErrorResponse>(
        //     { code: 400, message: 'Invalid code.' },
        //     { success: true, delay: 1000 }
        // );

        if (response?.code === 400 && response?.message) {
            throw new InvalidParamsError(response.message);
        }

        return response;
    }

    static async addProfile(values: IAuthSignUpUserProfileValues) {
        console.log('SingUp addProfile:', values);

        // Fake requests
        const response = await fakeRequest<Record<string, unknown> & ErrorResponse>({}, { success: true, delay: 1000 });
        // const response = await fakeRequest<IVerifyPhoneResponse & ErrorResponse>(
        //     { code: 400, message: 'Invalid email.' },
        //     { success: true, delay: 1000 }
        // );

        if (response?.code === 400 && response?.message) {
            throw new InvalidParamsError(response.message);
        }

        return response;
    }

    static async signInByLogin(values: IAuthSignInByLoginValues) {
        const formattdPhone = String(values.login).replace(/^\+/g, '');
        const submittedValues: IAuthSignInByLoginValues = { login: formattdPhone };

        console.log('Sign In by login:', submittedValues);

        const response = await fakeRequest<IAuthSignInByLoginResponse & ErrorResponse>(
            {
                sessionId: 'test'
            },
            { success: true, delay: 1000 }
        );

        // const response = await fakeRequest<IAuthSignInByLoginResponse & ErrorResponse>(
        //     { code: 400, message: "Can't find an account with provided phone number." },
        //     { success: true, delay: 1000 }
        // );

        if (response?.code === 400 && response?.message) {
            throw new InvalidParamsError(response.message);
        }

        return response;
    }

    static async signInByPassword(values: IAuthSignInByPasswordValues) {
        console.log('Sign In by password:', values);

        // const response = await fakeRequest<Record<string, unknown> & ErrorResponse>({}, { success: true, delay: 1000 });

        const response = await fakeRequest<ErrorResponse>(
            { code: 400, message: 'Password is incorect.' },
            { success: true, delay: 1000 }
        );

        if (response?.code === 400 && response?.message) {
            throw new InvalidParamsError(response.message);
        }

        return response;
    }
}

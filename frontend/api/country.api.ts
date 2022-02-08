import * as Yup from 'yup';
import { http } from './utils/http';
import { HttpResponseAdapter } from './utils/http-response-adapter';

export interface ICountryPhoneCode {
    _id: string;
    name: string;
    phone_code: string;
    iso2?: string;
    iso3?: string;
}

export const countryPhoneCodeSchema: Yup.SchemaOf<ICountryPhoneCode> = Yup.object({
    _id: Yup.string().required(),
    name: Yup.string().required(),
    phone_code: Yup.string().required(),
    iso2: Yup.string(),
    iso3: Yup.string()
});

export class CountryApi {
    static async getCountries() {
        const httpResponse = await http.get('/v1/country');
        const response = new HttpResponseAdapter(httpResponse);

        return response.result;
    }

    static async getCountryPhoneCodes() {
        const response = await this.getCountries();
        const validResponse = await Yup.array().of(countryPhoneCodeSchema).validate(response, { stripUnknown: false });

        if (validResponse) {
            const formattedItems = validResponse.map((option) => {
                const phoneCode = option.phone_code.replace(/^\+?(\d+)\-.+/g, '$1');

                return { ...option, phone_code: phoneCode };
            });

            return formattedItems.sort((a, b) => {
                return a.phone_code.localeCompare(b.phone_code, undefined, { numeric: true });
            });
        }
    }
}

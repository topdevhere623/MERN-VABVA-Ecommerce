import React from 'react';
import { GetServerSideProps } from 'next';

import { SiteSignUpPage, SiteSignUpPageProps } from '~/components/site/auth/SiteSignUpPage';
import { CountryApi } from '~/api/country.api';

export const getServerSideProps: GetServerSideProps<SiteSignUpPageProps> = async () => {
    try {
        const response = await CountryApi.getCountryPhoneCodes();

        return {
            props: {
                countries: response
            }
        };
    } catch (e) {
        console.error(e);

        return {
            props: {}
        };
    }
};

function SignUpPage(props: SiteSignUpPageProps) {
    return <SiteSignUpPage {...props} />;
}

export default SignUpPage;

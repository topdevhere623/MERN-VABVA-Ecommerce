import React from 'react';

import { NextCustomPageHead } from '~/next-custom/PageHead';
import { AuthPageLayout } from '~/components/layout/AuthPageLayout';
import { ICountryPhoneCode } from '~/api/country.api';

import { SignUpFormFlowProvider } from './SignUpFormFlowProvider';
import { SignUpPhoneForm } from './SignUpPhoneForm';
import { SignUpVerifyCodeForm } from './SignUpVerifyCodeForm';
import { SignUpProfileForm } from './SignUpProfileForm';

export interface SiteSignUpPageProps {
    countries?: ICountryPhoneCode[];
}

export const SiteSignUpPage = (props: SiteSignUpPageProps) => {
    const { countries } = props;

    return (
        <AuthPageLayout>
            <NextCustomPageHead title="Sign up" description="Sign up with your mobile number." />

            <SignUpFormFlowProvider defaultValue="phone">
                <SignUpPhoneForm countries={countries} value="phone" />
                <SignUpVerifyCodeForm value="verify-code" />
                <SignUpProfileForm value="profile" />
            </SignUpFormFlowProvider>
        </AuthPageLayout>
    );
};

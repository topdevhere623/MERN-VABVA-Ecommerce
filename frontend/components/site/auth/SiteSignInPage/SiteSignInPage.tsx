import React from 'react';

import { NextCustomPageHead } from '~/next-custom/PageHead';
import { AuthPageLayout } from '~/components/layout/AuthPageLayout';

import { SignInLoginForm } from './SignInLoginForm';
import { SignInPasswordForm } from './SignInPasswordForm';
import { SignInFormFlowProvider } from './SignInFormFlowProvider';

export const SiteSignInPage = () => {
    return (
        <AuthPageLayout>
            <NextCustomPageHead title="Sign in" description="Sign in with your mobile number." />

            <SignInFormFlowProvider defaultValue="login">
                <SignInLoginForm value="login" />
                <SignInPasswordForm value="password" />
            </SignInFormFlowProvider>
        </AuthPageLayout>
    );
};

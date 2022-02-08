import React from 'react';

import NextLink from 'next/link';
import { Link } from '@mui/material';
import { AuthFormFooter } from '~/components/AuthForm';
import { appConfig } from '~/config/app.config';

export const SignUpFormFooter = () => {
    return (
        <AuthFormFooter>
            Already use VABVA?
            <NextLink href={appConfig.urls.signin()} passHref prefetch={false}>
                <Link sx={{ marginLeft: 3 }}>Sign in</Link>
            </NextLink>
        </AuthFormFooter>
    );
};

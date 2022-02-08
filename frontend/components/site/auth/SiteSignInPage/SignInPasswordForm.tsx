import React, { useCallback, useRef, useState } from 'react';

import NextLink from 'next/link';
import { Button, CircularProgress, Icon, Link } from '@mui/material';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import { useMountedRef } from '~/mui-custom/utils';
import { AuthForm, AuthFormFooter, AuthFormHeader } from '~/components/AuthForm';
import { FormRow } from '~/components/FormRow';
import { PasswordField } from '~/components/Field/PasswordField';
import { appConfig } from '~/config/app.config';
import { AuthApi, IAuthSignInByPasswordValues } from '~/api/auth.api';

import { SignInFormFlowItemType, useSignInFormFlow } from './SignInFormFlowContext';
import { InvalidParamsError } from '~/api/utils/invalid-params-error';

export interface SignInPasswordFormProps extends React.ComponentPropsWithoutRef<'form'> {
    value: SignInFormFlowItemType;
}

type Values = Omit<IAuthSignInByPasswordValues, 'sessionId'>;

const initialValues: Values = { password: '' };

const validationSchema: Yup.SchemaOf<Values> = Yup.object({
    password: Yup.string().min(8, 'At least ${min} characters long required.').required('This field is required.')
});

export const SignInPasswordForm = (props: SignInPasswordFormProps) => {
    const [submitting, setSubmitting] = useState(false);
    const { sessionId } = useSignInFormFlow();
    const formikRef = useRef<FormikProps<Values>>(null);
    const mountedRef = useMountedRef();

    const handleSubmit = useCallback(
        async (values: Values, helpers: FormikHelpers<Values>) => {
            if (submitting || !sessionId) {
                return;
            }

            try {
                setSubmitting(true);

                const response = await AuthApi.signInByPassword({ ...values, sessionId });

                if (mountedRef.current) {
                    setSubmitting(false);
                    helpers.resetForm();
                }
            } catch (e) {
                if (e instanceof InvalidParamsError && mountedRef.current) {
                    setSubmitting(false);

                    helpers.setErrors({
                        password: e.message
                    });
                } else {
                    console.log(e);
                }
            }
        },
        [sessionId, submitting, mountedRef]
    );

    const handleNextClick = useCallback(() => {
        if (formikRef.current) {
            formikRef.current.handleSubmit();
        }
    }, []);

    return (
        <Formik
            validateOnMount={false}
            validateOnBlur={false}
            initialValues={initialValues}
            validationSchema={validationSchema}
            innerRef={formikRef}
            onSubmit={handleSubmit}
        >
            {(formikProps) => {
                const { dirty, isValid } = formikProps;
                const isButtonDisabled = !dirty || (dirty && !isValid) || submitting;

                return (
                    <AuthForm {...props}>
                        <AuthFormHeader title="Welcome back" />
                        <FormRow>
                            <PasswordField
                                name="password"
                                label="Password"
                                helperText="Please enter your password to sign in."
                                required
                                fullWidth
                                autoFocus
                            />
                        </FormRow>
                        <FormRow>
                            <Button
                                variant={isButtonDisabled ? 'contrast' : 'contained'}
                                color={isButtonDisabled ? 'inherit' : 'primary'}
                                size="large"
                                fullWidth
                                disabled={isButtonDisabled}
                                {...(submitting && {
                                    startIcon: (
                                        <Icon>
                                            <CircularProgress color="inherit" />
                                        </Icon>
                                    )
                                })}
                                onClick={handleNextClick}
                            >
                                SIGN IN
                            </Button>
                        </FormRow>

                        <AuthFormFooter>
                            <NextLink href={appConfig.urls.forgotPassword()} passHref>
                                <Link>Forgot Password?</Link>
                            </NextLink>
                        </AuthFormFooter>
                    </AuthForm>
                );
            }}
        </Formik>
    );
};

import React, { useCallback, useEffect, useRef, useState } from 'react';

import NextLink from 'next/link';
import { Button, CircularProgress, Icon, Link } from '@mui/material';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import isMobilePhone from 'validator/lib/isMobilePhone';
import * as Yup from 'yup';

import { AuthForm, AuthFormFooter, AuthFormHeader } from '~/components/AuthForm';
import { FormRow } from '~/components/FormRow';
import { FormikTextField } from '~/components/Formik/TextField';
import { PhoneNumberFormatInput } from '~/components/FormatInput';
import { useMountedRef } from '~/mui-custom/utils';
import { appConfig } from '~/config/app.config';
import { IAuthSignInByLoginValues, AuthApi } from '~/api/auth.api';
import { InvalidParamsError } from '~/api/utils/invalid-params-error';

import { SignInFormFlowItemType, useSignInFormFlow } from './SignInFormFlowContext';

export interface SignInLoginFormProps extends React.ComponentPropsWithoutRef<'form'> {
    value: SignInFormFlowItemType;
}

type Values = IAuthSignInByLoginValues;

const initialValues: Values = { login: '' };

const validationSchema: Yup.SchemaOf<Values> = Yup.object({
    login: Yup.string()
        .required('This field is required.')
        .test('login', 'Please enter a valid phone number.', (value) => {
            return value ? isMobilePhone(value) : false;
        })
});

export const SignInLoginForm = (props: SignInLoginFormProps) => {
    const [submitting, setSubmitting] = useState(false);
    const { moveTo, updateSessionId } = useSignInFormFlow();
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const formikRef = useRef<FormikProps<Values>>(null);
    const mountedRef = useMountedRef();

    const handleSubmit = useCallback(
        async (values: Values, helpers: FormikHelpers<Values>) => {
            if (submitting) {
                return;
            }

            try {
                setSubmitting(true);

                const response = await AuthApi.signInByLogin(values);

                if (mountedRef.current) {
                    setSubmitting(false);
                    updateSessionId(response.sessionId || values.login);
                    moveTo('password');
                }
            } catch (e) {
                if (e instanceof InvalidParamsError && mountedRef.current) {
                    setSubmitting(false);

                    helpers.setErrors({
                        login: e.message
                    });
                } else {
                    console.log(e);
                }
            }
        },
        [submitting, updateSessionId, moveTo, mountedRef]
    );

    const handleNextClick = useCallback(() => {
        if (formikRef.current) {
            formikRef.current.handleSubmit();
        }
    }, []);

    useEffect(() => {
        if (phoneInputRef.current) {
            phoneInputRef.current.focus();
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
                            <FormikTextField
                                name="login"
                                placeholder="e.g. +447458197510"
                                label="Phone number"
                                helperText="Sign in with your mobile number."
                                required
                                fullWidth
                                InputProps={{
                                    inputComponent: PhoneNumberFormatInput
                                }}
                                inputRef={phoneInputRef}
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
                                Next
                            </Button>
                        </FormRow>

                        <AuthFormFooter>
                            New to VABVA?
                            <NextLink href={appConfig.urls.signup()} passHref prefetch={false}>
                                <Link sx={{ marginLeft: 3 }}>Create an account</Link>
                            </NextLink>
                        </AuthFormFooter>
                    </AuthForm>
                );
            }}
        </Formik>
    );
};

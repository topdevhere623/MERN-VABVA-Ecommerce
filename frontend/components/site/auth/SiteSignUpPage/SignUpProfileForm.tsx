import React, { useCallback, useRef, useState } from 'react';

import { Formik, FormikHelpers, FormikProps } from 'formik';
import { Button, CircularProgress, Icon } from '@mui/material';
import * as Yup from 'yup';

import { useMountedRef } from '~/mui-custom/utils';
import { AuthForm, AuthFormHeader } from '~/components/AuthForm';
import { FormRow } from '~/components/FormRow';
import { PasswordField } from '~/components/Field/PasswordField';
import { FormikTextField } from '~/components/Formik/TextField';

import { AuthApi, IAuthSignUpUserProfileValues } from '~/api/auth.api';
import { InvalidParamsError } from '~/api/utils/invalid-params-error';

import { SignUpFormFlowItemProps } from './SignUpFormFlowProvider';
import { SignUpFormFooter } from './SignUpFormFooter';
import { useSignUpFormFlow } from './SignUpFormFlowContext';

import styles from './SignUpProfileFormLayout.module.scss';

type Values = Omit<IAuthSignUpUserProfileValues, 'sessionId'>;

const initialValues: Values = { firstName: '', lastName: '', email: '', password: '' };

const validationSchema: Yup.SchemaOf<Values> = Yup.object({
    firstName: Yup.string().required('This field is required.'),
    lastName: Yup.string().required('This field is required.'),
    email: Yup.string().email('Please enter a valid email.').required('This field is required.'),
    password: Yup.string()
        .min(8, 'At least ${min} characters long required.')
        .max(16, 'Must be at most ${max} characters.')
        .required('This field is required.')
});

export type SignUpProfileFormProps = React.ComponentPropsWithoutRef<'form'> & SignUpFormFlowItemProps;

export const SignUpProfileForm = (props: SignUpProfileFormProps) => {
    const { sessionId } = useSignUpFormFlow();
    const [submitting, setSubmitting] = useState(false);
    const formikRef = useRef<FormikProps<Values>>(null);
    const mountedRef = useMountedRef();

    const handleSubmit = useCallback(
        async (values: Values, helpers: FormikHelpers<Values>) => {
            if (submitting || !sessionId) {
                return;
            }

            try {
                setSubmitting(true);

                await AuthApi.addProfile({ ...values, sessionId });

                if (mountedRef.current) {
                    helpers.resetForm();
                }
            } catch (e) {
                if (e instanceof InvalidParamsError) {
                    // @TODO: Required an error message as an object to bind error to specific field.
                    console.log(e.message);
                } else {
                    console.log(e);
                }
            } finally {
                setSubmitting(false);
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
                        <AuthFormHeader title="Let's get started" />
                        <FormRow className={styles['form-layout']}>
                            <FormikTextField name="firstName" label="First name" required autoFocus fullWidth />
                            <FormikTextField name="lastName" label="Last name" required fullWidth />
                            <FormikTextField
                                name="email"
                                label="Enter your email"
                                required
                                fullWidth
                                className={styles['form-layout__span-row']}
                            />
                            <PasswordField
                                name="password"
                                label="Enter a password"
                                helperText="8 - 16 characters"
                                required
                                fullWidth
                                className={styles['form-layout__span-row']}
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
                                SIGN UP
                            </Button>
                        </FormRow>
                        <SignUpFormFooter />
                    </AuthForm>
                );
            }}
        </Formik>
    );
};

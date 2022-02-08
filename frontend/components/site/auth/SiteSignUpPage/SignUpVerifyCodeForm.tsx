import React, { useRef, useState } from 'react';

import { Formik, FormikHelpers, FormikProps } from 'formik';
import { Button, CircularProgress, FormHelperText, Icon, Link, Stack, useEventCallback } from '@mui/material';
import { NumberFormatValues } from 'react-number-format';
import * as Yup from 'yup';

import { AuthForm, AuthFormHeader } from '~/components/AuthForm';
import { FormRow } from '~/components/FormRow';
import { FormikTextField } from '~/components/Formik/TextField';
import { VefificationCodeFormatInput } from '~/components/FormatInput';
import { useMountedRef } from '~/mui-custom/utils';
import { AuthApi, IAuthSignUpConfirmCodeValues } from '~/api/auth.api';

import { SignUpFormFlowItemProps } from './SignUpFormFlowProvider';
import { useSignUpFormFlow } from './SignUpFormFlowContext';
import { SignUpFormFooter } from './SignUpFormFooter';
import { InvalidParamsError } from '~/api/utils/invalid-params-error';

type Values = Omit<IAuthSignUpConfirmCodeValues, 'sessionId'>;

const initialValues: Values = { code: '' };

const validationSchema: Yup.SchemaOf<Values> = Yup.object({
    code: Yup.string().trim().min(4, 'Please enter a valid code.').required('This field is required.')
});

export type SignUpVerifyCodeFormProps = React.ComponentPropsWithoutRef<'form'> & SignUpFormFlowItemProps;

export const SignUpVerifyCodeForm = (props: SignUpVerifyCodeFormProps) => {
    const { moveTo, sessionId } = useSignUpFormFlow();
    const [submitting, setSubmitting] = useState(false);
    const formikRef = useRef<FormikProps<Values>>(null);
    const mountedRef = useMountedRef();

    const handleSubmit = useEventCallback(async (values: Values, helpers: FormikHelpers<Values>) => {
        if (submitting || !sessionId) {
            return;
        }

        try {
            setSubmitting(true);

            await AuthApi.verifyConfirmCode({ code: values.code, sessionId });

            if (mountedRef.current) {
                setSubmitting(false);
                moveTo('profile');
            }
        } catch (e) {
            if (e instanceof InvalidParamsError) {
                setSubmitting(false);

                helpers.setErrors({ code: e.message });
            } else {
                console.log(e);
            }
        }
    });

    const handleNextClick = useEventCallback(() => {
        if (formikRef.current) {
            formikRef.current.handleSubmit();
        }
    });

    const handleChangePhoneNumber = useEventCallback((ev: React.MouseEvent) => {
        ev.preventDefault();

        moveTo('phone');
    });

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
                        <AuthFormHeader title="Let's get started" />
                        <FormRow>
                            <FormikTextField
                                name="code"
                                label="Verification code"
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    inputComponent: VefificationCodeFormatInput
                                }}
                                inputProps={{
                                    onValueChange: (values: NumberFormatValues) => {
                                        formikProps.setFieldValue('code', values.value);
                                    }
                                }}
                                onChange={() => undefined}
                                autoFocus
                                required
                                fullWidth
                            />
                            {!submitting && (
                                <FormHelperText className="u-margin-l-8">
                                    <Link>Didn&apos;t recieve SMS?</Link>
                                </FormHelperText>
                            )}
                        </FormRow>
                        <FormRow>
                            <Stack direction="column" alignItems="center" spacing={3}>
                                <Button
                                    variant={isButtonDisabled ? 'contrast' : 'contained'}
                                    color={isButtonDisabled ? 'inherit' : 'primary'}
                                    size="large"
                                    fullWidth
                                    disabled={isButtonDisabled}
                                    onClick={handleNextClick}
                                    {...(submitting && {
                                        startIcon: (
                                            <Icon>
                                                <CircularProgress color="inherit" />
                                            </Icon>
                                        )
                                    })}
                                >
                                    Next
                                </Button>
                                {!submitting && (
                                    <Button href="#" variant="text" size="large" fullWidth onClick={handleChangePhoneNumber}>
                                        Change phone number
                                    </Button>
                                )}
                            </Stack>
                        </FormRow>
                        <SignUpFormFooter />
                    </AuthForm>
                );
            }}
        </Formik>
    );
};

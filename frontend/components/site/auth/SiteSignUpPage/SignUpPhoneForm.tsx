import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Formik, FormikHelpers, FormikProps } from 'formik';
import { Button, CircularProgress, FormHelperText, Icon } from '@mui/material';
import * as Yup from 'yup';
import isMobilePhone from 'validator/lib/isMobilePhone';

import { useMountedRef } from '~/mui-custom/utils';
import { AuthForm, AuthFormHeader } from '~/components/AuthForm';
import { FormRow } from '~/components/FormRow';
import { PhoneField } from '~/components/Field/PhoneField';
import { AuthApi, IAuthSignUpByPhoneValues } from '~/api/auth.api';
import { InvalidParamsError } from '~/api/utils/invalid-params-error';
import { countryPhoneCodeSchema } from '~/api/country.api';

import { SignUpFormFlowItemProps } from './SignUpFormFlowProvider';
import { useSignUpFormFlow } from './SignUpFormFlowContext';
import { SignUpFormFooter } from './SignUpFormFooter';
import { SiteSignUpPageProps } from './SiteSignUpPage';

export interface SignUpPhoneFormProps extends React.ComponentPropsWithoutRef<'form'>, SignUpFormFlowItemProps {
    countries?: SiteSignUpPageProps['countries'];
}

type Values = IAuthSignUpByPhoneValues;

const initialValues: Values = { phone: '', country: { _id: '', name: '', phone_code: '' } };

const validationSchema: Yup.SchemaOf<Values> = Yup.object({
    phone: Yup.string().required('This field is required.'),
    country: countryPhoneCodeSchema
});

const formValidate = (values: Partial<Values>) => {
    const errors: Partial<Record<keyof typeof values, string>> = {};
    const { phone, country } = values;

    if (phone && country && country?.phone_code) {
        const fullMobile = `+${country.phone_code}${phone}`;

        if (isMobilePhone(fullMobile) === false) {
            errors.phone = 'Please enter a valid phone number.';
        }
    }

    return errors;
};

export const SignUpPhoneForm = (props: SignUpPhoneFormProps) => {
    const { countries } = props;
    const { moveTo, updateSessionId } = useSignUpFormFlow();
    const [submitting, setSubmitting] = useState(false);
    const formikRef = useRef<FormikProps<Values>>(null);
    const countryCodeInputRef = useRef<HTMLInputElement>(null);
    const mountedRef = useMountedRef();

    const handleSubmit = useCallback(
        async (values: Values, helpers: FormikHelpers<Values>) => {
            if (submitting) {
                return undefined;
            }

            try {
                setSubmitting(true);

                const response = await AuthApi.signUpByPhone(values);

                if (mountedRef.current) {
                    setSubmitting(false);
                    updateSessionId(response?.sessionId || values.phone);
                    moveTo('verify-code');
                }
            } catch (e) {
                if (e instanceof InvalidParamsError && mountedRef.current) {
                    setSubmitting(false);

                    helpers.setErrors({
                        phone: e.message
                    });
                } else {
                    console.log(e);
                }
            }
        },
        [submitting, moveTo, updateSessionId, mountedRef]
    );

    const handleNextClick = useCallback(() => {
        if (formikRef.current) {
            formikRef.current.handleSubmit();
        }
    }, []);

    useEffect(() => {
        if (countryCodeInputRef.current) {
            countryCodeInputRef.current.focus();
        }
    }, []);

    return (
        <Formik
            validateOnMount={false}
            validateOnBlur={false}
            initialValues={initialValues}
            validationSchema={validationSchema}
            validate={formValidate}
            innerRef={formikRef}
            onSubmit={handleSubmit}
        >
            {(formikProps) => {
                const { dirty, isValid, errors, touched } = formikProps;
                const isButtonDisabled = !dirty || (dirty && !isValid) || submitting;
                const phoneError = touched.phone && errors.phone;

                return (
                    <AuthForm>
                        <AuthFormHeader title="Let's get started" />
                        <FormRow>
                            <PhoneField countries={countries} countryInputRef={countryCodeInputRef} />
                            <FormHelperText error={!!phoneError}>
                                {phoneError || 'Sign up with your mobile number.'}
                            </FormHelperText>
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
                        <SignUpFormFooter />
                    </AuthForm>
                );
            }}
        </Formik>
    );
};

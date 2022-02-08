import React from 'react';

import { FieldHookConfig, useField } from 'formik';

import { MuiCustomTextField, MuiCustomTextFieldProps } from '~/mui-custom/TextField';

export type FormikTextFieldProps = MuiCustomTextFieldProps & {
    name: string;
};

export const FormikTextField = React.forwardRef<HTMLDivElement, FormikTextFieldProps>(function FormikTextField(
    props,
    forwardRef
) {
    const { helperText: helperTextProp, ...other } = props;
    const [field, meta] = useField(other as FieldHookConfig<unknown>);
    const { error, touched } = meta;

    const hasError = touched && !!error;
    const helperText = hasError ? error : helperTextProp;

    const fieldProps = {
        ...field,
        ...props,
        error: hasError,
        helperText
    };

    return <MuiCustomTextField {...fieldProps} ref={forwardRef} />;
});

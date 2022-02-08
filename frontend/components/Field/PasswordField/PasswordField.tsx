import React from 'react';

import { Icon, IconButton, InputAdornment } from '@mui/material';

import { FormikTextField, FormikTextFieldProps } from '~/components/Formik/TextField';
import { MuiCustomTextField } from '~/mui-custom/TextField';
import { EyeOffSvg, EyeSvg } from '~/assets/svg-icons/feather';

import { usePasswordField } from '../usePasswordField';

export type PasswordFieldProps = FormikTextFieldProps & {
    formik?: boolean;
};

export const PasswordField = React.forwardRef<HTMLDivElement, PasswordFieldProps>(function PasswordField(
    props,
    forwardedRef
) {
    const { formik = true, ...other } = props;

    const { isPasswordVisible, togglePasswordVisibility } = usePasswordField();

    const FieldComponent = formik ? FormikTextField : MuiCustomTextField;

    return (
        <FieldComponent
            {...other}
            type={isPasswordVisible ? 'text' : 'password'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            size="small"
                            tabIndex={-1}
                            className="MuiIconButton-dense MuiIconButton-circular"
                            onMouseDown={(ev: React.MouseEvent) => {
                                ev.preventDefault();
                            }}
                            onClick={togglePasswordVisibility}
                        >
                            <Icon>{isPasswordVisible ? <EyeSvg /> : <EyeOffSvg />}</Icon>
                        </IconButton>
                    </InputAdornment>
                )
            }}
            ref={forwardedRef}
        />
    );
});

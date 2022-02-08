import React from 'react';
import clsx from 'clsx';

import { Form } from 'formik';

import styles from './AuthForm.module.scss';

export interface AuthFormProps extends React.ComponentPropsWithRef<'form'> {
    formik?: boolean;
}

export const AuthForm = React.forwardRef<HTMLFormElement, AuthFormProps>(function AuthForm(props, forwardedRef) {
    const { children, formik = true, className, ...other } = props;

    const Component = formik ? Form : 'form';

    return (
        <Component {...other} className={clsx('form', styles['auth-form'], className)} ref={forwardedRef}>
            {children}
        </Component>
    );
});

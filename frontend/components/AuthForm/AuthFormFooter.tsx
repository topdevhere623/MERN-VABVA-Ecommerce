import React from 'react';
import clsx from 'clsx';

import styles from './AuthForm.module.scss';

export type AuthFormFooterProps = React.ComponentPropsWithRef<'div'>;

export const AuthFormFooter = React.forwardRef<HTMLDivElement, AuthFormFooterProps>(function AuthFormFooter(
    props,
    forwardedRef
) {
    const { children, className, ...other } = props;

    return (
        <footer {...other} className={clsx(styles['auth-form__footer'], className)} ref={forwardedRef}>
            {children}
        </footer>
    );
});

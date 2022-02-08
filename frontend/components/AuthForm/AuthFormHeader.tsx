import React from 'react';
import clsx from 'clsx';

import styles from './AuthForm.module.scss';

export interface AuthFormHeaderProps extends React.ComponentPropsWithRef<'div'> {
    title?: string;
}

export const AuthFormHeader = React.forwardRef<HTMLDivElement, AuthFormHeaderProps>(function AuthFormHeader(
    props,
    forwardedRef
) {
    const { children, title, className, ...other } = props;

    return (
        <header {...other} className={clsx(styles['auth-form__header'], className)} ref={forwardedRef}>
            {title && <h3 className={styles['auth-form__title']}>{title}</h3>}
            {children}
        </header>
    );
});

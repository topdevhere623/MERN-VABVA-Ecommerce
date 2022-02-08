import React from 'react';
import clsx from 'clsx';

export type FormRowProps = React.ComponentPropsWithRef<'div'>;

export const FormRow = React.forwardRef<HTMLDivElement, FormRowProps>(function FormRow(props, forwardedRef) {
    const { children, className, ...other } = props;

    return (
        <div {...other} className={clsx('form__row', className)} ref={forwardedRef}>
            {children}
        </div>
    );
});

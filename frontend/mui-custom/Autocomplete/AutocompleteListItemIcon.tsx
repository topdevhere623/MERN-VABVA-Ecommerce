import React from 'react';
import clsx from 'clsx';

export type MuiCustomAutocompleteListItemIconProps = React.ComponentPropsWithoutRef<'div'>;

export const MuiCustomAutocompleteListItemIcon = (
    props: MuiCustomAutocompleteListItemIconProps
) => {
    const { children, className, ...other } = props;

    return (
        <div {...other} className={clsx('MuiListItemIcon-root', className)}>
            {children}
        </div>
    );
};

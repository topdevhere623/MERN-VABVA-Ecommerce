import React from 'react';
import clsx from 'clsx';

export type MuiCustomAutocompleteListGroupProps = React.ComponentPropsWithoutRef<'li'>;

export const MuiCustomAutocompleteListGroup = (props: MuiCustomAutocompleteListGroupProps) => {
    const { className, children, ...other } = props;

    return (
        <li
            {...other}
            className={clsx(
                'MuiListSubheader-root MuiListSubheader-gutters MuiCustomAutocomplete-listGroup',
                className
            )}
        >
            {children}
        </li>
    );
};

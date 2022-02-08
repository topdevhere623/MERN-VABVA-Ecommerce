import React from 'react';
import clsx from 'clsx';

export type MuiCustomAutocompleteListItemProps = React.ComponentPropsWithoutRef<'li'>;

export const MuiCustomAutocompleteListItem = (props: MuiCustomAutocompleteListItemProps) => {
    const { className, children, ...other } = props;

    return (
        <li
            {...other}
            className={clsx(
                'MuiMenuItem-root MuiMenuItem-gutters MuiCustomAutocomplete-listItem',
                className
            )}
        >
            {children}
        </li>
    );
};

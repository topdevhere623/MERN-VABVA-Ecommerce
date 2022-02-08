import React from 'react';
import clsx from 'clsx';

export interface MuiCustomAutocompleteListItemTextProps
    extends React.ComponentPropsWithoutRef<'div'> {
    primary?: React.ReactElement | string;
    secondary?: React.ReactElement | string;
}

export const MuiCustomAutocompleteListItemText = (
    props: MuiCustomAutocompleteListItemTextProps
) => {
    const { children, className, primary, secondary, ...other } = props;

    return (
        <div
            {...other}
            className={clsx('MuiListItemText-root', className, {
                'MuiListItemText-multiline': primary && secondary
            })}
        >
            {primary && <div className="MuiListItemText-primary">{primary}</div>}
            {secondary && <div className="MuiListItemText-secondary">{secondary}</div>}
            {children}
        </div>
    );
};

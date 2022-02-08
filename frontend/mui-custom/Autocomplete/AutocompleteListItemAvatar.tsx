import React from 'react';
import clsx from 'clsx';

export type MuiCustomAutocompleteListItemAvatarProps = React.ComponentPropsWithoutRef<'div'>;

export const MuiCustomAutocompleteListItemAvatar = (
    props: MuiCustomAutocompleteListItemAvatarProps
) => {
    const { children, className, ...other } = props;

    return (
        <div {...other} className={clsx('MuiListItemAvatar-root', className)}>
            {children}
        </div>
    );
};

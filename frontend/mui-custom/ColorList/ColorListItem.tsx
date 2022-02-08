import React from 'react';

import { ListItemButton as MuiListItemButton, ListItemButtonProps as MuiListItemButtonProps } from '@mui/material';
import clsx from 'clsx';

export interface MuiCustomColorListItemProps extends Omit<MuiListItemButtonProps, 'color' | 'children'> {
    color: string;
}

export const MuiCustomColorListItem = React.forwardRef<HTMLDivElement, MuiCustomColorListItemProps>(
    function MuiCustomColorListItem(props, forwardedRef) {
        const { color, className, ...other } = props;

        return (
            <MuiListItemButton {...other} className={clsx('MuiCustomColorListItem', className)} ref={forwardedRef}>
                <div className="MuiCustomColorListItem-color" style={{ backgroundColor: color }} />
            </MuiListItemButton>
        );
    }
);

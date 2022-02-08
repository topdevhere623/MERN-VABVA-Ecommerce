import React from 'react';
import { CellProps, TableExpandedToggleProps } from 'react-table';
import { Icon, IconButton } from '@mui/material';

import { ChevronDownSvg, ChevronRightSvg } from '../../assets/svg-icons/feather';
import { useMuiCustomReactTableRow } from './ReactTableRowContext';

export const MuiCustomReactTableCheckboxCell: React.ComponentType<CellProps<Record<string, unknown>>> = (props) => {
    const { row } = props;
    const { title, ...rowExpanderProps } = row?.getToggleRowExpandedProps
        ? row.getToggleRowExpandedProps()
        : ({} as TableExpandedToggleProps);
    const { expanded } = useMuiCustomReactTableRow();

    return (
        <IconButton {...rowExpanderProps} size="small">
            {expanded ? (
                <Icon fontSize="medium">
                    <ChevronDownSvg />
                </Icon>
            ) : (
                <Icon fontSize="medium">
                    <ChevronRightSvg />
                </Icon>
            )}
        </IconButton>
    );
};

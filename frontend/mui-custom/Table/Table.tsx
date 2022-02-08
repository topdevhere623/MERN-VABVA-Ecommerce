import React from 'react';
import clsx from 'clsx';
import { Table, TableProps } from '@mui/material';

export interface MuiCustomTableProps extends TableProps {
    striped?: boolean;
    bordered?: boolean;
}

export const MuiCustomTable = React.forwardRef<HTMLTableElement, MuiCustomTableProps>(function MuiCustomTable(
    props,
    forwardedRef
) {
    const { striped, bordered, className, ...other } = props;

    return (
        <Table
            {...other}
            className={clsx(className, {
                'MuiTable-striped': striped,
                'MuiTable-bordered': bordered
            })}
            ref={forwardedRef}
        />
    );
});

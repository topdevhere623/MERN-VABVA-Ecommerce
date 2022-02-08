import React from 'react';
import { HeaderGroup, TableSortByToggleProps } from 'react-table';
import { TableRow, TableSortLabel } from '@mui/material';

import { MuiCustomTableCell } from '../Table';

export interface MuiCustomReactTableHeadRowProps<D extends Record<string, unknown> = Record<string, unknown>> {
    headerGroup: HeaderGroup<D>;
}

export const MuiCustomReactTableHeadRow = <D extends Record<string, unknown> = Record<string, unknown>>(
    props: MuiCustomReactTableHeadRowProps<D>
) => {
    const { headerGroup } = props;

    return (
        <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
                const { MuiCellProps, isSorted, canSort, isSortedDesc, getSortByToggleProps, getHeaderProps } = column;

                const { title, ...sortByToggleProps } = getSortByToggleProps
                    ? getSortByToggleProps()
                    : ({} as TableSortByToggleProps);

                const { key: cellKey, ...cellProps } = getHeaderProps(sortByToggleProps);

                let contentElement = column.render('Header');

                if (canSort) {
                    contentElement = (
                        <TableSortLabel active={isSorted} direction={isSortedDesc ? 'desc' : 'asc'}>
                            {column.render('Header')}
                        </TableSortLabel>
                    );
                }

                return (
                    <MuiCustomTableCell key={cellKey} {...cellProps} {...MuiCellProps} thSortable={canSort}>
                        {contentElement}
                    </MuiCustomTableCell>
                );
            })}
        </TableRow>
    );
};

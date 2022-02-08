import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Collapse, TableCell, TableRow } from '@mui/material';
import { Row } from 'react-table';

import { MuiCustomTableCell } from '../Table';
import { MuiCustomReactTableRowContext, MuiCustomReactTableRowContextValue } from './ReactTableRowContext';

export interface MuiCustomReactTableRowProps<D extends Record<string, unknown> = Record<string, unknown>> {
    row: Row<D>;
    oddRow?: boolean;
}

export const MuiCustomReactTableRow = <D extends Record<string, unknown> = Record<string, unknown>>(
    props: MuiCustomReactTableRowProps<D>
) => {
    const { row, oddRow = false } = props;

    const selected = row?.isSelected;
    const expanded = row?.isExpanded;

    const rowContextValue = useMemo<MuiCustomReactTableRowContextValue>(
        () => ({ selected, expanded }),
        [selected, expanded]
    );

    const cells = useMemo(() => {
        return row.cells.map((cell) => {
            const { key: cellKey, ...cellProps } = cell.getCellProps();
            const { MuiCellProps } = cell.column;

            return (
                <MuiCustomTableCell key={cellKey} {...cellProps} {...MuiCellProps}>
                    {cell.render('Cell')}
                </MuiCustomTableCell>
            );
        });
    }, [row]);

    return useMemo(() => {
        const expandedColumn = row.cells.find((cell) => {
            return !!cell.column?.ExpandedRowContent;
        });
        const colSpan = row.cells.length;

        return (
            <MuiCustomReactTableRowContext.Provider value={rowContextValue}>
                <TableRow
                    {...row.getRowProps()}
                    hover
                    selected={rowContextValue.selected}
                    className={clsx({ 'MuiTableRow-oddRow': oddRow, 'MuiTableRow-expanded': rowContextValue.expanded })}
                >
                    {cells}
                </TableRow>
                {expandedColumn && (
                    <TableRow
                        className={clsx('MuiTableRow-body', {
                            'MuiTableRow-collapsed': !rowContextValue.expanded
                        })}
                    >
                        <TableCell colSpan={colSpan}>
                            <Collapse in={rowContextValue.expanded} timeout={{ enter: 250, exit: 150 }} unmountOnExit>
                                {expandedColumn.render('ExpandedRowContent', row)}
                            </Collapse>
                        </TableCell>
                    </TableRow>
                )}
            </MuiCustomReactTableRowContext.Provider>
        );
    }, [row, oddRow, cells, rowContextValue]);
};

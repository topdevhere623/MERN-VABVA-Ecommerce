import React from 'react';
import { Column, TableOptions, useExpanded, useRowSelect, useSortBy, useTable } from 'react-table';
import { TableHead, TableBody } from '@mui/material';

import { MuiCustomTableContainerProps, MuiCustomTableProps, MuiCustomTableContainer, MuiCustomTable } from '../Table';
import { MuiCustomReactTableRow } from './ReactTableRow';
import { MuiCustomReactTableHeadRow } from './ReactTableHeadRow';

export interface MuiCustomReactTableProps<D extends Record<string, unknown>> extends MuiCustomTableProps {
    columns: Array<Column<D>>;
    data: Array<D>;
    enableRowSelect?: boolean;
    enableRowExpand?: boolean;
    enableSort?: boolean;
    PaperProps?: MuiCustomTableContainerProps['PaperProps'];
    initialState?: TableOptions<D>['initialState'];
}

function MuiCustomReactTableWithRef<D extends Record<string, unknown> = Record<string, unknown>>(
    props: MuiCustomReactTableProps<D>,
    forwardedRef: React.Ref<HTMLDivElement>
) {
    const {
        columns,
        data,
        enableRowExpand = false,
        enableRowSelect = false,
        enableSort = false,
        PaperProps,
        initialState,
        ...other
    } = props;

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data,
            initialState
        },
        ...(enableSort ? [useSortBy] : []),
        ...(enableRowExpand ? [useExpanded] : []),
        ...(enableRowSelect ? [useRowSelect] : [])
    );

    return (
        <MuiCustomTableContainer PaperProps={PaperProps} ref={forwardedRef}>
            <MuiCustomTable {...other} {...getTableProps()}>
                <TableHead>
                    {headerGroups.map((headerGroup) => {
                        const { key } = headerGroup.getHeaderGroupProps();

                        return <MuiCustomReactTableHeadRow key={key} headerGroup={headerGroup} />;
                    })}
                </TableHead>

                <TableBody {...getTableBodyProps()}>
                    {rows.map((row, index) => {
                        prepareRow(row);

                        const { key } = row.getRowProps();

                        return <MuiCustomReactTableRow key={key} row={row} oddRow={index % 2 === 0} />;
                    })}
                </TableBody>
            </MuiCustomTable>
        </MuiCustomTableContainer>
    );
}

export const MuiCustomReactTable = React.forwardRef(MuiCustomReactTableWithRef) as <
    D extends Record<string, unknown> = Record<string, unknown>
>(
    props: MuiCustomReactTableProps<D> & { ref?: React.Ref<HTMLDivElement> }
) => JSX.Element;

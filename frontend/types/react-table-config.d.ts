// Source: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-table

import React from 'react';
import {
    UseColumnOrderInstanceProps,
    UseColumnOrderState,
    UseExpandedHooks,
    UseExpandedInstanceProps,
    UseExpandedOptions,
    UseExpandedRowProps,
    UseExpandedState,
    UseFiltersColumnOptions,
    UseFiltersColumnProps,
    UseFiltersInstanceProps,
    UseFiltersOptions,
    UseFiltersState,
    UseGlobalFiltersColumnOptions,
    UseGlobalFiltersInstanceProps,
    UseGlobalFiltersOptions,
    UseGlobalFiltersState,
    UseGroupByCellProps,
    UseGroupByColumnOptions,
    UseGroupByColumnProps,
    UseGroupByHooks,
    UseGroupByInstanceProps,
    UseGroupByOptions,
    UseGroupByRowProps,
    UseGroupByState,
    UsePaginationInstanceProps,
    UsePaginationOptions,
    UsePaginationState,
    UseResizeColumnsColumnOptions,
    UseResizeColumnsColumnProps,
    UseResizeColumnsOptions,
    UseResizeColumnsState,
    UseRowSelectHooks,
    UseRowSelectInstanceProps,
    UseRowSelectOptions,
    UseRowSelectRowProps,
    UseRowSelectState,
    UseRowStateCellProps,
    UseRowStateInstanceProps,
    UseRowStateOptions,
    UseRowStateRowProps,
    UseRowStateState,
    UseSortByColumnOptions,
    UseSortByColumnProps,
    UseSortByHooks,
    UseSortByInstanceProps,
    UseSortByOptions,
    UseSortByState
} from 'react-table';

import { MuiCustomTableCellProps } from '~/mui-custom/Table';

declare module 'react-table' {
    // useExpanded
    export interface TableExpandedToggleProps extends TableKeyedProps {
        title?: string;
        style?: React.CSSProperties;
        onClick?: (ev: React.MouseEvent) => void;
    }

    export interface TableOptions<D extends Record<string, unknown>>
        extends Partial<UseExpandedOptions<D>>,
            UseFiltersOptions<D>,
            UseGlobalFiltersOptions<D>,
            UseGroupByOptions<D>,
            UsePaginationOptions<D>,
            UseResizeColumnsOptions<D>,
            Partial<UseRowSelectOptions<D>>,
            UseRowStateOptions<D>,
            UseSortByOptions<D>,
            // note that having Record here allows you to add anything to the options, this matches the spirit of the
            // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
            // feature set, this is a safe default.
            Record<string, unknown> {}

    export interface Hooks<D extends Record<string, unknown> = Record<string, unknown>>
        extends Partial<UseExpandedHooks<D>>,
            UseGroupByHooks<D>,
            Partial<UseRowSelectHooks<D>>,
            UseSortByHooks<D> {}

    export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
        extends UseColumnOrderInstanceProps<D>,
            Partial<UseExpandedInstanceProps<D>>,
            UseFiltersInstanceProps<D>,
            UseGlobalFiltersInstanceProps<D>,
            UseGroupByInstanceProps<D>,
            UsePaginationInstanceProps<D>,
            Partial<UseRowSelectInstanceProps<D>>,
            UseRowStateInstanceProps<D>,
            UseSortByInstanceProps<D> {}

    export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
        extends UseColumnOrderState<D>,
            Partial<UseExpandedState<D>>,
            UseFiltersState<D>,
            UseGlobalFiltersState<D>,
            UseGroupByState<D>,
            UsePaginationState<D>,
            UseResizeColumnsState<D>,
            Partial<UseRowSelectState<D>>,
            UseRowStateState<D>,
            UseSortByState<D> {}

    export interface ColumnInterface<D extends Record<string, unknown> = Record<string, unknown>>
        extends UseFiltersColumnOptions<D>,
            UseGlobalFiltersColumnOptions<D>,
            UseGroupByColumnOptions<D>,
            UseResizeColumnsColumnOptions<D>,
            UseSortByColumnOptions<D> {
        ExpandedRowContent?: React.ComponentType<Row<D>>;
        MuiCellProps?: MuiCustomTableCellProps;
    }

    export interface ColumnInstance<D extends Record<string, unknown> = Record<string, unknown>>
        extends UseFiltersColumnProps<D>,
            UseGroupByColumnProps<D>,
            UseResizeColumnsColumnProps<D>,
            UseSortByColumnProps<D> {}

    export interface Cell<D extends Record<string, unknown> = Record<string, unknown>>
        extends UseGroupByCellProps<D>,
            UseRowStateCellProps<D> {
        ExpandedRowContent?: React.ComponentType<Row<D>>;
    }

    export interface Row<D extends Record<string, unknown> = Record<string, unknown>>
        extends Partial<UseExpandedRowProps<D>>,
            UseGroupByRowProps<D>,
            Partial<UseRowSelectRowProps<D>>,
            UseRowStateRowProps<D> {}

    export interface TableSortByToggleProps {
        title?: string;
        style?: React.CSSProperties;
        onClick?: (ev: React.MouseEvent) => void;
    }
}

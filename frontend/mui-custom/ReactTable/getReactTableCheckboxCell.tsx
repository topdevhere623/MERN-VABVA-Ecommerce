import React from 'react';
import { TableToggleRowsSelectedProps, CellProps } from 'react-table';
import { Checkbox, CheckboxProps } from '@mui/material';

import { useMuiCustomReactTableRow } from './ReactTableRowContext';

export function getMuiCustomReactTableCheckboxCell(
    checkboxProps?: CheckboxProps
): React.ComponentType<CellProps<Record<string, unknown>>> {
    return (props) => {
        const { row } = props;
        const { title, ...otherCheckboxProps } = row?.getToggleRowSelectedProps
            ? row.getToggleRowSelectedProps()
            : ({} as TableToggleRowsSelectedProps);
        const { selected } = useMuiCustomReactTableRow();

        return <Checkbox {...checkboxProps} {...otherCheckboxProps} checked={selected} />;
    };
}

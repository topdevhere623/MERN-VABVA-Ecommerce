import React from 'react';
import { Icon, IconButton, IconButtonProps, IconProps } from '@mui/material';
import { CellProps, TableExpandedToggleProps } from 'react-table';

import { ChevronDownSvg, ChevronRightSvg } from '../../assets/svg-icons/feather';
import { useMuiCustomReactTableRow } from './ReactTableRowContext';

type GetMuiCustomTableExpanderCellProps = {
    IconButtonProps?: IconButtonProps;
    IconProps?: IconProps;
    ExpandedIcon?: React.ReactElement;
    CollapsedIcon?: React.ReactElement;
};

export function getMuiCustomReactTableExpanderCell(
    expanderProps?: GetMuiCustomTableExpanderCellProps
): React.ComponentType<CellProps<Record<string, unknown>>> {
    const {
        IconButtonProps: IconButtonPropsProp,
        IconProps: IconPropsProp,
        CollapsedIcon: CollapsedIconProp = null,
        ExpandedIcon: ExpandedIconProp = null
    } = expanderProps || {};

    const CollapsedIconElement = React.cloneElement(
        CollapsedIconProp || (
            <Icon fontSize="medium" {...IconPropsProp}>
                <ChevronRightSvg />
            </Icon>
        ),
        { ...IconPropsProp }
    );
    const ExpandedIconElement = React.cloneElement(
        ExpandedIconProp || (
            <Icon fontSize="medium">
                <ChevronDownSvg />
            </Icon>
        ),
        { ...IconPropsProp }
    );

    return (props) => {
        const { row } = props;
        const { title, ...rowExpanderProps } = row?.getToggleRowExpandedProps
            ? row.getToggleRowExpandedProps()
            : ({} as TableExpandedToggleProps);

        const { expanded } = useMuiCustomReactTableRow();

        return (
            <IconButton size="small" {...IconButtonPropsProp} {...rowExpanderProps}>
                {expanded ? ExpandedIconElement : CollapsedIconElement}
            </IconButton>
        );
    };
}

import React, { useMemo } from 'react';

import { MenuList as MuiMenuList, MenuListProps as MuiListProps } from '@mui/material';
import clsx from 'clsx';
import { MuiCustomColorListItem } from './ColorListItem';

export interface MuiCustomColorListProps extends Omit<MuiListProps, 'children' | 'onSelect'> {
    colorPalette?: string[];
    selected?: string;
    selectedIndex?: number;
    onSelect?: (color?: string, index?: number) => void;
}

// prettier-ignore
const defaultColorPalette = [
    '#ab7361', '#cf6d67', '#f74031', '#f95b45', '#fe7844', '#fdae54', 
    '#41d695', '#13a768', '#79d155', '#b1dc75', '#f9ea8c', '#f8d270', 
    '#92e1c1', '#a0e0e6', '#a1c5e5', '#5085e3', '#9d9bfb', '#bb99fb', 
    '#5f6368', '#cabdbf', '#cca6ac', '#f692b2', '#ce74e2', '#a679de'
];

export const MuiCustomColorList = React.forwardRef<HTMLUListElement, MuiCustomColorListProps>(function MuiCustomColorList(
    props,
    forwardedRef
) {
    const {
        className,
        colorPalette = [],
        selected: selectedProp,
        selectedIndex: selectedIndexProp,
        onSelect,
        ...other
    } = props;

    const items = useMemo(() => {
        const colors = colorPalette.length > 0 ? colorPalette : defaultColorPalette;

        const handleSelect = (color: string, index: number) => () => {
            if (onSelect) {
                onSelect(color, index);
            }
        };

        return colors.map((color, index) => {
            const selected = selectedProp === color || selectedIndexProp === index;

            return (
                <MuiCustomColorListItem
                    key={index}
                    autoFocus={selected || index === 0}
                    color={color}
                    selected={selected}
                    onClick={handleSelect(color, index)}
                />
            );
        });
    }, [colorPalette, selectedProp, selectedIndexProp, onSelect]);

    return (
        <MuiMenuList autoFocus {...other} className={clsx('MuiCustomColorList', className)} ref={forwardedRef}>
            {items}
        </MuiMenuList>
    );
});

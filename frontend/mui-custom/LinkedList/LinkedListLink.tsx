import React, { useCallback } from 'react';
import { ListItemButton, ListItemButtonProps, ListItemIcon } from '@mui/material';
import { KeyboardArrowRightRounded } from '@mui/icons-material';

import { MuiCustomLinkedListGroupItem } from './LinkedListTypes';
import { useMuiCustomLinkedList } from './LinkedListContext';

export interface MuiCustomLinkedListLinkProps extends ListItemButtonProps {
    groupKey: MuiCustomLinkedListGroupItem['key'];
    groupTitle: MuiCustomLinkedListGroupItem['title'];
    arrow?: React.ReactElement;
}

export const MuiCustomLinkedListLink = React.forwardRef<HTMLDivElement, MuiCustomLinkedListLinkProps>(
    function MuiCustomLinkedListLink(props, forwardedRef) {
        const { children, groupKey, groupTitle, arrow, onClick, ...other } = props;

        const { onSelectGroup } = useMuiCustomLinkedList();

        const handleClick = useCallback(
            (ev: React.MouseEvent<HTMLDivElement>) => {
                onSelectGroup({
                    key: groupKey,
                    title: groupTitle
                });

                if (onClick) {
                    onClick(ev);
                }
            },
            [groupKey, groupTitle, onSelectGroup, onClick]
        );

        const arrowElement = arrow || <KeyboardArrowRightRounded />;

        return (
            <ListItemButton {...other} onClick={handleClick} ref={forwardedRef}>
                {children}
                {arrowElement && <ListItemIcon>{arrowElement}</ListItemIcon>}
            </ListItemButton>
        );
    }
);

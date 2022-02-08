import React, { useMemo } from 'react';
import {
    ListProps as MuiListProps,
    MenuList,
    Paper,
    Popper,
    PopperProps as MuiPopperProps,
    PaperProps as MuiPaperProps,
    Fade,
    useEventCallback,
    useTheme
} from '@mui/material';

export interface MuiCustomSubMenuListProps extends MuiListProps {
    open: MuiPopperProps['open'];
    anchorEl: MuiPopperProps['anchorEl'];
    placement?: MuiPopperProps['placement'];
    PaperProps?: MuiPaperProps;
    MenuListComponent?: React.ReactElement | null;
    onClose?: () => void;
}

export const MuiCustomSubMenuList = (props: MuiCustomSubMenuListProps) => {
    const {
        open,
        anchorEl,
        children,
        placement = 'right-start',
        PaperProps: PaperPropsProp,
        MenuListComponent,
        onClose,
        ...other
    } = props;

    const theme = useTheme();

    const handleKeyDown = useEventCallback((ev: React.KeyboardEvent) => {
        ev.stopPropagation();

        if (ev.key === 'Escape' && onClose) {
            onClose();
        }
    });

    const popperProps = useMemo<MuiPopperProps>(() => {
        return {
            placement,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 2]
                    }
                }
            ],
            className: 'MuiCustomMenu',
            style: { zIndex: theme.zIndex.modal },
            transition: true,
            open,
            anchorEl
        };
    }, [open, anchorEl, placement, theme]);

    let menuListElement: React.ReactElement | null = null;

    if (MenuListComponent === undefined) {
        menuListElement = (
            <MenuList autoFocus onKeyDown={handleKeyDown} {...other}>
                {children}
            </MenuList>
        );
    } else if (React.isValidElement(MenuListComponent)) {
        menuListElement = React.cloneElement(MenuListComponent, {
            onKeyDown: handleKeyDown
        });
    }

    return (
        <Popper {...popperProps}>
            {({ TransitionProps }) => {
                return (
                    <Fade {...TransitionProps} timeout={{ exit: 120, enter: 220 }}>
                        <div className="MuiMenu-root">
                            <Paper elevation={8} {...PaperPropsProp}>
                                {menuListElement}
                            </Paper>
                        </div>
                    </Fade>
                );
            }}
        </Popper>
    );
};

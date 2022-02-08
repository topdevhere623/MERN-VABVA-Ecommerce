import React, { useMemo } from 'react';
import {
    MenuProps as MuiMenuProps,
    MenuList,
    MenuListProps as MuiMenuListProps,
    Paper,
    PaperProps as MuiPaperProps,
    Popper,
    PopperProps as MuiPopperProps,
    ClickAwayListener,
    useEventCallback,
    Grow,
    useTheme
} from '@mui/material';

import { MuiCustomMenuContext, MuiCustomMenuContextValue } from './MenuContext';

export interface MuiCustomMenuProps extends MuiMenuListProps {
    children: React.ReactElement | React.ReactElement[];
    open: boolean;
    anchorEl: MuiPopperProps['anchorEl'];
    placement?: MuiPopperProps['placement'];
    transition?: boolean;
    TransitionProps?: MuiMenuProps['TransitionProps'];
    PaperProps?: MuiPaperProps;
    onClose?: () => void;
}

export const MuiCustomMenu = React.forwardRef<HTMLDivElement, MuiCustomMenuProps>(function MuiCustomMenu(
    props,
    forwardedRef
) {
    const {
        open,
        anchorEl,
        children,
        placement = 'bottom-start',
        transition = true,
        PaperProps: PaperPropsProp,
        TransitionProps: TransitionPropsProp,
        onClose,
        ...other
    } = props;

    const theme = useTheme();
    const menuDefaultProps = theme.components?.MuiMenu?.defaultProps || {};

    const handleClose = useEventCallback(() => {
        if (onClose) {
            onClose();
        }

        if (anchorEl) {
            (anchorEl as HTMLElement).focus();
        }
    });

    const handleClickAway = useEventCallback((ev: MouseEvent | TouchEvent) => {
        if (open && ev.target !== anchorEl) {
            handleClose();
        }
    });

    const handleKeyDown = useEventCallback((ev: React.KeyboardEvent<HTMLDivElement>) => {
        if (ev.key === 'Escape') {
            handleClose();
        }
    });

    // Render

    const popperProps = useMemo<MuiPopperProps>(
        () => ({
            placement,
            open,
            anchorEl,
            transition,
            style: { zIndex: theme.zIndex.modal }
        }),
        [anchorEl, open, placement, transition, theme]
    );

    const contextValue = useMemo<MuiCustomMenuContextValue>(() => {
        return {
            isParentOpen: open
        };
    }, [open]);

    const TransitionComponent = menuDefaultProps.TransitionComponent || Grow;
    const transitionTimeout = menuDefaultProps.TransitionProps?.timeout || {
        exit: 120,
        enter: 220
    };

    return (
        <MuiCustomMenuContext.Provider value={contextValue}>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Popper {...popperProps} ref={forwardedRef}>
                    {({ TransitionProps }) => {
                        return (
                            <TransitionComponent
                                {...TransitionProps}
                                timeout={transitionTimeout}
                                style={{ transformOrigin: '0 0 0' }}
                                {...TransitionPropsProp}
                            >
                                <div className="MuiMenu-root MuiCustomMenu">
                                    <Paper elevation={8} {...PaperPropsProp} onKeyDown={handleKeyDown}>
                                        <MenuList autoFocus {...other}>
                                            {children}
                                        </MenuList>
                                    </Paper>
                                </div>
                            </TransitionComponent>
                        );
                    }}
                </Popper>
            </ClickAwayListener>
        </MuiCustomMenuContext.Provider>
    );
});

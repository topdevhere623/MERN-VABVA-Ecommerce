import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Grow, Paper, PaperProps, Popper, PopperProps, useTheme } from '@mui/material';

export interface MuiCustomAutocompletePopperProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    autoWidth?: boolean;
    children?: React.ReactNode;
    PaperProps?: PaperProps;
}

export const MuiCustomAutocompletePopper = (props: MuiCustomAutocompletePopperProps) => {
    const { open, anchorEl, autoWidth = true, children, PaperProps: PaperPropsProp } = props;

    const theme = useTheme();

    const TransitionComponent = theme.components?.MuiPopover?.defaultProps?.TransitionComponent || Grow;
    const transitionProps = theme.components?.MuiPopover?.defaultProps?.TransitionProps || {
        timeout: {
            exit: 0,
            enter: 220,
            appear: 220
        }
    };

    const popperProps = useMemo<PopperProps>(() => {
        return {
            open,
            anchorEl,
            placement: 'bottom-start',
            style: { zIndex: theme.zIndex.modal },
            transition: true
        };
    }, [anchorEl, open, theme]);

    const paperStyle = useMemo(() => {
        return {
            ...(autoWidth && anchorEl && { width: anchorEl?.clientWidth })
        };
    }, [anchorEl, autoWidth]);

    // Render

    if (!anchorEl) {
        return null;
    }

    return (
        <Popper {...popperProps} className="MuiCustomAutocomplete-popper">
            {(popperParams) => {
                const { TransitionProps, placement } = popperParams;

                return (
                    <TransitionComponent {...TransitionProps} {...transitionProps} unmountOnExit>
                        <Paper
                            {...PaperPropsProp}
                            className={clsx(
                                'MuiCustomAutocomplete-paper',
                                `u-placement-${placement}`,
                                PaperPropsProp?.className
                            )}
                            sx={{ ...paperStyle, ...PaperPropsProp?.sx }}
                        >
                            {children}
                        </Paper>
                    </TransitionComponent>
                );
            }}
        </Popper>
    );
};

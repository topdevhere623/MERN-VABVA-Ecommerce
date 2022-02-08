import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { Paper, PaperProps, useEventCallback } from '@mui/material';

import { MuiCustomSimplebar, MuiCustomSimplebarRef } from '../Simplebar';

export interface MuiCustomPaperSimplebarProps extends PaperProps {
    component?: React.ElementType;
    maxHeight?: string;
    maxWidth?: string;
}

export const MuiCustomPaperSimplebar = React.forwardRef<HTMLDivElement, MuiCustomPaperSimplebarProps>(
    (props, forwardedRef) => {
        const { children, maxHeight, maxWidth, className, style, ...other } = props;
        const [scrollbarRef, setScrollbarRef] = useState<MuiCustomSimplebarRef>(null);
        const focusedElementRef = useRef<HTMLElement>();

        const handleFocus = useEventCallback((ev: React.FocusEvent) => {
            if (ev.target) {
                focusedElementRef.current = ev.target as HTMLElement;
            }
        });

        useEffect(() => {
            if (scrollbarRef && focusedElementRef.current) {
                const scrollbarElement = scrollbarRef.getScrollElement();

                if (
                    scrollbarElement.clientHeight <
                    focusedElementRef.current.offsetTop + focusedElementRef.current.clientHeight
                ) {
                    scrollbarElement.scrollTop =
                        focusedElementRef.current.offsetTop - focusedElementRef.current.clientHeight;
                }
            }
        }, [scrollbarRef]);

        const paperStyle = useMemo(() => {
            return { ...style, ...(maxWidth && { width: '100%', maxWidth }) } as const;
        }, [style, maxWidth]);

        return (
            <Paper {...other} className={clsx('MuiCustomPaperSimplebar', className)} style={paperStyle} ref={forwardedRef}>
                <MuiCustomSimplebar autoHide={false} style={{ maxHeight }} ref={setScrollbarRef} onFocus={handleFocus}>
                    {children}
                </MuiCustomSimplebar>
            </Paper>
        );
    }
);

import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { setRef } from '@mui/material';
import Simplebar, { Props as SimplebarProps } from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

export type MuiCustomSimplebarRef = Simplebar | null;

export interface MuiCustomSimplebarProps extends Omit<SimplebarProps, 'onScroll'> {
    scrollableNodeHandler?: (el: HTMLElement | null) => void;
    onScroll?: (ev: Event) => void;
}

export const MuiCustomSimplebar = React.forwardRef<MuiCustomSimplebarRef, MuiCustomSimplebarProps>(
    function MuiCustomSimplebar(props, forwardedRef) {
        const {
            children,
            className,
            autoHide = false,
            scrollbarMinSize = 50,
            scrollableNodeHandler,
            onScroll,
            ...other
        } = props;

        const [scrollbarRef, setScrollbarRef] = useState<HTMLElement | null>(null);
        const instanceRef = useRef<MuiCustomSimplebarRef>(null);

        const handleScroll = useCallback(
            (ev: Event) => {
                if (onScroll) {
                    onScroll(ev);
                }
            },
            [onScroll]
        );

        useEffect(() => {
            if (scrollableNodeHandler) {
                scrollableNodeHandler(scrollbarRef);
            }
        }, [scrollbarRef, scrollableNodeHandler]);

        useEffect(() => {
            if (instanceRef.current && forwardedRef) {
                setRef(forwardedRef, instanceRef.current);
            }
        }, [forwardedRef]);

        useEffect(() => {
            if (instanceRef.current) {
                const scrollEl = instanceRef.current.getScrollElement();

                scrollEl.addEventListener('scroll', handleScroll, false);

                return () => {
                    scrollEl.removeEventListener('scroll', handleScroll, false);
                };
            }

            return undefined;
        }, [scrollbarRef, handleScroll]);

        return (
            <Simplebar
                className={clsx('simplebar-custom', className)}
                autoHide={autoHide}
                scrollbarMinSize={scrollbarMinSize}
                scrollableNodeProps={{ ref: setScrollbarRef }}
                {...other}
                ref={instanceRef}
            >
                {children}
            </Simplebar>
        );
    }
);

import React from 'react';
import { setRef, useEventCallback } from '@mui/material';
import { MuiCustomSimplebar } from '../Simplebar';

export interface MuiCustomAutocompleteListProps extends React.ComponentPropsWithoutRef<'ul'> {
    maxHeight?: string;
}

export const MuiCustomAutocompleteList = React.forwardRef<HTMLDivElement, MuiCustomAutocompleteListProps>(
    function MuiCustomAutocompleteList(props, forwardedRef) {
        const { children, maxHeight: maxHeight, ...other } = props;

        const handleScrollbarRef = useEventCallback((node: HTMLElement | null) => {
            if (node) {
                // NOTE: This trick required to proper scrollbar positioning.
                // useAutocomplete: https://github.com/mui-org/material-ui/blob/5d390303f3d88c750bfb2199989d5aa068f8977e/packages/material-ui-unstyled/src/AutocompleteUnstyled/useAutocomplete.js#L323
                node.setAttribute('role', 'listbox');
                setRef(forwardedRef, node as HTMLDivElement);
            }
        });

        return (
            <MuiCustomSimplebar
                className="MuiCustomAutocomplete-simplebar"
                scrollableNodeHandler={handleScrollbarRef}
                style={{ ...(maxHeight && { maxHeight }) }}
            >
                <ul {...other} className="MuiList-root MuiList-padding MuiCustomAutocomplete-list">
                    {children}
                </ul>
            </MuiCustomSimplebar>
        );
    }
);

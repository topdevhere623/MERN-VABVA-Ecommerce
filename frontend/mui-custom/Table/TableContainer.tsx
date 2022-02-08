import React from 'react';
import { TableContainer, TableContainerProps } from '@mui/material';
import { MuiCustomPaperSimplebar, MuiCustomPaperSimplebarProps } from '../PaperSimplebar';

export interface MuiCustomTableContainerProps extends TableContainerProps {
    PaperProps?: MuiCustomPaperSimplebarProps;
}

export const MuiCustomTableContainer = React.forwardRef<HTMLDivElement, MuiCustomTableContainerProps>(
    function MuiCustomTableContainer(props, forwardedRef) {
        const { children, PaperProps: PaperPropsProp, ...other } = props;

        return (
            <MuiCustomPaperSimplebar {...PaperPropsProp} className="MuiCustomTablePaperSimplebar" ref={forwardedRef}>
                <TableContainer {...other}>{children}</TableContainer>
            </MuiCustomPaperSimplebar>
        );
    }
);

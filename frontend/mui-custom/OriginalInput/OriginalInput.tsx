import React from 'react';
import clsx from 'clsx';
import {
    InputBase as MuiInputBase,
    InputBaseProps as MuiInputBaseProps,
    InternalStandardProps as MuiInternalStandardProps
} from '@mui/material';

export type MuiCustomOriginalInputProps = MuiInternalStandardProps<MuiInputBaseProps>;

// The unknown type is required for compatibility with material-ui

export const MuiCustomOriginalInput = React.forwardRef<unknown, MuiCustomOriginalInputProps>(function MuiCustomOriginalInput(
    props,
    forwardedRef
) {
    const { className, ...other } = props as MuiCustomOriginalInputProps;

    return <MuiInputBase {...other} className={clsx('MuiCustomOriginalInput', className)} ref={forwardedRef} />;
});

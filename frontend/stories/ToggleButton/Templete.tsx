import React from 'react';
import {
    ToggleButton as MuiToggleButton,
    ToggleButtonProps as MuiToggleButtonProps,
    ToggleButtonGroup as MuiToggleButtonGroup,
    ToggleButtonGroupProps as MuiToggleButtonGroupProps
} from '@mui/material';

export type ToggleButtonProps = MuiToggleButtonProps;
export type ToggleButtonGroupProps = MuiToggleButtonGroupProps;

export const ToggleButton = (props: ToggleButtonProps) => {
    return <MuiToggleButton {...props} />;
};

export const ToggleButtonGroup = (props: ToggleButtonGroupProps) => {
    return <MuiToggleButtonGroup {...props} />;
};

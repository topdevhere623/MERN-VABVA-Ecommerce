import React from 'react';

import { Icon, InputAdornment } from '@mui/material';

import { MuiCustomTextField, MuiCustomTextFieldProps } from '~/mui-custom/TextField';
import { ChevronDownSvg, MapPinSvg } from '~/assets/svg-icons/feather';

export type SubHeaderLocationFieldProps = MuiCustomTextFieldProps;

export const SubHeaderLocationField = (props: SubHeaderLocationFieldProps) => {
    return (
        <MuiCustomTextField
            {...props}
            label="Location"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Icon>
                            <MapPinSvg />
                        </Icon>
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <Icon fontSize="small">
                            <ChevronDownSvg />
                        </Icon>
                    </InputAdornment>
                )
            }}
        />
    );
};

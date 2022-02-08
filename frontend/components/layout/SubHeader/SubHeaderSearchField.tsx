import React from 'react';

import { Icon, InputAdornment } from '@mui/material';

import { MuiCustomTextField, MuiCustomTextFieldProps } from '~/mui-custom/TextField';
import { SearchSvg } from '~/assets/svg-icons/feather';

export type SubHeaderSearchFieldProps = MuiCustomTextFieldProps;

export const SubHeaderSearchField = (props: SubHeaderSearchFieldProps) => {
    return (
        <MuiCustomTextField
            {...props}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Icon>
                            <SearchSvg />
                        </Icon>
                    </InputAdornment>
                )
            }}
        />
    );
};

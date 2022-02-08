import React from 'react';

import { Button, ButtonProps, Icon } from '@mui/material';

import { Menu1Svg } from '~/assets/svg-icons/feather';

export type SubHeaderCategoryMenuProps = ButtonProps;

export const SubHeaderCategoryMenu = (props: SubHeaderCategoryMenuProps) => {
    return (
        <Button
            {...props}
            variant="contained"
            color="primary"
            size="large"
            startIcon={
                <Icon fontSize="large">
                    <Menu1Svg />
                </Icon>
            }
        >
            Shop by category
        </Button>
    );
};

import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button, Icon, IconButton, Badge } from '@mui/material';

import { HeartSvg, MessageSquareSvg } from '~/assets/svg-icons/feather';

export default {
    title: 'mui-custom/Badge',
    component: Badge
} as Meta;

export const Default: Story = () => {
    return (
        <Badge badgeContent={5} color="primary">
            <IconButton className="MuiIconButton-dense">
                <Icon fontSize="large">
                    <HeartSvg />
                </Icon>
            </IconButton>
        </Badge>
    );
};

export const Exmaples = () => {
    return (
        <>
            <Badge badgeContent={500} color="primary" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Button color="inherit" startIcon={<MessageSquareSvg />}>
                    Messages
                </Button>
            </Badge>
        </>
    );
};

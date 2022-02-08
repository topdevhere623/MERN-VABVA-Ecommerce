import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Icon, Stack, Avatar } from '@mui/material';

import { FolderSvg } from '~/assets/svg-icons/feather';

export default {
    title: 'mui-custom/Avatar',
    component: Avatar
} as Meta;

export const Default: Story = () => {
    return <Avatar sx={{ width: 100, height: 100 }} />;
};

export const Examples = () => {
    return (
        <Stack direction="row" spacing={6}>
            <Avatar>A</Avatar>
            <Avatar variant="rounded">
                <Icon fontSize="large">
                    <FolderSvg />
                </Icon>
            </Avatar>
            <Avatar variant="circular" className="MuiAvatar-colorPrimary">
                <Icon fontSize="large">
                    <FolderSvg />
                </Icon>
            </Avatar>
            <Avatar variant="circular" className="MuiAvatar-colorSecondary">
                <Icon fontSize="large">
                    <FolderSvg />
                </Icon>
            </Avatar>
        </Stack>
    );
};

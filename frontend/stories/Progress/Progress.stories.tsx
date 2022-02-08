import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { CircularProgress, Stack } from '@mui/material';

export default {
    title: 'mui-custom/Progress',
    component: CircularProgress
} as Meta;

export const Circular: Story = () => {
    return (
        <Stack direction="column" spacing={10}>
            <CircularProgress color="inherit" thickness={2.6} />
            <CircularProgress color="primary" thickness={2.6} />
            <CircularProgress color="secondary" thickness={2.6} />
        </Stack>
    );
};

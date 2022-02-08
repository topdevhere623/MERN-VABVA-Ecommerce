import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import { Pagination, Stack } from '@mui/material';

export default {
    title: 'mui-custom/Pagination',
    component: Pagination
} as Meta;

export const Examples = () => {
    return (
        <Stack direction="column" spacing={10}>
            <Pagination count={10} defaultPage={6} shape="rounded" color="primary" />
        </Stack>
    );
};

import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import { FormControlLabel, Rating, Stack } from '@mui/material';

export default {
    title: 'mui-custom/Rating',
    component: Rating
} as Meta;

export const Examples = () => {
    return (
        <Stack direction="column" alignItems="stretch" spacing={10}>
            <Stack direction="column" alignItems="flex-start">
                <FormControlLabel
                    label="3.5"
                    labelPlacement="end"
                    control={<Rating defaultValue={3.5} precision={0.1} size="large" readOnly />}
                />
                <FormControlLabel
                    label="3.5"
                    labelPlacement="end"
                    control={<Rating defaultValue={3.5} precision={0.1} size="medium" readOnly />}
                />
                <FormControlLabel
                    label="3.5"
                    labelPlacement="end"
                    control={<Rating defaultValue={3.5} precision={0.1} size="small" readOnly />}
                />
            </Stack>
            <Stack direction="column" alignItems="flex-start">
                <Rating defaultValue={0} precision={0.1} size="large" />
                <Rating defaultValue={0} precision={0.1} size="medium" />
                <Rating defaultValue={0} precision={0.1} size="small" />
            </Stack>
        </Stack>
    );
};

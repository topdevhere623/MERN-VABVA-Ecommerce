import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Stack, Typography } from '@mui/material';

export default {
    component: Typography,
    title: 'mui-custom/Typography'
} as Meta;

export const Examples = () => {
    return (
        <Stack direction="column" alignItems="flex-start">
            <Typography variant="h1" gutterBottom>
                h1. Heading
            </Typography>
            <Typography variant="h2" gutterBottom>
                h2. Heading
            </Typography>
            <Typography variant="h3" gutterBottom>
                h3. Heading
            </Typography>
            <Typography variant="h4" gutterBottom>
                h4. Heading
            </Typography>
            <Typography variant="h5" gutterBottom>
                h5. Heading
            </Typography>
            <Typography variant="h6" gutterBottom>
                h6. Heading
            </Typography>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                    Phone number:
                </Typography>
                <span>345345345345345</span>
            </div>
            <Typography variant="subtitle2" gutterBottom>
                subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
            </Typography>
            <Typography variant="body1">
                body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam
                beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
                Eum quasi quidem quibusdam.
            </Typography>
            <Typography variant="body2">
                body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam
                beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
                Eum quasi quidem quibusdam.
            </Typography>
            <Typography variant="inherit">
                inherit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit,
                quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat
                deleniti? Eum quasi quidem quibusdam.
            </Typography>
            <Typography variant="overline">overline. Lorem ipsum dolor sit amet</Typography>

            <Typography variant="inherit">
                <Typography variant="subtitle1" gutterBottom>
                    Phone number:
                </Typography>
                353453453455
            </Typography>
        </Stack>
    );
};

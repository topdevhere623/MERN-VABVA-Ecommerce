import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { FormControlLabel, Stack, Switch, SwitchProps } from '@mui/material';

export default {
    title: 'mui-custom/Switch',
    component: Switch
} as Meta;

export const Default: Story<SwitchProps> = (args) => {
    return <Switch {...args} />;
};

Default.args = {} as SwitchProps;

export const Examples = () => {
    return (
        <div className="stack stack--direction-column stack--justify-items-stretch stack--gap-8">
            <div className="stack stack--gap-8">
                <div className="stack stack--direction-column stack--gap-4">
                    <Default color="default" defaultChecked />
                    <Default color="primary" defaultChecked />
                    <Default color="secondary" defaultChecked />
                </div>
                <div className="stack stack--direction-column stack--gap-4">
                    <Default color="default" defaultChecked disabled />
                    <Default color="primary" defaultChecked disabled />
                    <Default color="secondary" defaultChecked disabled />
                </div>
            </div>
            <div className="stack stack--direction-column stack--gap-4">
                <Default color="default" size="small" defaultChecked />
                <Default color="primary" size="small" defaultChecked />
                <Default color="secondary" size="small" defaultChecked />
            </div>
        </div>
    );
};

export const FormControlLabelStory: Story = () => {
    return (
        <Stack direction="column" alignItems="flex-start" spacing={8}>
            <FormControlLabel label="Label" labelPlacement="end" control={<Switch />} />
            <FormControlLabel label="Label" labelPlacement="start" control={<Switch />} />
            <Stack direction="row" justifyContent="flex-start" flexWrap="wrap" gap={8}>
                <FormControlLabel label="Label" labelPlacement="end" control={<Switch />} />
                <FormControlLabel label="Label" labelPlacement="end" control={<Switch />} />
                <FormControlLabel label="Label" labelPlacement="end" control={<Switch />} />
                <FormControlLabel label="Label" labelPlacement="end" control={<Switch />} />
            </Stack>
            <Stack direction="column" spacing={8}>
                <FormControlLabel label="Label" labelPlacement="end" control={<Switch />} />
                <FormControlLabel label="Label" labelPlacement="end" control={<Switch />} />
                <FormControlLabel label="Label" labelPlacement="end" control={<Switch />} />
                <FormControlLabel label="Label" labelPlacement="end" control={<Switch />} />
            </Stack>
        </Stack>
    );
};

FormControlLabelStory.storyName = 'Form Control Label';

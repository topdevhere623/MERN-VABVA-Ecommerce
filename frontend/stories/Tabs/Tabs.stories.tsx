import React, { useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';

import { Tabs, Tab, Badge, useEventCallback } from '@mui/material';

export default {
    title: 'mui-custom/Tabs',
    component: Tabs
} as Meta;

export const Examples = () => {
    const [value, setValue] = useState('ongoing');

    const handleTabsChange = useEventCallback((ev, newValue: string) => {
        setValue(newValue);
    });

    return (
        <Tabs value={value} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile onChange={handleTabsChange}>
            <Tab value="ongoing" label="On-Going Orders" />
            <Tab value="past" label="Past Orders" />
            <Tab value="subscriptios" label="Subscriptions" />
        </Tabs>
    );
};

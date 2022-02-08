import React, { useState } from 'react';

import { Tab, Tabs, useEventCallback } from '@mui/material';

import { NextCustomPageHead } from '~/next-custom/PageHead';
import { PageLayout } from '~/components/layout/PageLayout';
import { OnGoingOrdersTable } from './OnGoingOrders';

export const SiteUserOrdersPage = () => {
    const [value, setValue] = useState('ongoing');

    const handleTabsChange = useEventCallback((ev, newValue: string) => {
        setValue(newValue);
    });

    return (
        <PageLayout>
            <NextCustomPageHead title="Orders" description="Your orders" />

            <Tabs
                value={value}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                onChange={handleTabsChange}
            >
                <Tab value="ongoing" label="On-Going Orders" />
                <Tab value="past" label="Past Orders" />
                <Tab value="subscriptios" label="Subscriptions" />
            </Tabs>
            <OnGoingOrdersTable />
        </PageLayout>
    );
};

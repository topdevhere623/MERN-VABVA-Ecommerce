import React, { useState } from 'react';

import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
    CustomAddressesSvg,
    CustomMessagesSvg,
    CustomOrdersSvg,
    CustomPaymentsSvg,
    CustomReferralsSvg,
    CustomSecuritySvg
} from '~/assets/svg-icons/custom';

export const MainMenuList = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <List className="main-menu-list">
            <ListItemButton
                selected={selectedIndex === 0}
                className="main-menu-list__btn"
                onClick={() => setSelectedIndex(0)}
            >
                <ListItemIcon>
                    <CustomOrdersSvg />
                </ListItemIcon>
                <ListItemText primary="Your orders" secondary="Information about your orders" disableTypography={false} />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 1}
                className="main-menu-list__btn"
                onClick={() => setSelectedIndex(1)}
            >
                <ListItemIcon>
                    <CustomSecuritySvg />
                </ListItemIcon>
                <ListItemText
                    primary="Login & Security"
                    secondary="Change name, contact info, security settings"
                    disableTypography={false}
                />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 2}
                className="main-menu-list__btn"
                onClick={() => setSelectedIndex(2)}
            >
                <ListItemIcon>
                    <CustomAddressesSvg />
                </ListItemIcon>
                <ListItemText primary="Your Addresses" secondary="Add or edit your addresses" disableTypography={false} />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 3}
                className="main-menu-list__btn"
                onClick={() => setSelectedIndex(3)}
            >
                <ListItemIcon>
                    <CustomReferralsSvg />
                </ListItemIcon>
                <ListItemText
                    primary="Referrals"
                    secondary="Analytics, earnings and you referral code"
                    disableTypography={false}
                />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 4}
                className="main-menu-list__btn"
                onClick={() => setSelectedIndex(4)}
            >
                <ListItemIcon>
                    <CustomPaymentsSvg />
                </ListItemIcon>
                <ListItemText primary="Your payments" secondary="Manage your payment methods" disableTypography={false} />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 5}
                className="main-menu-list__btn"
                onClick={() => setSelectedIndex(5)}
            >
                <ListItemIcon>
                    <CustomMessagesSvg />
                </ListItemIcon>
                <ListItemText
                    primary="Message center"
                    secondary="Your messages and notifications"
                    disableTypography={false}
                />
            </ListItemButton>
        </List>
    );
};

import React from 'react';

import { Button, Icon, Menu, MenuItem, Divider } from '@mui/material';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';

import PersonRounded from '@mui/icons-material/PersonRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';

export const HeaderUserDropdown = () => {
    const popupState = usePopupState({ popupId: 'profile-menu', variant: 'popover' });

    return (
        <>
            <Button
                {...bindTrigger(popupState)}
                variant="text"
                color="inherit"
                className="header__actions-btn"
                sx={{ maxWidth: '18rem' }}
                startIcon={
                    <Icon fontSize="large">
                        <PersonRounded />
                    </Icon>
                }
                endIcon={
                    <Icon fontSize="small">
                        <KeyboardArrowDownRounded />
                    </Icon>
                }
            >
                <span className="u-text-truncate">John Doe</span>
            </Button>
            <Menu
                {...bindMenu(popupState)}
                PaperProps={{ sx: { minWidth: '18rem' } }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                onClick={popupState.close}
            >
                <MenuItem>Orders</MenuItem>
                <MenuItem>Messages</MenuItem>
                <MenuItem>Settings</MenuItem>
                <Divider />
                <MenuItem>Sign Out</MenuItem>
            </Menu>
        </>
    );
};

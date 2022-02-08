import React, { useCallback, useMemo, useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import _throttle from 'lodash/throttle';

import {
    IconButton,
    Icon,
    Avatar,
    Popover,
    Fade,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Divider,
    MenuList,
    useEventCallback
} from '@mui/material';
import { BorderClear, KeyboardArrowRight } from '@mui/icons-material';
import { MoreVerticalSvg, UserSvg } from '~/assets/svg-icons/feather';

export default {
    title: 'mui-custom/Popover',
    component: Popover
} as Meta;

export const MouseHoverExample = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
    const [open, setOpen] = useState(false);

    const handleMouseEnter = useMemo(() => {
        return _throttle(
            () => {
                setOpen(true);
            },
            166,
            { leading: true, trailing: false }
        );
    }, []);

    const handleMouseLeave = useEventCallback(() => {
        setOpen(false);
    });

    return (
        <>
            <IconButton
                className="MuiIconButton-dense MuiIconButton-circular"
                style={{ marginLeft: '10rem' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={setAnchorEl}
            >
                <Avatar variant="circular" className="MuiAvatar-colorPrimary">
                    <Icon fontSize="large">
                        <UserSvg />
                    </Icon>
                </Avatar>
            </IconButton>

            <Popover
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                elevation={8}
                TransitionComponent={Fade}
                sx={{
                    pointerEvents: 'none',
                    margin: '1rem'
                }}
                PaperProps={{ sx: { width: '100%', maxWidth: '30rem', padding: '1.6rem' } }}
            >
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed ducimus natus tempore! Repellendus ea odio vero
                quaerat numquam optio voluptas neque reiciendis, veritatis accusantium facere provident ipsum. Ratione,
                numquam fugit!
            </Popover>
        </>
    );
};

interface Example2SubmenusState {
    [key: string]: {
        position: {
            left: number;
            top: number;
        };
    };
}

export const SimpleNestedMenu = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);
    const [submenus, setSubmenus] = useState<Example2SubmenusState>();

    const handleOpenMenu = useCallback(() => {
        setOpen(true);
    }, []);

    const handleMenuClose = useCallback(() => {
        setOpen(false);
        setSubmenus(undefined);
    }, []);

    const handleShowSubmenu = (name: string) => (ev: React.MouseEvent<HTMLDivElement>) => {
        const target = ev.currentTarget;

        if (target) {
            const { x, y, width } = target.getBoundingClientRect();

            const left = x + width;

            setSubmenus((prevState) => {
                return { ...prevState, [name]: { position: { left, top: y } } };
            });
        }
    };

    const handleHideSubmenu = (name: string) => () => {
        setSubmenus((prevState) => {
            const newState = { ...prevState };

            delete newState[name];

            return newState;
        });
    };

    const getSubmenu = useCallback(
        (name: string) => {
            return submenus ? submenus[name] : null;
        },
        [submenus]
    );

    // Render

    const renderLayerSubmenu = useMemo(() => {
        const submenu = getSubmenu('layer');

        if (!submenu) {
            return null;
        }

        return (
            <Popover
                open
                anchorReference="anchorPosition"
                anchorPosition={submenu.position}
                TransitionComponent={Fade}
                elevation={4}
                onClose={handleHideSubmenu('layer')}
            >
                <MenuList autoFocusItem onClick={handleMenuClose}>
                    <ListItemButton>
                        <ListItemText>Rectangle 100</ListItemText>
                        <ListItemIcon>
                            <BorderClear />
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText>Rectangle 101</ListItemText>
                        <ListItemIcon>
                            <BorderClear />
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText>Rectangle 102</ListItemText>
                        <ListItemIcon>
                            <BorderClear />
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText>Rectangle 103</ListItemText>
                        <ListItemIcon>
                            <BorderClear />
                        </ListItemIcon>
                    </ListItemButton>
                </MenuList>
            </Popover>
        );
    }, [getSubmenu, handleMenuClose]);

    const renderCopySubmenu = useMemo(() => {
        const submenu = getSubmenu('copy');

        if (!submenu) {
            return null;
        }

        return (
            <Popover
                open
                anchorReference="anchorPosition"
                anchorPosition={submenu.position}
                elevation={4}
                TransitionComponent={Fade}
                onClose={handleHideSubmenu('copy')}
            >
                <MenuList autoFocusItem onClick={handleMenuClose}>
                    <ListItemButton>
                        <ListItemText>Copy as CSS</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText>Copy as SVG</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText>Copy as PNG</ListItemText>
                    </ListItemButton>
                </MenuList>
            </Popover>
        );
    }, [getSubmenu, handleMenuClose]);

    return (
        <>
            <IconButton ref={setAnchorEl} onClick={handleOpenMenu}>
                <Icon fontSize="large">
                    <MoreVerticalSvg />
                </Icon>
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                TransitionProps={{ exit: false }}
                elevation={4}
                onClose={handleMenuClose}
            >
                <MenuList autoFocusItem>
                    <ListItemButton onClick={handleShowSubmenu('layer')}>
                        <ListItemText>Select layer</ListItemText>
                        <ListItemIcon>
                            <KeyboardArrowRight />
                        </ListItemIcon>
                    </ListItemButton>
                    <Divider className="u-margin-y-4" />
                    <ListItemButton onClick={handleShowSubmenu('copy')}>
                        <ListItemText>Copy</ListItemText>
                        <ListItemIcon>
                            <KeyboardArrowRight />
                        </ListItemIcon>
                    </ListItemButton>
                </MenuList>
            </Popover>

            {renderLayerSubmenu}
            {renderCopySubmenu}
        </>
    );
};

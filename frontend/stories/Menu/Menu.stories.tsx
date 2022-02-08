import React, { useCallback, useMemo, useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';

import {
    Avatar,
    Button,
    Divider,
    Fade,
    Icon,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Popover,
    Tooltip,
    useEventCallback
} from '@mui/material';
import { usePopupState, bindTrigger, bindMenu, bindToggle, bindPopper } from 'material-ui-popup-state/hooks';
import { AccountCircleRounded, Check, ColorLensOutlined, KeyboardArrowDown, Sort } from '@mui/icons-material';

import { MuiCustomMenu, MuiCustomSubMenu } from '~/mui-custom/Menu';
import { MuiCustomColorList } from '~/mui-custom/ColorList';
import { MuiCustomPaperSimplebar, MuiCustomPaperSimplebarProps } from '~/mui-custom/PaperSimplebar';

import { CopySvg, Edit2Svg, Trash2Svg } from '~/assets/svg-icons/feather';
import { FacebookSettingLinkedList } from '../List/Template';

export default {
    title: 'mui-custom/Menu',
    component: Menu
} as Meta;

export const Basic = () => {
    const popupState = usePopupState({ variant: 'popover', popupId: 'basicMenu' });

    return (
        <>
            <Button
                variant="outlined"
                color="inherit"
                endIcon={
                    <Icon fontSize="xsmall">
                        <KeyboardArrowDown />
                    </Icon>
                }
                {...bindTrigger(popupState)}
            >
                Basic menu
            </Button>
            <Menu {...bindMenu(popupState)} onClick={popupState.close}>
                <MenuItem>
                    <ListItemIcon>
                        <Icon fontSize="xsmall">
                            <Edit2Svg />
                        </Icon>
                    </ListItemIcon>
                    Edit
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Icon fontSize="xsmall">
                            <CopySvg />
                        </Icon>
                    </ListItemIcon>
                    Copy
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Icon fontSize="xsmall" color="error">
                            <Trash2Svg />
                        </Icon>
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
};

interface SelectedMenuOption {
    name: string;
}

const selectedMenuOptions: SelectedMenuOption[] = [
    { name: 'Relevance' },
    { name: 'Price up' },
    { name: 'Price down' },
    { name: 'Brand new' },
    { name: 'Top seller' },
    { name: 'Name' }
];

export const SelectedMenu = () => {
    const popupState = usePopupState({ variant: 'popover', popupId: 'selectedMenu' });
    const [selectedOption, setSelectedOption] = useState<SelectedMenuOption | undefined>();

    const handlePopupClose = useEventCallback(() => {
        popupState.close();
    });

    // Render

    const buttonText = useMemo<string>(() => {
        const foundOption = selectedMenuOptions.find((option) => selectedOption && option.name === selectedOption.name);

        return (foundOption && foundOption.name) || 'Sort By';
    }, [selectedOption]);

    const items = useMemo(() => {
        return selectedMenuOptions.map((option) => {
            const { name } = option;
            const key = name.replace(/\s+/g, '-');
            const selected = selectedOption && selectedOption.name === name;

            const handleMenuItemSelect = (opt: SelectedMenuOption) => () => {
                setSelectedOption(opt);
                handlePopupClose();
            };

            return (
                <MenuItem key={key} selected={selected} onClick={handleMenuItemSelect(option)}>
                    {selected ? (
                        <>
                            <ListItemText>
                                <span className="u-text-strong u-text-primary">{name}</span>
                            </ListItemText>
                            <ListItemIcon sx={{ flex: 'none' }}>
                                <Icon color="primary" fontSize="medium">
                                    <Check />
                                </Icon>
                            </ListItemIcon>
                        </>
                    ) : (
                        <ListItemText>{name}</ListItemText>
                    )}
                </MenuItem>
            );
        });
    }, [selectedOption, handlePopupClose]);

    const menuPaperProps = useMemo<MuiCustomPaperSimplebarProps>(() => {
        return {
            component: MuiCustomPaperSimplebar,
            maxWidth: '24rem'
        };
    }, []);

    return (
        <>
            <Button
                variant="text"
                color="inherit"
                startIcon={
                    <Icon fontSize="large">
                        <Sort />
                    </Icon>
                }
                endIcon={
                    <Icon fontSize="xsmall">
                        <KeyboardArrowDown />
                    </Icon>
                }
                style={{ minWidth: '20rem' }}
                className="MuiButton-justifyStart"
                {...bindTrigger(popupState)}
            >
                <span className="u-text-strong">{buttonText}</span>
            </Button>
            <Menu PaperProps={menuPaperProps} {...bindMenu(popupState)}>
                {items}
            </Menu>
        </>
    );
};

export const NestedMenu = () => {
    const popupState = usePopupState({ variant: 'popper', popupId: 'nestedMenu' });
    const [selectedColor, setSelectedColor] = useState<string>();

    const handleClose = useCallback(() => {
        popupState.close();
    }, [popupState]);

    const handleSelectColor = useEventCallback((color?: string) => {
        setSelectedColor(color);
    });

    return (
        <div>
            <Button
                {...bindToggle(popupState)}
                variant="text"
                color="inherit"
                endIcon={
                    <Icon fontSize="xsmall">
                        <KeyboardArrowDown />
                    </Icon>
                }
            >
                Nested menu
            </Button>
            <MuiCustomMenu {...bindPopper(popupState)} onClose={handleClose} onClick={handleClose}>
                <MuiCustomSubMenu
                    title={
                        <>
                            <ListItemIcon>
                                <Icon fontSize="medium">
                                    <ColorLensOutlined />
                                </Icon>
                            </ListItemIcon>
                            <ListItemText>Change color</ListItemText>
                        </>
                    }
                    MenuListProps={{
                        MenuListComponent: <MuiCustomColorList selected={selectedColor} onSelect={handleSelectColor} />
                    }}
                />
                <Divider variant="middle" />
                <MuiCustomSubMenu
                    title="Switch Group"
                    MenuListProps={{
                        PaperProps: { sx: { width: '100%', maxWidth: '30rem' } }
                    }}
                >
                    <MenuItem>Group 1</MenuItem>
                    <MenuItem>Group 2</MenuItem>
                    <MenuItem disabled>Group 3</MenuItem>
                    <MenuItem disabled>Group 4</MenuItem>
                    <Divider variant="middle" />
                    <MenuItem>Next Group</MenuItem>
                    <MenuItem>Previous Group</MenuItem>
                    <Divider variant="middle" />
                    <MenuItem>
                        <ListItemText>Group Left</ListItemText>
                        <ListItemText sx={{ flex: 'none' }}>
                            <span className="u-text-note u-text-small">Ctrl+K Ctrl+LeftArrow</span>
                        </ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemText>Group Right</ListItemText>
                        <ListItemText sx={{ flex: 'none' }}>
                            <span className="u-text-note u-text-small">Ctrl+K Ctrl+RightArrow</span>
                        </ListItemText>
                    </MenuItem>
                </MuiCustomSubMenu>
                <MenuItem>Go to File...</MenuItem>
                <MenuItem>Go to Symbol in Workspace...</MenuItem>
            </MuiCustomMenu>
        </div>
    );
};

export const FacebookProfileMenu = () => {
    const popupState = usePopupState({ variant: 'popover', popupId: 'facebookProfileMenu' });

    const paperProps = useMemo<MuiCustomPaperSimplebarProps>(() => {
        return {
            component: MuiCustomPaperSimplebar,
            maxWidth: '40rem',
            elevation: 4
        };
    }, []);

    return (
        <div
            style={{
                height: '80rem'
            }}
        >
            <div className="stack stack--justify-end stack--gap-10">
                <Button variant="outlined" color="inherit" disabled>
                    Link 1
                </Button>
                <Button variant="outlined" color="inherit" disabled>
                    Link 2
                </Button>
                <Tooltip title="Account setting" disableFocusListener>
                    <IconButton {...bindToggle(popupState)} className="MuiIconButton-circular MuiIconButton-dense">
                        <Avatar>
                            <AccountCircleRounded fontSize="large" />
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </div>
            <Popover
                {...bindMenu(popupState)}
                TransitionComponent={Fade}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={paperProps}
            >
                <FacebookSettingLinkedList />
            </Popover>
        </div>
    );
};

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import * as yup from 'yup';
import {
    areEqual,
    FixedSizeList as VirtualizedFixiedSizeList,
    ListChildComponentProps as VirtualizedChildComponentProps
} from 'react-window';

import VirtualizedAutoSizer from 'react-virtualized-auto-sizer';

import {
    ListItem,
    ListItemButton,
    ListItemButtonProps,
    ListItemText,
    ListItemIcon,
    ListSubheader,
    ListItemAvatar,
    Icon,
    Divider,
    Button,
    IconButton,
    Checkbox,
    Tooltip,
    Box,
    Avatar,
    Badge,
    Collapse,
    Paper,
    List,
    useEventCallback
} from '@mui/material';

import {
    AccessTimeRounded,
    ApartmentRounded,
    BarChartRounded,
    ChatBubbleOutlineRounded,
    FolderOpenRounded,
    GroupsRounded,
    HelpOutlineRounded,
    InsertDriveFileOutlined,
    KeyboardArrowDownRounded,
    KeyboardArrowUpRounded,
    LocalOfferRounded,
    PeopleAltRounded,
    SettingsRounded
} from '@mui/icons-material';
import { MuiCustomSimplebar, MuiCustomSimplebarRef } from '~/mui-custom/Simplebar';
import { MuiCustomColorList } from '~/mui-custom/ColorList';

import { FacebookSettingLinkedList } from './Template';
import {
    InboxSvg,
    Trash2Svg,
    CheckSvg,
    MapPinSvg,
    ChevronDownSvg,
    ChevronUpSvg,
    FileTextSvg,
    LockSvg,
    ShoppingBagSvg,
    MapSvg,
    MessageSquareSvg,
    DollarSignSvg,
    TrendingUpSvg,
    PackageSvg,
    HeartSvg
} from '~/assets/svg-icons/feather';

import './navigation-list.scss';
import './nested-navigation-list.scss';

import countriesRawData from '../assets/data/countries.json';

export default {
    title: 'mui-custom/List',
    component: List
} as Meta;

// Default

export const Default: Story = () => {
    return (
        <>
            <Button
                color="inherit"
                size="medium"
                variant="contained"
                startIcon={
                    <Icon>
                        <InboxSvg />
                    </Icon>
                }
            >
                Add Item
            </Button>
            <br />
            <Button
                color="inherit"
                size="medium"
                variant="text"
                startIcon={
                    <Icon>
                        <InboxSvg />
                    </Icon>
                }
                className="u-margin-t-4"
            >
                Add Item
            </Button>
            <Divider className="u-margin-t-4" />
            <div style={{ width: '100%', maxWidth: '36rem' }}>
                <List>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icon>
                                <InboxSvg />
                            </Icon>
                        </ListItemIcon>
                        <ListItemText>Inbox</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <InsertDriveFileOutlined />
                        </ListItemIcon>
                        <ListItemText>Drafts</ListItemText>
                    </ListItemButton>
                </List>
                <Divider />
                <List>
                    <ListItem
                        disablePadding
                        secondaryAction={
                            <IconButton edge="end">
                                <Icon fontSize="large">
                                    <Trash2Svg />
                                </Icon>
                            </IconButton>
                        }
                    >
                        <ListItemButton>
                            <ListItemText inset>Social</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        secondaryAction={
                            <IconButton edge="end">
                                <Icon fontSize="large">
                                    <Trash2Svg />
                                </Icon>
                            </IconButton>
                        }
                    >
                        <ListItemButton>
                            <ListItemText inset>Updates</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icon>
                                <CheckSvg />
                            </Icon>
                        </ListItemIcon>
                        <ListItemText>Rules</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText inset>Layout</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText inset>Computed</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText inset>Changes</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText inset>Fonts</ListItemText>
                    </ListItemButton>
                </List>
                <Divider />
                <List>
                    <ListItemButton alignItems="flex-start">
                        <ListItemText>Lorem ipsum dolor sit amet consectetur adipisicing elit.</ListItemText>
                        <ListItemText sx={{ flex: 'none', fontWeight: 500 }}>100</ListItemText>
                    </ListItemButton>
                    <ListItemButton alignItems="flex-start">
                        <ListItemText className="u-text-truncate">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </ListItemText>
                        <ListItemText sx={{ flex: 'none', fontWeight: 500 }}>100</ListItemText>
                        <ListItemText sx={{ flex: 'none', fontWeight: 500 }}>100</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText>Lorem ipsum</ListItemText>
                        <ListItemText sx={{ flex: 'none', fontWeight: 500 }}>100</ListItemText>
                    </ListItemButton>
                </List>
            </div>
        </>
    );
};

// Locations list

interface NearbyLoacaions {
    towns: Array<{
        name: string;
    }>;
    cities: Array<{
        name: string;
    }>;
}

const nearbyLoacations: NearbyLoacaions = {
    towns: [
        {
            name: 'Barbican'
        },
        {
            name: 'Aldgate'
        },
        {
            name: 'Tower Hill'
        },
        {
            name: 'Blackfriars'
        },
        {
            name: 'Temple'
        },
        {
            name: 'Southbury'
        },
        {
            name: 'Bush Hill Park'
        },
        {
            name: 'Enfield Town'
        },
        {
            name: 'Forty Hill'
        }
    ],
    cities: [
        {
            name: 'Abbey Hey, Greater Manchester'
        },
        {
            name: 'Aberbargoed / Aberbargod, Gwent'
        },
        {
            name: 'Aberangell, Gwynedd'
        },
        {
            name: 'Abbotstone, Hampshire'
        },
        {
            name: 'Abbey Dore, Herefordshire'
        },
        {
            name: 'Abbots Langley, Hertfordshire'
        },
        {
            name: 'Aberarder, Inverness'
        },
        {
            name: 'Agneash, Isle of Man'
        }
    ]
};

export const LocationsList = () => {
    const [scrollbarRef, setScrollbarRef] = useState<MuiCustomSimplebarRef>(null);

    const changeScrollPostion = useCallback(
        (offset: number) => {
            if (scrollbarRef) {
                const scrolledElement = scrollbarRef.getScrollElement();
                const topPos = scrolledElement.scrollTop;

                scrolledElement.scrollTop = topPos + offset;
            }
        },
        [scrollbarRef]
    );

    const handleScrollDown = useCallback(() => {
        changeScrollPostion(15);
    }, [changeScrollPostion]);

    const handleScrollUp = useCallback(() => {
        changeScrollPostion(-15);
    }, [changeScrollPostion]);

    const renderListItems = (text: string, index: number): React.ReactElement => {
        return (
            <ListItemButton key={index}>
                <ListItemIcon>
                    <Icon fontSize="xsmall">
                        <MapPinSvg />
                    </Icon>
                </ListItemIcon>
                <ListItemText>{text}</ListItemText>
            </ListItemButton>
        );
    };

    return (
        <>
            <MuiCustomSimplebar
                ref={setScrollbarRef}
                autoHide={false}
                style={{ width: '100%', maxWidth: '36rem', height: '32rem' }}
            >
                <List disablePadding subheader={<ListSubheader>Nearby towns</ListSubheader>}>
                    {nearbyLoacations.towns.map((item, index) => renderListItems(item.name, index))}
                </List>
                <List disablePadding subheader={<ListSubheader>Other locations</ListSubheader>}>
                    {nearbyLoacations.cities.map((item, index) => renderListItems(item.name, index))}
                </List>
            </MuiCustomSimplebar>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', maxWidth: '36rem' }}>
                <Tooltip title="Scroll to bottom">
                    <IconButton onClick={handleScrollDown}>
                        <Icon>
                            <ChevronDownSvg />
                        </Icon>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Scroll to top">
                    <IconButton onClick={handleScrollUp}>
                        <Icon>
                            <ChevronUpSvg />
                        </Icon>
                    </IconButton>
                </Tooltip>
            </Box>
        </>
    );
};

// Multiselect list

const multiselectItems = Array.from({ length: 18 }).map((_, index) => {
    return `List item ${index + 1}`;
});

export const MultiselectList = () => {
    const [selected, setSelected] = useState<number[]>([]);
    const [expanded, setExpanded] = useState(false);

    const handleExpandedItemClick = useCallback(() => {
        setExpanded((prevState) => !prevState);
    }, []);

    const handleItemClick = (index: number) => () => {
        setSelected((prevState) => {
            const existedIndex = prevState.indexOf(index);

            if (existedIndex !== -1) {
                return prevState.filter((item) => item !== index);
            }

            return [...prevState, index];
        });
    };

    const limit = expanded ? multiselectItems.length : 8;

    const renderItem = useCallback(
        (text: string, index: number): React.ReactElement => {
            const isSelected = selected.indexOf(index) !== -1;

            return (
                <ListItemButton key={index} selected={isSelected} onClick={handleItemClick(index)}>
                    <ListItemIcon>
                        <Checkbox checked={isSelected} tabIndex={-1} className="MuiCheckbox-dense" />
                    </ListItemIcon>
                    <ListItemText>{text}</ListItemText>
                </ListItemButton>
            );
        },
        [selected]
    );

    const expandedListItem = useMemo(() => {
        return (
            <ListItemButton onClick={handleExpandedItemClick}>
                <ListItemIcon>
                    <Icon>{expanded ? <ChevronUpSvg /> : <ChevronDownSvg />}</Icon>
                </ListItemIcon>
                <ListItemText>{expanded ? 'Show less' : 'Show more'}</ListItemText>
            </ListItemButton>
        );
    }, [expanded, handleExpandedItemClick]);

    return (
        <List>
            {multiselectItems.slice(0, limit).map((item, index) => {
                return renderItem(item, index);
            })}
            {expandedListItem}
        </List>
    );
};

// Virtualized list

const countiesSchema = yup
    .array(
        yup.object().shape({
            code: yup.string().optional(),
            label: yup.string().optional(),
            phone: yup.string().optional()
        })
    )
    .defined();

type CountryItems = yup.Asserts<typeof countiesSchema>;

type VirtualizedItemDataProps = {
    items?: Readonly<CountryItems>;
    selected: number[];
    onSelect: (index: number) => void;
};

interface VirtualizedListItemProps extends VirtualizedChildComponentProps {
    data: Readonly<VirtualizedItemDataProps>;
}

const VirtualizedListItem = React.memo((props: VirtualizedListItemProps) => {
    const { data, style, index } = props;
    const { items = [], selected, onSelect } = data;
    const { code, label, phone } = items[index] || {};
    const checked = selected.indexOf(index) !== -1;

    const handleCheckboxChange = useCallback(() => {
        onSelect(index);
    }, [index, onSelect]);

    return (
        <ListItem style={style}>
            <ListItemIcon>
                <Checkbox checked={checked} className="MuiCheckbox-dense" onChange={handleCheckboxChange} />
            </ListItemIcon>
            <ListItemText style={{ flex: 'none' }}>{code}</ListItemText>
            <ListItemText>{label}</ListItemText>
            <ListItemText style={{ flex: 'none' }}>{phone}</ListItemText>
        </ListItem>
    );
}, areEqual);

export const VirtualizedList = () => {
    const [items, setItems] = useState<CountryItems>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const listRef = useRef<VirtualizedFixiedSizeList>(null);

    const handleScroll = useCallback((ev: Event) => {
        const target = ev.target as HTMLElement;

        if (listRef.current) {
            listRef.current.scrollTo(target.scrollTop);
        }
    }, []);

    const handleSelect = useCallback((index: number) => {
        setSelected((prevState) => {
            const existedIndex = prevState.indexOf(index);

            if (existedIndex !== -1) {
                return prevState.filter((item) => item !== index);
            }

            return [...prevState, index];
        });
    }, []);

    const validateItems = async () => {
        try {
            const validItems = await countiesSchema.validate(countriesRawData);

            setItems(validItems);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        validateItems();
    }, []);

    const itemData = useMemo<VirtualizedItemDataProps>(
        () => ({
            items,
            selected,
            onSelect: handleSelect
        }),
        [items, selected, handleSelect]
    );

    if (items.length === 0) {
        return null;
    }

    return (
        <VirtualizedAutoSizer style={{ width: '36rem', height: '32rem' }}>
            {({ height }) => {
                return (
                    <MuiCustomSimplebar style={{ height }} onScroll={handleScroll}>
                        <VirtualizedFixiedSizeList
                            ref={listRef}
                            width="100%"
                            height={height}
                            itemCount={items.length}
                            itemSize={40}
                            itemData={itemData}
                            style={{ overflow: 'initial' }}
                        >
                            {VirtualizedListItem}
                        </VirtualizedFixiedSizeList>
                    </MuiCustomSimplebar>
                );
            }}
        </VirtualizedAutoSizer>
    );
};

// Navigation list

export const NavigationList = () => {
    const [selected, setSelected] = useState('orders');

    const handleSelect = (name: string) => () => {
        setSelected(name);
    };

    const getItemProps = (name: string): ListItemButtonProps => {
        return {
            selected: selected === name,
            onClick: handleSelect(name)
        };
    };

    return (
        <>
            <div style={{ width: '100%', maxWidth: '36rem' }}>
                <List className="navigation-list">
                    <ListItemButton {...getItemProps('profile')} className="navigation-list__user">
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText
                            disableTypography={false}
                            primary="Podoprigora Alexandr"
                            secondary="podoprigoraisv@gmail.com"
                            className="u-text-truncate"
                        />
                    </ListItemButton>
                </List>
                <Divider />
                <List className="navigation-list">
                    <ListItemButton {...getItemProps('orders')} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar>
                                <Icon fontSize="large">
                                    <ShoppingBagSvg />
                                </Icon>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            disableTypography={false}
                            primary="Your orders"
                            secondary="Information about your orders"
                        />
                    </ListItemButton>
                    <ListItemButton {...getItemProps('wishlist')} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar>
                                <Icon fontSize="large">
                                    <HeartSvg />
                                </Icon>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            disableTypography={false}
                            primary="Wishlist"
                            secondary="Information about your favorite products"
                        />
                        <ListItemText className="MuiListItemBadge">
                            <Badge badgeContent={5} color="secondary" />
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton {...getItemProps('security')} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar variant="circular">
                                <Icon fontSize="large">
                                    <LockSvg />
                                </Icon>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            disableTypography={false}
                            primary="Login & Security"
                            secondary="Change name, contact info, security settings"
                        />
                    </ListItemButton>
                    <ListItemButton {...getItemProps('addresses')} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar>
                                <Icon fontSize="large">
                                    <FileTextSvg />
                                </Icon>
                            </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                            disableTypography={false}
                            primary="Your addresses"
                            secondary="Add or edit your addresses"
                        />
                    </ListItemButton>
                    <ListItemButton {...getItemProps('locations')} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar>
                                <Icon fontSize="large">
                                    <MapSvg />
                                </Icon>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            disableTypography={false}
                            primary="Locations"
                            secondary="Add or edit your business locations"
                        />
                    </ListItemButton>
                    <ListItemButton {...getItemProps('products')} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar>
                                <Icon fontSize="large">
                                    <PackageSvg />
                                </Icon>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            disableTypography={false}
                            primary="Products"
                            secondary="Create products and services"
                        />
                    </ListItemButton>
                    <ListItemButton {...getItemProps('messages')} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar>
                                <Icon fontSize="large">
                                    <MessageSquareSvg />
                                </Icon>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            disableTypography={false}
                            primary="Message center"
                            secondary="Your messages and notifications"
                        />
                        <ListItemText className="MuiListItemBadge">
                            <Badge badgeContent={100} color="secondary" />
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton {...getItemProps('finances')} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar>
                                <Icon fontSize="large">
                                    <DollarSignSvg />
                                </Icon>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            disableTypography={false}
                            primary="Finances"
                            secondary="Manage your finances & payments"
                        />
                    </ListItemButton>
                    <ListItemButton {...getItemProps('analitics')} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar>
                                <Icon fontSize="large">
                                    <TrendingUpSvg />
                                </Icon>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            disableTypography={false}
                            primary="Analytics"
                            secondary="Statistical information about your sales"
                        />
                    </ListItemButton>
                </List>
            </div>
        </>
    );
};

// Nested navigation list

const useNestedNavigationList = () => {
    const [selected, setSelected] = useState('');
    const [expanded, setExpanded] = useState<string[]>([]);

    const handleSelect = (key: string) => () => {
        setSelected(key);
    };

    const getSelectedItemProps = (name: string): ListItemButtonProps => {
        return {
            selected: name === selected,
            onClick: handleSelect(name)
        };
    };

    const isExpanded = (key: string) => {
        return expanded.indexOf(key) !== -1;
    };

    const handleExpanded = (name: string) => () => {
        setExpanded((prevState) => {
            if (prevState.indexOf(name) !== -1) {
                return prevState.filter((item) => item !== name);
            }

            return [...prevState, name];
        });
    };

    return {
        getSelectedItemProps,
        isExpanded,
        handleExpanded
    } as const;
};

export const NestedNavigationList = () => {
    const { getSelectedItemProps, isExpanded, handleExpanded } = useNestedNavigationList();

    return (
        <div style={{ width: '100%', maxWidth: '28rem' }}>
            <List className="nested-navigation-list">
                <ListItemButton {...getSelectedItemProps('time')}>
                    <ListItemIcon>
                        <AccessTimeRounded />
                    </ListItemIcon>
                    <ListItemText>Time</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={handleExpanded('reports')}>
                    <ListItemIcon>
                        <BarChartRounded />
                    </ListItemIcon>
                    <ListItemText>Reports</ListItemText>
                    <ListItemIcon>
                        {isExpanded('reports') ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
                    </ListItemIcon>
                </ListItemButton>
                <Collapse in={isExpanded('reports')}>
                    <List disablePadding className="nested-navigation-list">
                        <ListItemButton {...getSelectedItemProps('reports-projects-summary')}>
                            <ListItemText inset>Projects Summary</ListItemText>
                        </ListItemButton>
                        <ListItemButton {...getSelectedItemProps('reports-tasks-summary')}>
                            <ListItemText inset>Tasks Summary</ListItemText>
                        </ListItemButton>
                        <ListItemButton {...getSelectedItemProps('reports-team-summary')}>
                            <ListItemText inset>Team Summary</ListItemText>
                        </ListItemButton>
                        <ListItemButton {...getSelectedItemProps('reports-detailed-summary')}>
                            <ListItemText inset>Detailed Summary</ListItemText>
                        </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton onClick={handleExpanded('projects')}>
                    <ListItemIcon>
                        <FolderOpenRounded />
                    </ListItemIcon>
                    <ListItemText>Projects</ListItemText>
                    <ListItemIcon>
                        {isExpanded('projects') ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
                    </ListItemIcon>
                </ListItemButton>
                <Collapse in={isExpanded('projects')}>
                    <List disablePadding className="nested-navigation-list">
                        <ListItemButton {...getSelectedItemProps('projects-all')}>
                            <ListItemText inset>All projects</ListItemText>
                        </ListItemButton>
                        <ListItemButton {...getSelectedItemProps('projects-new')}>
                            <ListItemText inset>New projects</ListItemText>
                        </ListItemButton>
                        <ListItemButton {...getSelectedItemProps('projects-pending')}>
                            <ListItemText inset>Pending projects</ListItemText>
                        </ListItemButton>
                        <ListItemButton {...getSelectedItemProps('projects-completed')}>
                            <ListItemText inset>Completed projects</ListItemText>
                        </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton {...getSelectedItemProps('clients')}>
                    <ListItemIcon>
                        <ApartmentRounded />
                    </ListItemIcon>
                    <ListItemText>Clients</ListItemText>
                </ListItemButton>
            </List>
            <Divider />
            <List subheader={<ListSubheader>Workspace</ListSubheader>} className="nested-navigation-list">
                <ListItemButton {...getSelectedItemProps('messages')}>
                    <ListItemIcon>
                        <ChatBubbleOutlineRounded />
                    </ListItemIcon>
                    <ListItemText>Messages</ListItemText>
                    <ListItemText className="MuiListItemBadge">
                        <Badge badgeContent={100} />
                    </ListItemText>
                </ListItemButton>
                <ListItemButton {...getSelectedItemProps('settings')}>
                    <ListItemIcon>
                        <SettingsRounded />
                    </ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                </ListItemButton>
                <ListItemButton {...getSelectedItemProps('members')}>
                    <ListItemIcon>
                        <PeopleAltRounded />
                    </ListItemIcon>
                    <ListItemText>Members</ListItemText>
                </ListItemButton>
                <ListItemButton {...getSelectedItemProps('teams')}>
                    <ListItemIcon>
                        <GroupsRounded />
                    </ListItemIcon>
                    <ListItemText>Teams</ListItemText>
                </ListItemButton>
                <ListItemButton {...getSelectedItemProps('tags')}>
                    <ListItemIcon>
                        <LocalOfferRounded />
                    </ListItemIcon>
                    <ListItemText>Tags</ListItemText>
                </ListItemButton>
            </List>
            <Divider />
            <List className="nested-navigation-list">
                <ListItemButton {...getSelectedItemProps('help')}>
                    <ListItemIcon>
                        <HelpOutlineRounded />
                    </ListItemIcon>
                    <ListItemText>Help</ListItemText>
                </ListItemButton>
            </List>
        </div>
    );
};

// Color List

export const ColorList = () => {
    const [selected, setSelected] = useState<string>();

    const handleSelect = useEventCallback((color?: string) => {
        setSelected(color);
    });

    return (
        <Paper elevation={4} style={{ display: 'inline-block' }}>
            <MuiCustomColorList selected={selected} onSelect={handleSelect} />
        </Paper>
    );
};

// Linked list (facebook setting menu)

export const LinkedList = () => {
    return (
        <Paper elevation={4} className="navigation-list-paper">
            <FacebookSettingLinkedList />
        </Paper>
    );
};

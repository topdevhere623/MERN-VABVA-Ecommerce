import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import _upperFirst from 'lodash/upperFirst';
import formatDate from 'date-fns/format';
import { CellProps, Column, SortByFn } from 'react-table';

import {
    Avatar,
    Button,
    Checkbox,
    Chip,
    ChipProps,
    Collapse,
    Divider,
    FormControlLabel,
    Icon,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    Stack,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    useEventCallback
} from '@mui/material';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';
import {
    BusinessRounded,
    ForumRounded,
    MailOutlineOutlined,
    PaymentOutlined,
    PhoneIphoneOutlined,
    PictureAsPdfOutlined
} from '@mui/icons-material';
import NumberFormat from 'react-number-format';

import { MuiCustomTable, MuiCustomTableCell, MuiCustomTableContainer } from '~/mui-custom/Table';
import { Edit2Svg, MoreVerticalSvg, Trash2Svg } from '~/assets/svg-icons/feather';
import { useMountedRef } from '~/mui-custom/utils';
import { RandomUser, fetchRandomUsers } from '../services/RandomUsersService';
import {
    getMuiCustomReactTableCheckboxCell,
    getMuiCustomReactTableExpanderCell,
    getMuiCustomReactTableHeaderCheckboxCell,
    MuiCustomReactTable
} from '~/mui-custom/ReactTable';

export default {
    title: 'mui-custom/Table'
} as Meta;

type OrderStatus = 'paid' | 'new' | 'pending' | 'unpaid';

const createOrderData = (code: string, created: string, status: OrderStatus, email: string, amount: number) => {
    return { code, created, status, email, amount };
};

type Order = ReturnType<typeof createOrderData>;

const ordersRow: Order[] = [
    createOrderData('94812-44', '2021-05-28', 'new', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'new', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'new', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'pending', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'pending', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'unpaid', 'demo@mail.com', 3453455.54),
    createOrderData('94812-44', '2021-05-28', 'pending', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'paid', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'paid', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'unpaid', 'demo@mail.com', 5345342.54),
    createOrderData('94812-44', '2021-05-28', 'unpaid', 'demo@mail.com', 3453455.54),
    createOrderData('94812-44', '2021-05-28', 'pending', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'paid', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'paid', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'unpaid', 'demo@mail.com', 5345342.54),
    createOrderData('94812-44', '2021-05-28', 'new', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'new', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'new', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'pending', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'pending', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'unpaid', 'demo@mail.com', 3453455.54),
    createOrderData('94812-44', '2021-05-28', 'pending', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'paid', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'paid', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'unpaid', 'demo@mail.com', 5345342.54),
    createOrderData('94812-44', '2021-05-28', 'unpaid', 'demo@mail.com', 3453455.54),
    createOrderData('94812-44', '2021-05-28', 'pending', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'paid', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'paid', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'unpaid', 'demo@mail.com', 5345342.54),
    createOrderData('94812-44', '2021-05-28', 'new', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'new', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'new', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'pending', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'pending', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'unpaid', 'demo@mail.com', 3453455.54),
    createOrderData('94812-44', '2021-05-28', 'pending', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'paid', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'paid', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'unpaid', 'demo@mail.com', 5345342.54),
    createOrderData('94812-44', '2021-05-28', 'unpaid', 'demo@mail.com', 3453455.54),
    createOrderData('94812-44', '2021-05-28', 'pending', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'paid', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'paid', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'unpaid', 'demo@mail.com', 5345342.54),
    createOrderData('94812-44', '2021-05-28', 'new', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'new', 'demo@mail.com', 532.54),
    createOrderData('94812-44', '2021-05-28', 'new', 'demo@mail.com', 532.54)
];

const orderStatusColorsMap: Record<OrderStatus, ChipProps['color']> = {
    new: 'secondary',
    paid: 'success',
    pending: 'default',
    unpaid: 'error'
};

const OrdersTableMenu = () => {
    const popupState = usePopupState({ variant: 'popover', popupId: 'ordersTableMenu' });

    return (
        <>
            <IconButton {...bindTrigger(popupState)}>
                <Icon fontSize="medium">
                    <MoreVerticalSvg />
                </Icon>
            </IconButton>
            <Menu
                {...bindMenu(popupState)}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                disableScrollLock
                PaperProps={{}}
                onClick={popupState.close}
            >
                <MenuItem>
                    <ListItemIcon>
                        <Icon fontSize="xsmall">
                            <Edit2Svg />
                        </Icon>
                    </ListItemIcon>
                    Edit
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

export const Orders: Story = () => {
    const [dense, setDense] = useState(false);
    const [striped, setStriped] = useState(false);
    const [bordered, setBordered] = useState(true);

    const handleDenseSwitchChange = useEventCallback((ev, checked: boolean) => {
        setDense(checked);
    });

    const handleStripedSwitchChange = useEventCallback((ev, checked: boolean) => {
        setStriped(checked);
    });

    const handleBorderedSwitchChange = useEventCallback((ev, checked: boolean) => {
        setBordered(checked);
    });

    const handleCodeLinkClick = useEventCallback((rowData: Order) => {
        console.log({ rowData });
    });

    const columns = useMemo<Column<Order>[]>(
        () => [
            {
                id: 'expander',
                MuiCellProps: {
                    padding: 'action'
                },
                Header: '',
                Cell: getMuiCustomReactTableExpanderCell(),
                ExpandedRowContent: (row) => {
                    return (
                        <div className="MuiTableExpandedContent">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur ex id odio tenetur, vel
                            nesciunt animi aliquid. Velit doloremque dolores omnis id hic, cupiditate non consectetur nemo
                            sit sapiente vero. Magnam sunt hic nihil molestiae ut sed eligendi quod consequuntur, commodi
                            eos? Sint cum iure modi ea aliquid provident consectetur quaerat esse ullam? Amet a iure deleniti
                            eaque et natus? Ratione, officia eaque iure aliquid quam voluptatem corrupti illo aliquam magnam
                            odio eveniet consequuntur dicta molestias maiores cumque modi voluptatibus magni! Optio
                            aspernatur excepturi sit aperiam quod tenetur mollitia ab? Incidunt iusto quos necessitatibus
                            alias dolorum ad aliquid modi, qui vero voluptatem rem voluptate veniam, sunt laudantium tempora
                            odit soluta, quia aut eaque unde repellendus quaerat.
                        </div>
                    );
                }
            },
            {
                id: 'checkbox',
                MuiCellProps: {
                    padding: 'checkbox'
                },
                Header: getMuiCustomReactTableHeaderCheckboxCell({ color: 'primary' }),
                Cell: getMuiCustomReactTableCheckboxCell({ color: 'primary' })
            },
            {
                accessor: 'code',
                MuiCellProps: {
                    noWrap: true
                },
                Header: '#',
                Cell: (cellProps) => {
                    const { value, row } = cellProps;

                    const handleClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
                        ev.preventDefault();

                        handleCodeLinkClick(row.original);
                    };

                    return (
                        <Link href="#" color="primary" underline="always" onClick={handleClick}>
                            {value}
                        </Link>
                    );
                }
            },
            {
                accessor: 'created',
                MuiCellProps: {
                    noWrap: true
                },
                Header: 'Date',
                Cell: (cellProps) => {
                    const { value } = cellProps;

                    return formatDate(new Date(value), 'MMM do, yyyy');
                }
            },
            {
                accessor: 'status',
                Header: 'Status',
                Cell: (cellProps) => {
                    const { value } = cellProps;
                    const color = orderStatusColorsMap[value];

                    return <Chip variant="dimmed" color={color} size="small" label={_upperFirst(value)} />;
                }
            },
            {
                id: 'details',
                MuiCellProps: {
                    truncated: true,
                    sx: { minWidth: '20rem', width: '100%' }
                },
                Header: 'Details',
                Cell: () => {
                    return (
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi doloribus quisquam quae deleniti
                            asperiores nesciunt soluta commodi eaque aut, facilis, temporibus exercitationem quos ad.
                        </span>
                    );
                }
            },
            {
                accessor: 'amount',
                MuiCellProps: {
                    align: 'right'
                },
                Header: 'Amount',
                Cell: (cellProps) => {
                    const { value } = cellProps;

                    return (
                        <NumberFormat
                            value={value}
                            thousandSeparator=","
                            decimalSeparator="."
                            prefix="£"
                            displayType="text"
                        />
                    );
                }
            },
            {
                id: 'actions',
                MuiCellProps: {
                    padding: 'action'
                },
                Cell: () => {
                    return (
                        <Stack direction="row" flexWrap="nowrap" spacing={1}>
                            <Tooltip title="Send message">
                                <IconButton color="primary">
                                    <ForumRounded fontSize="large" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Add payment">
                                <IconButton color="primary">
                                    <PaymentOutlined fontSize="large" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Generate invoice">
                                <IconButton color="primary">
                                    <PictureAsPdfOutlined fontSize="large" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    );
                }
            },
            {
                id: 'more-actions',
                MuiCellProps: {
                    padding: 'action'
                },
                Cell: () => {
                    return <OrdersTableMenu />;
                }
            }
        ],
        [handleCodeLinkClick]
    );

    const shouldDisplayItems = ordersRow.length > 0;

    if (!shouldDisplayItems) {
        return <div />;
    }

    return (
        <>
            <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="flex-end"
                gap={10}
                sx={{ paddingTop: 8, paddingBottom: 8 }}
            >
                <FormControlLabel
                    label="Striped"
                    control={<Switch checked={striped} color="primary" size="small" onChange={handleStripedSwitchChange} />}
                />
                <FormControlLabel
                    label="Bordered"
                    control={
                        <Switch checked={bordered} color="primary" size="small" onChange={handleBorderedSwitchChange} />
                    }
                />
                <FormControlLabel
                    label="Dense"
                    control={<Switch checked={dense} color="primary" size="small" onChange={handleDenseSwitchChange} />}
                />
            </Stack>

            <MuiCustomReactTable
                columns={columns}
                data={ordersRow}
                enableSort
                enableRowExpand
                enableRowSelect
                stickyHeader
                striped={striped}
                bordered={bordered}
                size={dense ? 'small' : 'medium'}
                PaperProps={{ maxHeight: '50rem' }}
            />
        </>
    );
};

// Clients

export const Clients: Story = () => {
    const [items, setItems] = useState<RandomUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [empty, setEmpty] = useState(false);
    const isMountedRef = useMountedRef();

    const handleLoadingSwitchChange = useEventCallback((ev: React.SyntheticEvent, checked: boolean) => {
        setLoading(checked);
    });

    const handleEmptySwitchChange = useEventCallback((ev: React.SyntheticEvent, checked: boolean) => {
        setEmpty(checked);
    });

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const response = await fetchRandomUsers(25);

            if (isMountedRef.current) {
                setLoading(false);
                setItems(response || []);
            }
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    }, [isMountedRef]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const columns = useMemo<Column<RandomUser>[]>(() => {
        return [
            {
                accessor: 'picture',
                disableSortBy: true,
                MuiCellProps: {
                    sx: { width: '5.2rem' }
                },
                Cell: (cellProps) => {
                    const { value, row } = cellProps;
                    const { name } = row.original;

                    return (
                        <Avatar
                            variant="circular"
                            style={{ width: '5.2rem', height: '5.2rem' }}
                            src={value?.large}
                            imgProps={{ loading: 'lazy', width: '5.2rem' }}
                            className="MuiAvatar-colorPrimary"
                        >
                            {String(name?.first).charAt(0)}
                        </Avatar>
                    );
                }
            },
            {
                accessor: 'name',
                MuiCellProps: {
                    sx: { width: '20rem' }
                },
                Header: 'Name',
                Cell: (cellProps) => {
                    const { value } = cellProps;

                    const handleLinkClick = (ev: React.MouseEvent) => {
                        ev.preventDefault();
                    };

                    return (
                        <Link href="#" underline="always" onClick={handleLinkClick}>
                            {value?.first} {value?.last}
                        </Link>
                    );
                }
            },
            {
                accessor: 'location',
                disableSortBy: true,
                Header: 'Address',
                Cell: (cellProps) => {
                    const { value } = cellProps;

                    return (
                        value?.country && (
                            <List disablePadding>
                                <ListItem disablePadding disableGutters>
                                    <ListItemIcon sx={{ alignSelf: 'flex-start' }}>
                                        <BusinessRounded />
                                    </ListItemIcon>
                                    <ListItemText>
                                        {value?.country && `${value?.country}, `}
                                        {value?.city && `${value?.city}`}
                                    </ListItemText>
                                </ListItem>
                                <ListItem disablePadding disableGutters>
                                    <ListItemText inset>
                                        {value?.street?.number && `${value?.street?.number}, `}
                                        {value?.street?.name && `${value?.street?.name}`}
                                    </ListItemText>
                                </ListItem>
                            </List>
                        )
                    );
                }
            },
            {
                id: 'contacts',
                Header: 'Contacts',
                Cell: (cellProps: CellProps<RandomUser>) => {
                    const { row } = cellProps;
                    const { phone, email } = row.original;

                    return (
                        <List disablePadding>
                            {phone && (
                                <ListItem dense disableGutters>
                                    <ListItemIcon>
                                        <PhoneIphoneOutlined />
                                    </ListItemIcon>
                                    <ListItemText>{phone}</ListItemText>
                                </ListItem>
                            )}
                            {email && (
                                <ListItem dense disableGutters>
                                    <ListItemIcon>
                                        <MailOutlineOutlined />
                                    </ListItemIcon>
                                    <ListItemText>{email}</ListItemText>
                                </ListItem>
                            )}
                        </List>
                    );
                }
            }
        ];
    }, []);

    const shouldDisplayItems = items.length > 0;

    if (!shouldDisplayItems) {
        return <div />;
    }

    return (
        <>
            <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="flex-end"
                sx={{ paddingTop: 8, paddingBottom: 8 }}
                gap={8}
            >
                <FormControlLabel
                    control={<Switch size="small" />}
                    label="Loading"
                    checked={loading}
                    onChange={handleLoadingSwitchChange}
                />
                <FormControlLabel
                    control={<Switch size="small" />}
                    label="Empty"
                    checked={empty}
                    onChange={handleEmptySwitchChange}
                />
            </Stack>
            <MuiCustomReactTable data={items} columns={columns} stickyHeader bordered PaperProps={{ maxHeight: '50rem' }} />
        </>
    );
};

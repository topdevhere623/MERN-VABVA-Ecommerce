import React, { useMemo, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import {
    Select,
    MenuItem,
    ListItemText,
    ListItemIcon,
    TextFieldProps,
    useEventCallback,
    InputAdornment,
    useTheme,
    ListSubheader,
    InputBaseComponentProps,
    Box
} from '@mui/material';
import { LabelRounded } from '@mui/icons-material';

import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { MuiCustomTextField, MuiCustomTextFieldProps } from '~/mui-custom/TextField';
import { MuiCustomPaperSimplebarProps } from '~/mui-custom/PaperSimplebar';

export default {
    title: 'mui-custom/Select',
    component: Select
} as Meta;

// Labels Select

const labelsData: { id: number; name: string; color?: string; group?: string }[] = [
    { id: 1, name: 'Important', color: '#36B4C4', group: 'Default' },
    { id: 2, name: 'Delivery', color: '#AD57A0', group: 'Default' },
    { id: 3, name: 'Sales', color: '#FFB800', group: 'Default' },
    { id: 4, name: 'Finance', color: '#00AC26', group: 'Default' },
    { id: 5, name: 'Custom 1', group: 'Custom' },
    { id: 6, name: 'Custom 2', group: 'Custom' },
    { id: 7, name: 'Custom 3 some long long text', group: 'Custom' },
    { id: 8, name: 'Custom 4', group: 'Custom' }
];

export const LabelsSelect: Story = () => {
    const [selected, setSelected] = useState<number | string>('');
    const muiTheme = useTheme();

    const selectedItem = useMemo(() => labelsData.find((item) => item.id === selected), [selected]);

    const handleChange = useEventCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const value = ev.target.value ? parseInt(ev.target.value, 10) : '';

        setSelected(value);
    });

    const renderValue = (): React.ReactNode => {
        if (!selectedItem) {
            return <span className="u-text-note">Select label</span>;
        }

        return <span className="u-text-truncate">{selectedItem?.name}</span>;
    };

    const selectProps: TextFieldProps['SelectProps'] & {
        MenuProps?: { PaperProps?: MuiCustomPaperSimplebarProps };
    } = {
        renderValue,
        displayEmpty: true,
        MenuProps: {
            ...muiTheme.components?.MuiSelect?.defaultProps?.MenuProps,
            PaperProps: {
                ...muiTheme.components?.MuiSelect?.defaultProps?.MenuProps?.PaperProps,
                maxWidth: '24rem'
            }
        }
    };

    const inputProps: TextFieldProps['InputProps'] = {
        startAdornment: selectedItem && (
            <InputAdornment position="start">
                <LabelRounded fontSize="large" sx={{ color: selectedItem.color }} />
            </InputAdornment>
        )
    };

    return (
        <div
            style={{
                maxWidth: '20rem'
            }}
        >
            <MuiCustomTextField
                variant="outlined"
                label="Filter by label"
                value={selected}
                select
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={inputProps}
                SelectProps={selectProps}
                onChange={handleChange}
            >
                <MenuItem value="">
                    <ListItemText inset className="u-text-note">
                        None
                    </ListItemText>
                </MenuItem>
                {labelsData.map((item, index) => {
                    const shouldRenderGroup =
                        item.group &&
                        (index === 0 || (labelsData.length - 1 > index && item.group !== labelsData[index - 1].group));

                    const groupElement = shouldRenderGroup ? (
                        <ListSubheader disableSticky className="u-text-note">
                            {item.group}
                        </ListSubheader>
                    ) : null;

                    return [
                        groupElement,
                        <MenuItem key={item.id} value={item.id}>
                            <ListItemIcon>
                                <LabelRounded fontSize="large" sx={{ color: item.color }} />
                            </ListItemIcon>
                            <ListItemText className="u-text-truncate">{item.name}</ListItemText>
                        </MenuItem>
                    ];
                })}
            </MuiCustomTextField>
        </div>
    );
};

// Birthday select

const daysItems = Array.from({ length: 31 }, (_, index) => {
    const item = String(index + 1);
    return item.padStart(2, '0');
});

const monthsItems = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const DaysSelectField = (props: MuiCustomTextFieldProps) => {
    const renderValue = (value: unknown) => {
        if (!value) {
            return <span className="u-text-note">Day</span>;
        }

        return <span className="u-text-truncate">{String(value)}</span>;
    };

    return (
        <MuiCustomTextField
            select
            variant="original"
            defaultValue=""
            SelectProps={{ renderValue, displayEmpty: true }}
            {...props}
        >
            <MenuItem value="">
                <ListItemText className="u-text-note">None</ListItemText>
            </MenuItem>
            {daysItems.map((item, index) => {
                return (
                    <MenuItem key={index} value={item}>
                        {item}
                    </MenuItem>
                );
            })}
        </MuiCustomTextField>
    );
};

const MonthSelectField = (props: MuiCustomTextFieldProps) => {
    const renderValue = (value: unknown) => {
        if (!value) {
            return <span className="u-text-note">Month</span>;
        }

        return <span className="u-text-truncate">{String(value)}</span>;
    };

    return (
        <MuiCustomTextField
            select
            variant="original"
            label="Birthday"
            defaultValue=""
            SelectProps={{ renderValue, displayEmpty: true }}
            {...props}
        >
            <MenuItem value="">
                <ListItemText className="u-text-note">None</ListItemText>
            </MenuItem>
            {monthsItems.map((item, index) => {
                return (
                    <MenuItem key={index} value={item}>
                        {item}
                    </MenuItem>
                );
            })}
        </MuiCustomTextField>
    );
};

const YearNumberFormatInput = React.forwardRef<HTMLInputElement, InputBaseComponentProps>((props, forwardedRef) => {
    const isAllowed = (value: NumberFormatValues) => {
        const stringValue = value.value;
        const numValue = value.floatValue;
        const currentYear = new Date().getFullYear();

        return !numValue || (numValue < currentYear && !(stringValue.length === 4 && numValue < currentYear - 200));
    };

    return <NumberFormat {...(props as unknown)} getInputRef={forwardedRef} format="####" isAllowed={isAllowed} />;
});

const YearField = (props: MuiCustomTextFieldProps) => {
    return (
        <MuiCustomTextField
            {...props}
            variant="original"
            placeholder="Year"
            InputProps={{ inputComponent: YearNumberFormatInput }}
        />
    );
};

export const BirthdaySelect: Story = () => {
    return (
        <>
            <Box
                sx={{
                    display: 'grid',
                    alignItems: 'end',
                    gridTemplateColumns: {
                        sm: 'minmax(16rem, 1fr) repeat(2, minmax(10rem, 1fr))',
                        xs: '1fr'
                    },
                    gap: 6,
                    maxWidth: '40rem'
                }}
            >
                <MonthSelectField />
                <DaysSelectField />
                <YearField />
            </Box>
        </>
    );
};

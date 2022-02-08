import React, { useMemo, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Icon, IconProps, Tooltip } from '@mui/material';
import { GridViewRounded, ViewComfyRounded, ViewListRounded } from '@mui/icons-material';

import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps } from './Templete';

export default {
    title: 'mui-custom/ToggleButton',
    component: ToggleButtonGroup,
    subcomponents: { ToggleButton }
} as Meta;

type DefaultStoryProps = ToggleButtonGroupProps & { iconFontSize?: IconProps['fontSize'] };

export const Default: Story<DefaultStoryProps> = (args) => {
    const { iconFontSize, size, ...other } = args;
    const [selected, setSelected] = useState<string>('grid');

    const handleChange = (ev: React.MouseEvent, newValue: string) => {
        setSelected(newValue);
    };

    const tooltipPopperConfig = useMemo(() => {
        let offsetY = 8;

        if (size === 'medium') {
            offsetY = 4;
        } else if (size === 'small') {
            offsetY = 2;
        }

        return { modifiers: [{ name: 'offset', options: { offset: [0, offsetY] } }] };
    }, [size]);

    return (
        <ToggleButtonGroup {...other} size={size} value={selected} onChange={handleChange}>
            <ToggleButton value="grid">
                <Tooltip title="Grid View" PopperProps={tooltipPopperConfig}>
                    <Icon fontSize="large">
                        <GridViewRounded />
                    </Icon>
                </Tooltip>
            </ToggleButton>
            <ToggleButton value="grid-dense">
                <Tooltip title="Large Grid View" PopperProps={tooltipPopperConfig}>
                    <Icon fontSize="large">
                        <ViewComfyRounded />
                    </Icon>
                </Tooltip>
            </ToggleButton>
            <ToggleButton value="list">
                <Tooltip title="List View" PopperProps={tooltipPopperConfig}>
                    <Icon fontSize="large">
                        <ViewListRounded />
                    </Icon>
                </Tooltip>
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

Default.args = {
    size: 'medium',
    exclusive: true,
    color: 'secondary',
    iconFontSize: 'large'
} as DefaultStoryProps;

const FiltersExample = () => {
    const [selected, setSelected] = useState<string>('pending');

    const handleChange = (ev: React.MouseEvent, newValue: string) => {
        setSelected(newValue);
    };

    return (
        <ToggleButtonGroup exclusive color="primary" value={selected} onChange={handleChange}>
            <ToggleButton value="new">New</ToggleButton>
            <ToggleButton value="pending">Pending</ToggleButton>
            <ToggleButton value="completed">Completed</ToggleButton>
        </ToggleButtonGroup>
    );
};

export const Exmaples = () => {
    return (
        <>
            <div className="stack stack--direction-column stack--gap-10">
                <Default size="large" color="primary" exclusive />
                <Default size="medium" color="secondary" exclusive />
                <Default size="small" color="primary" exclusive />
                <FiltersExample />
            </div>
        </>
    );
};

import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Icon, Tooltip, IconButton } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';

import {
    AnchorSvg,
    ArrowRightSvg,
    UserSvg,
    CheckCircleSvg,
    EditSvg,
    PlusSvg,
    GridSvg,
    Menu1Svg,
    SquareSvg
} from '~/assets/svg-icons/feather';

export default {
    component: IconButton,
    title: 'mui-custom/IconButton'
} as Meta;

export const Examples: Story = () => {
    return (
        <>
            <div className="stack">
                <Tooltip title="Add to favorite">
                    <IconButton size="large">
                        <FavoriteBorder />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Add to favorite">
                    <IconButton size="medium">
                        <FavoriteBorder />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Add to favorite">
                    <IconButton size="small">
                        <FavoriteBorder />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="stack">
                <IconButton size="large" disabled>
                    <FavoriteBorder />
                </IconButton>
                <IconButton size="medium" disabled>
                    <FavoriteBorder />
                </IconButton>
                <IconButton size="small" disabled>
                    <FavoriteBorder />
                </IconButton>
            </div>
            <div className="stack">
                <IconButton size="large" color="secondary">
                    <FavoriteBorder />
                </IconButton>
                <IconButton size="medium" color="secondary">
                    <FavoriteBorder />
                </IconButton>
                <IconButton size="small" color="secondary">
                    <FavoriteBorder />
                </IconButton>
            </div>
            <div className="stack">
                <IconButton size="large" color="secondary" disabled>
                    <FavoriteBorder />
                </IconButton>
                <IconButton size="medium" color="secondary" disabled>
                    <FavoriteBorder />
                </IconButton>
                <IconButton size="small" color="secondary" disabled>
                    <FavoriteBorder />
                </IconButton>
            </div>
            <div className="stack">
                <Tooltip title="Add to favorite">
                    <IconButton size="large" color="primary">
                        <FavoriteBorder />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Add to favorite">
                    <IconButton size="medium" color="primary">
                        <FavoriteBorder />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Add to favorite">
                    <IconButton size="small" color="primary">
                        <FavoriteBorder />
                    </IconButton>
                </Tooltip>
            </div>

            {/* Custom icon */}

            <div className="stack">
                <IconButton size="large" color="inherit">
                    <Icon>
                        <AnchorSvg />
                    </Icon>
                </IconButton>
                <IconButton size="large" color="inherit">
                    <Icon>
                        <ArrowRightSvg />
                    </Icon>
                </IconButton>
                <IconButton size="large" color="inherit">
                    <Icon>
                        <UserSvg />
                    </Icon>
                </IconButton>
                <IconButton size="large" color="inherit">
                    <Icon>
                        <CheckCircleSvg />
                    </Icon>
                </IconButton>
                <IconButton size="large" color="inherit">
                    <Icon>
                        <EditSvg />
                    </Icon>
                </IconButton>
                <IconButton size="large" color="inherit">
                    <Icon>
                        <PlusSvg />
                    </Icon>
                </IconButton>
                <IconButton size="large" color="inherit">
                    <Icon>
                        <GridSvg />
                    </Icon>
                </IconButton>
                <IconButton size="large" color="inherit">
                    <Icon fontSize="large">
                        <Menu1Svg />
                    </Icon>
                </IconButton>
                <IconButton size="large" color="inherit">
                    <Icon fontSize="large">
                        <SquareSvg />
                    </Icon>
                </IconButton>
            </div>

            {/* Custom classes:  Dense */}

            <div className="stack">
                <IconButton size="large" color="primary" className="MuiIconButton-dense">
                    <FavoriteBorder />
                </IconButton>
                <IconButton size="medium" color="primary" className="MuiIconButton-dense">
                    <FavoriteBorder />
                </IconButton>
                <IconButton size="small" color="primary" className="MuiIconButton-dense">
                    <FavoriteBorder />
                </IconButton>
                <IconButton size="medium" color="inherit" className="MuiIconButton-dense">
                    <Icon>
                        <GridSvg />
                    </Icon>
                </IconButton>
                <IconButton size="medium" color="inherit" className="MuiIconButton-dense">
                    <Icon>
                        <Menu1Svg />
                    </Icon>
                </IconButton>
                <IconButton size="medium" color="inherit" className="MuiIconButton-dense">
                    <Icon>
                        <SquareSvg />
                    </Icon>
                </IconButton>
            </div>
        </>
    );
};

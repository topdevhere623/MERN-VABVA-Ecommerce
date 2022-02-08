import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button, Icon, ButtonGroup } from '@mui/material';
import { Menu1Svg, SaveSvg, TagSvg } from '~/assets/svg-icons/feather';

export default {
    component: ButtonGroup,
    title: 'mui-custom/ButtonGroup'
} as Meta;

export const Default: Story = (args) => {
    return (
        <ButtonGroup variant="outlined" size="medium">
            <Button
                startIcon={
                    <Icon>
                        <SaveSvg />
                    </Icon>
                }
            >
                Save
            </Button>
            <Button
                startIcon={
                    <Icon>
                        <SaveSvg />
                    </Icon>
                }
            >
                Save & Create
            </Button>
            <Button
                startIcon={
                    <Icon>
                        <SaveSvg />
                    </Icon>
                }
            >
                Save & Close
            </Button>
        </ButtonGroup>
    );
};

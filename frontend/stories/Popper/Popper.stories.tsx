import React, { useCallback, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Popper, PopperProps, Paper, Fade, IconButton, Icon } from '@mui/material';
import { MapPinSvg, XSvg } from '~/assets/svg-icons/feather';

import './map-popper.scss';

export default {
    title: 'mui-custom/Popper',
    component: Popper
} as Meta;

export const Example: Story<PopperProps> = () => {
    const [anchorRef, setAnchorRef] = useState<HTMLButtonElement | null>(null);
    const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(true);

    const handleButtonClick = useCallback(() => {
        setOpen((prevState) => !prevState);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const popperProps = {
        open,
        anchorEl: anchorRef,
        placement: 'top',
        transition: true,
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 20]
                }
            },
            {
                name: 'arrow',
                enabled: true,
                options: {
                    element: arrowRef
                }
            }
        ]
    } as PopperProps;

    return (
        <div style={{ margin: '20rem' }}>
            <IconButton
                color="primary"
                size="large"
                className="MuiIconButton-dense"
                ref={setAnchorRef}
                onClick={handleButtonClick}
            >
                <Icon>
                    <MapPinSvg />
                </Icon>
            </IconButton>
            {popperProps.anchorEl && (
                <Popper {...popperProps} className="popper map-popper">
                    {({ TransitionProps }) => {
                        return (
                            <Fade {...TransitionProps}>
                                <Paper className="map-popper__content">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, aperiam sapiente cumque
                                    delectus esse sunt possimus, labore commodi, repudiandae quam eaque iste atque soluta?
                                    Voluptas quisquam harum quaerat facere quos!
                                    <div ref={setArrowRef} data-popper-arrow className="popper__arrow" />
                                    <IconButton
                                        size="small"
                                        className="map-popper__close MuiIconButton-dense"
                                        onClick={handleClose}
                                    >
                                        <Icon>
                                            <XSvg />
                                        </Icon>
                                    </IconButton>
                                </Paper>
                            </Fade>
                        );
                    }}
                </Popper>
            )}
        </div>
    );
};

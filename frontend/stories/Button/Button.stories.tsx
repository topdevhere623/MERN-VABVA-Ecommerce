import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { CircularProgress, Icon, Button } from '@mui/material';
import { KeyboardArrowRight, ShoppingCart } from '@mui/icons-material';

export default {
    component: Button,
    title: 'mui-custom/Button'
} as Meta;

export const Examples: Story = () => {
    return (
        <>
            {/* Contained */}

            <div className="stack u-margin-b-10">
                <Button variant="contained">Save product</Button>
                <Button variant="contained" color="secondary">
                    Save product
                </Button>
                <Button variant="contained" color="inherit">
                    Save product
                </Button>
            </div>

            {/* Contained disabled */}

            <div className="stack u-margin-b-10">
                <Button variant="contained" disabled>
                    Save product
                </Button>
                <Button variant="contained" color="secondary" disabled>
                    Save product
                </Button>
                <Button variant="contained" color="inherit" disabled>
                    Save product
                </Button>
            </div>

            <div className="stack u-margin-b-10">
                <Button
                    variant="contained"
                    disabled
                    startIcon={
                        <Icon>
                            <CircularProgress color="inherit" />
                        </Icon>
                    }
                >
                    Saving ...
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    disabled
                    startIcon={
                        <Icon>
                            <CircularProgress color="inherit" />
                        </Icon>
                    }
                >
                    Saving ...
                </Button>
                <Button
                    variant="contained"
                    color="inherit"
                    disabled
                    startIcon={
                        <Icon>
                            <CircularProgress color="inherit" />
                        </Icon>
                    }
                >
                    Saving ...
                </Button>
            </div>

            {/* Outlined */}

            <div className="stack u-margin-b-10">
                <Button variant="outlined">Save product</Button>
                <Button variant="outlined" color="secondary">
                    Save product
                </Button>
                <Button variant="outlined" color="inherit">
                    Save product
                </Button>
            </div>

            {/* Outlined disabled */}

            <div className="stack u-margin-b-10">
                <Button variant="outlined" disabled>
                    Save product
                </Button>
                <Button variant="outlined" color="secondary" disabled>
                    Save product
                </Button>
                <Button variant="outlined" color="inherit" disabled>
                    Save product
                </Button>
            </div>

            <div className="stack u-margin-b-10">
                <Button
                    variant="outlined"
                    disabled
                    startIcon={
                        <Icon>
                            <CircularProgress color="inherit" />
                        </Icon>
                    }
                >
                    Saving ...
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    disabled
                    startIcon={
                        <Icon>
                            <CircularProgress color="inherit" />
                        </Icon>
                    }
                >
                    Saving ...
                </Button>
                <Button
                    variant="outlined"
                    color="inherit"
                    disabled
                    startIcon={
                        <Icon>
                            <CircularProgress color="inherit" />
                        </Icon>
                    }
                >
                    Saving ...
                </Button>
            </div>

            {/* Text */}

            <div className="stack u-margin-b-10">
                <Button variant="text">Save product</Button>
                <Button variant="text" color="secondary">
                    Save product
                </Button>
                <Button variant="text" color="inherit">
                    Save product
                </Button>
            </div>

            {/* Text disabled */}

            <div className="stack u-margin-b-10">
                <Button variant="text" disabled>
                    Save product
                </Button>
                <Button variant="text" color="secondary" disabled>
                    Save product
                </Button>
                <Button variant="text" color="inherit" disabled>
                    Save product
                </Button>
            </div>

            <div className="stack u-margin-b-10">
                <Button
                    variant="text"
                    disabled
                    startIcon={
                        <Icon>
                            <CircularProgress color="inherit" />
                        </Icon>
                    }
                >
                    Saving ...
                </Button>
                <Button
                    variant="text"
                    color="secondary"
                    disabled
                    startIcon={
                        <Icon>
                            <CircularProgress color="inherit" />
                        </Icon>
                    }
                >
                    Saving ...
                </Button>
                <Button
                    variant="text"
                    color="inherit"
                    disabled
                    startIcon={
                        <Icon>
                            <CircularProgress color="inherit" />
                        </Icon>
                    }
                >
                    Saving ...
                </Button>
            </div>

            {/* Sizes */}

            <div className="stack stack--direction-column u-margin-b-10">
                <Button variant="contained" color="secondary" size="large">
                    Save product
                </Button>
                <Button variant="contained" color="secondary" size="medium">
                    Save product
                </Button>
                <Button variant="contained" color="secondary" size="small">
                    Save product
                </Button>
            </div>
            <div className="stack stack--direction-column u-margin-b-10">
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<ShoppingCart />}
                    endIcon={<KeyboardArrowRight />}
                >
                    Save product
                </Button>
                <Button variant="contained" color="secondary" size="medium" startIcon={<ShoppingCart />}>
                    Save product
                </Button>
                <Button variant="contained" color="secondary" size="small" startIcon={<ShoppingCart />}>
                    Save product
                </Button>
            </div>
            <div className="stack stack--direction-column u-margin-b-10">
                <Button variant="outlined" size="large" startIcon={<ShoppingCart />} endIcon={<KeyboardArrowRight />}>
                    Save product
                </Button>
                <Button variant="outlined" size="medium" startIcon={<ShoppingCart />}>
                    Save product
                </Button>
                <Button variant="outlined" size="small" startIcon={<ShoppingCart />}>
                    Save product
                </Button>
            </div>

            {/* Only Icon */}

            <div className="stack u-margin-b-10">
                <Button
                    variant="text"
                    size="large"
                    color="secondary"
                    startIcon={<ShoppingCart />}
                    className="MuiButton-iconOnly"
                />
                <Button variant="text" size="medium" startIcon={<ShoppingCart />} className="MuiButton-iconOnly" />
                <Button
                    variant="text"
                    size="small"
                    color="inherit"
                    startIcon={<ShoppingCart />}
                    className="MuiButton-iconOnly"
                />
            </div>
        </>
    );
};

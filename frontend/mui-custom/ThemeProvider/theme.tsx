import React from 'react';
import { createTheme } from '@mui/material/styles';
import Grow from '@mui/material/Grow';
import { PopoverProps } from '@mui/material/Popover';

import Clear from '@mui/icons-material/Clear';
import Star from '@mui/icons-material/Star';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import { ChevronDownSvg } from '~/assets/svg-icons/feather';

import { sassSpacingCallback, getSassBreakpoint, getSassVariable } from './sass-variables';

// Modules
declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xxl: true;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        body3: true;
        subtitle3: true;
        note: true;
        'inherit-primary': true;
        'inherit-secondary': true;
        'subtitle-primary': true;
        'subtitle-secondary': true;
    }
}

declare module '@mui/material/Icon' {
    interface IconPropsSizeOverrides {
        xsmall: true;
        xlarge: true;
        xxlarge: true;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        contrast: true;
    }
}

declare module '@mui/material/Chip' {
    interface ChipPropsVariantOverrides {
        dimmed: true;
    }
}

declare module '@mui/material/Table' {
    interface TablePropsSizeOverrides {
        large: true;
    }
}

// Default props
const MuiPopoverDefaultProps: Omit<PopoverProps, 'open' | 'anchorEl'> = {
    TransitionComponent: Grow,
    TransitionProps: { timeout: { exit: 120, enter: 220, appear: 220 } },
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
    transformOrigin: { vertical: 'top', horizontal: 'left' }
};

// Theme
export const theme = createTheme({
    // Styles
    breakpoints: {
        values: {
            xs: getSassBreakpoint('xs'),
            sm: getSassBreakpoint('sm'),
            md: getSassBreakpoint('md'),
            lg: getSassBreakpoint('lg'),
            xl: getSassBreakpoint('xl'),
            xxl: getSassBreakpoint('xxl')
        },
        unit: getSassVariable('breakpoint-unit')
    },
    spacing: sassSpacingCallback,
    typography: {
        fontFamily: getSassVariable('font-family'),
        fontWeightRegular: getSassVariable('font-weight', 'number'),
        fontWeightLight: getSassVariable('font-weight-thin', 'number'),
        fontWeightMedium: getSassVariable('font-weight-strong', 'number'),
        body1: {
            fontSize: getSassVariable('font-size'),
            lineHeight: getSassVariable('line-height')
        },
        body2: {
            fontSize: getSassVariable('font-size'),
            lineHeight: getSassVariable('line-height')
        }
    },
    palette: {
        primary: {
            main: getSassVariable('color-primary'),
            light: getSassVariable('color-primary-light'),
            dark: getSassVariable('color-primary-dark'),
            contrastText: getSassVariable('color-primary-text')
        },
        secondary: {
            main: getSassVariable('color-secondary'),
            light: getSassVariable('color-secondary-light'),
            dark: getSassVariable('color-secondary-dark'),
            contrastText: getSassVariable('color-secondary-text')
        },
        text: {
            primary: getSassVariable('body-color'),
            secondary: getSassVariable('color-text-note')
        }
    },

    // Components
    components: {
        MuiContainer: {
            defaultProps: {
                maxWidth: 'xl'
            }
        },
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    subtitle1: 'span',
                    subtitle2: 'span',
                    body1: 'div',
                    body2: 'div',
                    inherit: 'div',
                    note: 'div'
                },
                variant: 'inherit'
            }
        },
        MuiLink: {
            defaultProps: {
                underline: 'hover',
                variant: 'inherit'
            }
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
                focusRipple: false
            }
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
                disableFocusRipple: true,
                focusVisibleClassName: 'MuiButton-focusVisible'
            }
        },
        MuiIconButton: {
            defaultProps: {
                size: 'medium',
                focusRipple: false,
                focusVisibleClassName: 'MuiIconButton-focusVisible'
            }
        },
        MuiToggleButton: {
            defaultProps: {
                size: 'medium',
                disableFocusRipple: false
            }
        },
        MuiChip: {
            defaultProps: {
                deleteIcon: <Clear />
            }
        },
        MuiSvgIcon: {
            defaultProps: {
                fontSize: 'inherit'
            }
        },
        MuiIcon: {
            defaultProps: {
                fontSize: 'inherit'
            }
        },
        MuiButtonGroup: {
            defaultProps: {
                disableElevation: true,
                disableRipple: true,
                disableFocusRipple: true,
                color: 'inherit',
                variant: 'outlined'
            }
        },
        MuiListItemText: {
            defaultProps: {
                disableTypography: true
            }
        },
        MuiBadge: {
            defaultProps: {
                color: 'primary'
            }
        },
        MuiPopover: {
            defaultProps: MuiPopoverDefaultProps
        },
        MuiTooltip: {
            defaultProps: {
                enterDelay: 500
            }
        },
        MuiMenu: {
            defaultProps: {
                ...MuiPopoverDefaultProps,
                PaperProps: {
                    sx: { minWidth: '14rem' }
                }
            }
        },
        MuiInput: {
            defaultProps: {
                disableUnderline: true
            }
        },
        MuiFilledInput: {
            defaultProps: {
                disableUnderline: true
            }
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined'
            }
        },
        MuiSelect: {
            defaultProps: {
                IconComponent: ChevronDownSvg as React.ElementType,
                MenuProps: {
                    ...MuiPopoverDefaultProps,
                    PaperProps: {
                        sx: { marginTop: '.2rem' }
                    }
                }
            }
        },
        MuiCheckbox: {
            defaultProps: {
                color: 'primary',
                icon: <div className="MuiCustomCheckbox" />,
                checkedIcon: <div className="MuiCustomCheckbox MuiCustomCheckbox-checked" />,
                indeterminateIcon: <div className="MuiCustomCheckbox MuiCustomCheckbox-indeterminate" />
            }
        },
        MuiRating: {
            defaultProps: {
                icon: <Star />,
                emptyIcon: <Star />,
                precision: 0.1
            }
        },
        MuiCircularProgress: {
            defaultProps: {
                size: '',
                color: 'primary',
                thickness: 3.4,
                disableShrink: false,
                variant: 'indeterminate'
            }
        },
        MuiTableSortLabel: {
            defaultProps: {
                hideSortIcon: true,
                IconComponent: KeyboardArrowDownRounded
            }
        },
        MuiPagination: {
            defaultProps: {
                shape: 'rounded',
                color: 'primary'
            }
        }
    }
});

import React from 'react';

import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { theme } from './theme';

type ThemeProviderPrividerProps = {
    children: React.ReactNode;
};

// NOTE: Don't use this component for SSR!
export const MuiCustomThemeProvider = (props: ThemeProviderPrividerProps) => {
    const { children } = props;

    return (
        <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </StyledEngineProvider>
    );
};

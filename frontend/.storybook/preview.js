import React from 'react';

import { MuiCustomThemeProvider } from '../mui-custom/ThemeProvider';

import '../scss/styles.scss';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
};

export const decorators = [
    (Story) => {
        return (
            <MuiCustomThemeProvider>
                <Story />
            </MuiCustomThemeProvider>
        );
    }
];

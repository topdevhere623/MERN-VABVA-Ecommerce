/**
 * Docs:
 *  - https://mui.com/guides/content-security-policy/#heading-server-side-rendering-ssr
 *  - https://mui.com/guides/server-rendering
 *
 * Source:
 *  - https://github.com/mui-org/material-ui/tree/master/examples/nextjs-with-typescript
 */

import React from 'react';
import Head from 'next/head';
import type { AppProps as NextAppProps } from 'next/app';

import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';

import { theme } from '../mui-custom/ThemeProvider/theme';
import { createEmotionCache } from '../mui-custom/ThemeProvider/createEmotionCache';

import '../scss/styles.scss';

export interface MyAppProps extends NextAppProps {
    emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

function MyApp(props: MyAppProps) {
    const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    );
}
export default MyApp;

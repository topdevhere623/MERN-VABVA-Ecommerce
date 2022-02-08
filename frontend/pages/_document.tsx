import React from 'react';

import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';

import { createEmotionCache } from '../mui-custom/ThemeProvider/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

class CustomDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                    <meta name="theme-color" content="#ffffff" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

// Source: https://github.com/mui-org/material-ui/blob/686ec23b59a60105ad7b6ce51c29d4bc0aa9696e/examples/nextjs-with-typescript/pages/_document.tsx#L30

CustomDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;

    // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache = clientSideEmotionCache;
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => {
                const enhanceAppProps = {
                    ...props,
                    emotionCache: cache
                };

                return <App {...enhanceAppProps} />;
            }
        });

    const initialProps = await Document.getInitialProps(ctx);
    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style: { key: string; ids: string[]; css: string }) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags]
    };
};

export default CustomDocument;

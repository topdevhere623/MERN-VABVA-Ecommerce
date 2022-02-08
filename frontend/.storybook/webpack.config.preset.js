const path = require('path');

const TsConfigPathPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    webpackFinal: async (config) => {
        config.resolve = {
            ...config.resolve,
            alias: {
                ...config.resolve.alias,
                // To fix the issue: https://github.com/mui-org/material-ui/issues/24282
                '@emotion/core': path.resolve('./node_modules/@emotion/react'),
                'emotion-theming': path.resolve('./node_modules/@emotion/react')
            },
            plugins: [new TsConfigPathPlugin()]
        };

        config.optimization = {
            ...config.optimization,
            minimize: false,
            minimizer: []
        };

        // Handle CSS / SCSS

        const cssRule = config.module.rules.find(({ test }) => /css/gi.test(test));

        if (cssRule) {
            Object.assign(cssRule, {
                test: /\.(scss|css)$/i,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            });
        }

        // Handle svg icons from svg-icons directory

        const svgRule = config.module.rules.find(({ test }) => /svg/gi.test(test));

        if (svgRule) {
            Object.assign(svgRule, {
                exclude: /[\\\/]svg\-icons[\\\/]/i
            });
        }

        config.module.rules.push({
            test: /\.svg$/i,
            loader: '@svgr/webpack',
            include: /[\\\/]svg\-icons[\\\/]/i,
            options: {
                svgo: true,
                dimensions: false,
                ref: true
            }
        });

        return config;
    }
};

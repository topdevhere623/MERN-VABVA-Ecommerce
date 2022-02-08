// Required to restart the server when changing

/**
 * @type {import('next').NextConfig}
 */

function cssLoaderModulesOptions(modules = {}) {
    const { getLocalIdent, ...others } = modules; // Need to delete getLocalIdent else localIdentName doesn't work
    return {
        ...others,
        localIdentName: '[local]-[hash:base64:6]'
    };
}

const nextConfig = {
    webpack: (config, options) => {
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

        /**
         * Handler custom className for css modules
         * Source:
         * - https://github.com/vercel/next.js/issues/10584
         * - https://stackoverflow.com/questions/66744765/how-to-hash-css-class-names-in-nextjs
         * - https://webpack.js.org/loaders/css-loader/
         */

        const hasOneRules = config.module.rules.find((rule) => typeof rule.oneOf === 'object');

        if (Array.isArray(hasOneRules.oneOf)) {
            hasOneRules.oneOf.forEach((moduleLoader) => {
                if (Array.isArray(moduleLoader.use)) {
                    moduleLoader.use.forEach((l) => {
                        if (l.loader.includes('\\css-loader') && !l.loader.includes('postcss-loader')) {
                            Object.assign(l.options, {
                                ...l.options,
                                modules: l.options.modules ? cssLoaderModulesOptions(l.options.modules) : l.options.module
                            });
                        }
                    });
                }
            });
        }

        return config;
    },
    typescript: {
        ignoreBuildErrors: true
    }
};

module.exports = nextConfig;

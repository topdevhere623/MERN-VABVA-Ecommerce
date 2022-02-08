module.exports = {
    stories: ['../stories/*/*.stories.@(jsx|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        {
            name: '@storybook/addon-docs',
            options: {
                configureJSX: true
            }
        },
        '@storybook/addon-controls',
        './webpack.config.preset.js'
    ],
    core: { builder: 'webpack5' },
    typescript: {
        check: false,
        reactDocgen: false
    }
};

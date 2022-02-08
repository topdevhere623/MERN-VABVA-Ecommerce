export type SocialLinkTypes = 'instagram' | 'twitter' | 'youtube' | 'pinterest';

const parseUrl = (url = '') => {
    return String(url).replace(/^\/+/, '');
};

const getUrl = (baseUrl = '', extraUrl = '') => {
    if (extraUrl) {
        return `${baseUrl}/${parseUrl(extraUrl)}`;
    }

    return baseUrl;
};

// For routing purpose

const appUrls = {
    home: () => '/',

    // User's routes
    orders: () => getUrl('/orders'),
    login_security: () => getUrl('/login_security'),

    // Auth routes
    signin: () => getUrl('/auth/signin'),
    signup: () => getUrl('/auth/signup'),
    forgotPassword: () => getUrl('/auth/forgot-password'),

    social: (type: SocialLinkTypes) => {
        switch (type) {
            case 'instagram':
                return 'https://www.instagram.com/vabvaofficial';
            case 'twitter':
                return 'https://twitter.com/vabvaofficial';
            case 'youtube':
                return 'https://www.youtube.com/channel/UCnRgnnitAfhh0yns29roMiA';
            case 'pinterest':
                return 'https://www.pinterest.co.uk/vabvaofficial';
            default:
                return '#';
        }
    }
} as const;

export const appConfig = Object.freeze({
    baseTitle: 'VABVA',
    basePath: 'https://vabva.com', // To construct canonical urls (at SSR we can't get access for window object)
    urls: appUrls
});

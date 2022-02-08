import React from 'react';
import clsx from 'clsx';

import { Instagram24Svg, Pinterest24Svg, Twitter24Svg, Youtube24Svg } from '~/assets/svg-icons/media';

import { appConfig, SocialLinkTypes } from '~/config/app.config';

export interface SocialNetLinkProps extends React.ComponentPropsWithoutRef<'a'> {
    type?: SocialLinkTypes;
    size?: 'large' | undefined;
}

const icons = {
    instagram: <Instagram24Svg />,
    twitter: <Twitter24Svg />,
    youtube: <Youtube24Svg />,
    pinterest: <Pinterest24Svg />
};

export const SocialNetLink = (props: SocialNetLinkProps) => {
    const { type = 'youtube', className, size = '', ...other } = props;

    const iconElement = icons[type];
    const pathname = appConfig.urls.social(type) || '#';

    if (!iconElement) {
        return null;
    }

    return (
        <a
            {...other}
            href={pathname}
            className={clsx('social-net-link', className, {
                [`social-net-link--${type}`]: type,
                'social-net-link--large': size === 'large'
            })}
        >
            {iconElement}
        </a>
    );
};

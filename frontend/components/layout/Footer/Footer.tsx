import React from 'react';
import clsx from 'clsx';
import { Container } from '@mui/material';

import { BrandWhite40Svg } from '~/assets/svg-icons/brand';
import { NextCustomPageLink } from '~/next-custom/PageLink';
import { appConfig } from '~/config/app.config';
import { SocialNetList } from '../SocialNet';

export interface FooterProps extends React.ComponentPropsWithoutRef<'footer'> {
    dense?: boolean;
}

export const Footer = (props: FooterProps) => {
    const { dense, className, ...other } = props;

    return (
        <footer
            {...other}
            className={clsx('footer', className, {
                'footer--dense': dense
            })}
        >
            <Container className="footer__layout">
                <NextCustomPageLink href={appConfig.urls.home()} componentProps={{ className: 'footer__brand-link' }}>
                    <BrandWhite40Svg className="footer__brand" />
                </NextCustomPageLink>
                <SocialNetList className="footer__social-net-list" />
            </Container>
        </footer>
    );
};

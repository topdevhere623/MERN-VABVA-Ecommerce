import React from 'react';
import clsx from 'clsx';

import { Container } from '@mui/material';
import { BrandBlack90Svg } from '~/assets/svg-icons/brand';
import { Footer } from '../Footer';

import styles from './AuthPage.module.scss';

export type AuthPageLayoutProps = React.ComponentPropsWithoutRef<'div'>;

export const AuthPageLayout = (props: AuthPageLayoutProps) => {
    const { children, className, ...other } = props;

    return (
        <div {...other} className={clsx('page auth-page', className)}>
            <main className={clsx('page__main', styles['auth-page__main'])}>
                <Container className={clsx(styles['auth-page__layout'])}>
                    <BrandBlack90Svg className={styles['auth-page__brand']} />
                    {children}
                </Container>
            </main>
            <Footer className="page__footer" />
        </div>
    );
};

import React from 'react';

import clsx from 'clsx';
import NextLink from 'next/link';
import { Container, Link } from '@mui/material';

import { Footer } from '~/components/layout/Footer';
import { NextCustomPageHead } from '~/next-custom/PageHead';
import { appConfig } from '~/config/app.config';

import styles from './Site404.module.scss';

export const Site404Page = () => {
    return (
        <div className="page">
            <NextCustomPageHead title="404 Page Not Found" />

            <main className={clsx('page__main', styles['not-found-container'])}>
                <Container>
                    <div className={styles['not-found']}>
                        <h1 className={styles['not-found__code']}>404</h1>
                        <div className={styles['not-found__content']}>
                            <h3 className={styles['not-found__title']}>Sorry, this page isn&apos;t available!</h3>

                            <NextLink href={appConfig.urls.home()} passHref>
                                <Link className={styles['not-found__link']}>Back to home</Link>
                            </NextLink>
                        </div>
                    </div>
                </Container>
            </main>
            <Footer className="page__footer" />
        </div>
    );
};

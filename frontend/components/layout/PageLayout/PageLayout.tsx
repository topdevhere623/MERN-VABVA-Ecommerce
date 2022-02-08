import React from 'react';
import clsx from 'clsx';

import { Container } from '@mui/material';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { SubHeader } from '../SubHeader';
import { MainMenu } from '../MainMenu';

export type PageLayoutProps = React.ComponentPropsWithoutRef<'div'>;

export const PageLayout = (props: PageLayoutProps) => {
    const { children, className, ...other } = props;

    return (
        <div {...other} className={clsx('page', className)}>
            <Header className="page__header" />
            <SubHeader />
            <MainMenu />
            <main className="page__main">
                <Container>{children}</Container>
            </main>
            <Footer className="page__footer" />
        </div>
    );
};

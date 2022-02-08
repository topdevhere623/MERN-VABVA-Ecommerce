import React from 'react';
import Link, { LinkProps } from 'next/link';

export interface NextCustomPageLinkProps extends Omit<LinkProps, 'children'> {
    children: React.ReactNode;
    componentProps?: React.ComponentPropsWithoutRef<'a'>;
}

export const NextCustomPageLink = React.forwardRef<HTMLAnchorElement, NextCustomPageLinkProps>(function PageLink(
    props,
    forwardedRef
) {
    const { children, componentProps, ...other } = props;

    return (
        <Link {...other}>
            <a {...componentProps} ref={forwardedRef}>
                {children}
            </a>
        </Link>
    );
});

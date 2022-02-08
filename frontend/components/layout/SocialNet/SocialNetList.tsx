import React from 'react';
import clsx from 'clsx';

import { SocialNetLink, SocialNetLinkProps } from './SocialNetLink';

export interface SocialNetListProps extends React.ComponentPropsWithoutRef<'ul'> {
    size?: SocialNetLinkProps['size'];
}

export const SocialNetList = (props: SocialNetListProps) => {
    const { className, size, ...other } = props;

    return (
        <ul {...other} className={clsx('social-net-list', className)}>
            <li>
                <SocialNetLink type="instagram" size={size} />
            </li>
            <li>
                <SocialNetLink type="twitter" size={size} />
            </li>
            <li>
                <SocialNetLink type="youtube" size={size} />
            </li>
            <li>
                <SocialNetLink type="pinterest" size={size} />
            </li>
        </ul>
    );
};

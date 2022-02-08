import React from 'react';

import { Container } from '@mui/material';
import { SubHeaderLocationField } from './SubHeaderLocationField';
import { SubHeaderSearchField } from './SubHeaderSearchField';
import { SubHeaderCategoryMenu } from './SubHeaderCategoryMenu';

export const SubHeader = () => {
    return (
        <div className="sub-header">
            <Container className="sub-header__container">
                <SubHeaderCategoryMenu />
                <SubHeaderLocationField defaultValue="London" />
                <SubHeaderSearchField placeholder="Search" />
            </Container>
        </div>
    );
};

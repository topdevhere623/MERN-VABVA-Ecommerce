import React from 'react';
import Head from 'next/head';

import { appConfig } from '~/config/app.config';

export interface NextCustomPageHeaderProps {
    ignoreBaseTitle?: boolean;
    title?: string;
    description?: string;
    schema?: string;
    canonical?: string;
    children?: React.ReactNode;
}

const getTitle = (title = '') => {
    let baseTitle: string | null = '';

    if (appConfig && appConfig?.baseTitle) {
        baseTitle = appConfig?.baseTitle ? String(appConfig?.baseTitle).trim() : null;
    }

    if (baseTitle && title) {
        return [baseTitle, title].join(' | ');
    }

    if (baseTitle) {
        return baseTitle;
    }

    return title;
};

const parseUrl = (url: string) => {
    return String(url).replace(/\/+/g, '/');
};

export const NextCustomPageHead = (props: NextCustomPageHeaderProps) => {
    const {
        ignoreBaseTitle = false,
        title: titleProp = '',
        description: descriptionProp = '',
        schema: schemaProp = '',
        canonical: canonicalProp = '',
        children
    } = props;

    const title = !ignoreBaseTitle ? getTitle(String(titleProp).trim()) : String(titleProp).trim();
    const schema = String(schemaProp).trim();
    const description = String(descriptionProp).trim();

    let canonical = String(canonicalProp).trim();
    canonical = parseUrl(canonical);

    const titleElement = title ? <title>{title}</title> : null;

    const descriptionElement = description ? <meta name="description" content={description} /> : null;

    const schemaScript =
        schema.length > 4 ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} /> : null;

    const canonicalLink = canonical ? <link rel="canonical" href={canonical} /> : null;

    return (
        <Head>
            {titleElement}
            {descriptionElement}
            {schemaScript}
            {canonicalLink}
            {children}
        </Head>
    );
};

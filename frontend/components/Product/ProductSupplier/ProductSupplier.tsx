import React, { useState } from 'react';

import clsx from 'clsx';
import NextImage from 'next/image';
import { FormControlLabel, Rating, useEventCallback } from '@mui/material';

export interface ProductSupplierProps extends React.ComponentPropsWithoutRef<'div'> {
    title: string;
    image?: string;
    rating?: number;
    size?: 'small' | 'medium';
}

export const ProductSupplier = (props: ProductSupplierProps) => {
    const { size = 'small', title, image: imageProp, rating, className, ...other } = props;
    const [image, setImage] = useState<string | null | undefined>(imageProp);

    const handleImageError = useEventCallback(() => {
        setImage(null);
    });

    // Render

    let ratingNumber = rating ? Number.parseFloat(String(rating)) : 0;
    ratingNumber = Math.round(Math.ceil(ratingNumber * 10)) / 10;

    let imageSize = 60;
    if (size === 'medium') {
        imageSize = 70;
    }

    return (
        <div
            {...other}
            className={clsx(
                'product-supplier',
                {
                    'product-supplier--size-small': size === 'small'
                },
                className
            )}
        >
            {image && (
                <div className="product-supplier__img">
                    <NextImage
                        src={image}
                        objectFit="cover"
                        objectPosition="center"
                        width={imageSize}
                        height={imageSize}
                        quality={100}
                        onError={handleImageError}
                    />
                </div>
            )}

            <div className="product-supplier__body">
                <h6 className="product-supplier__title">{title}</h6>
                <FormControlLabel
                    label={ratingNumber ? ratingNumber : ''}
                    labelPlacement="end"
                    className="product-supplier__rating-container"
                    control={<Rating value={ratingNumber} size="small" readOnly />}
                />
            </div>
        </div>
    );
};

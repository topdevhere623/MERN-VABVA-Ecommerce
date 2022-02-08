import React from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';

export type PriceFormatTextProps = NumberFormatProps;

export const PriceFormatText = (props: PriceFormatTextProps) => {
    return <NumberFormat {...props} decimalSeparator="." prefix="£" displayType="text" />;
};

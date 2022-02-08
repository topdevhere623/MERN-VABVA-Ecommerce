import React, { useState } from 'react';

import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { InputBaseComponentProps, useEventCallback } from '@mui/material';

export const VefificationCodeFormatInput = React.forwardRef<HTMLInputElement, InputBaseComponentProps>(
    function VefificationCodeFormatInput(props, forwardedRef) {
        return (
            <NumberFormat
                {...(props as unknown)}
                getInputRef={forwardedRef}
                isNumericString
                format="####"
                placeholder="0000"
                mask="_"
                allowEmptyFormatting={false}
            />
        );
    }
);

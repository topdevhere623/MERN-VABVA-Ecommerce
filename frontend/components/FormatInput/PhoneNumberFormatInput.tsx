import React from 'react';

import NumberFormat from 'react-number-format';
import { InputBaseComponentProps } from '@mui/material';

export const PhoneNumberFormatInput = React.forwardRef<HTMLInputElement, InputBaseComponentProps>(
    function PhoneNumberFormatInput(props, forwardedRef) {
        return (
            <NumberFormat
                {...(props as unknown)}
                getInputRef={forwardedRef}
                format="+############"
                mask=""
                allowEmptyFormatting={false}
            />
        );
    }
);

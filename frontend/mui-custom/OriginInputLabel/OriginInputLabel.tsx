import React, { useMemo } from 'react';
import clsx from 'clsx';
import { FormLabel as MuiFormLabel, FormLabelProps as MuiFormLabelProps } from '@mui/material';

export interface MuiCustomOriginalInputLabelProps extends MuiFormLabelProps {
    textJustify?: 'start' | 'end';
    width?: string;
}

export const MuiCustomOriginalInputLabel = React.forwardRef<HTMLLabelElement, MuiCustomOriginalInputLabelProps>(
    function MuiCustomOriginalInputLabel(props, forwardedRef) {
        const { className: classNameProp, style: styleProp, width, textJustify, ...other } = props;

        const className = useMemo(() => {
            return clsx('MuiCustomOriginalInputLabel', classNameProp, {
                'MuiCustomOriginalInputLabel-justifyEnd': textJustify === 'end'
            });
        }, [classNameProp, textJustify]);

        const style = useMemo(() => {
            return { ...styleProp, ...(width && { width }) };
        }, [styleProp, width]);

        return <MuiFormLabel {...other} className={className} style={style} ref={forwardedRef} />;
    }
);

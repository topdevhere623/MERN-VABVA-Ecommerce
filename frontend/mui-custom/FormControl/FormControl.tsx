import React, { useMemo } from 'react';
import clsx from 'clsx';
import { FormControl as MuiFormControl, FormControlProps as MuiFormControlProps } from '@mui/material';

export interface MuiCustomFormControlProps extends MuiFormControlProps {
    labelAlign?: 'top' | 'left';
}

const classNamesKeyMap = {
    top: 'MuiCustomFormControl-labelAlignTop',
    left: 'MuiCustomFormControl-labelAlignLeft'
} as Record<Required<MuiCustomFormControlProps>['labelAlign'], string>;

export const MuiCustomFormControl = React.forwardRef<HTMLDivElement, MuiCustomFormControlProps>(
    function MuiCustomFormControl(props, forwardedRef) {
        const { className: classNameProp, labelAlign = 'top', ...other } = props;

        const className = useMemo(() => {
            return clsx('MuiCustomFormControl', classNameProp, classNamesKeyMap[labelAlign]);
        }, [classNameProp, labelAlign]);

        return <MuiFormControl className={className} {...other} ref={forwardedRef} />;
    }
);

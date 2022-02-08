import React from 'react';
import clsx from 'clsx';
import {
    TextFieldProps as MuiTextFieldProps,
    BaseTextFieldProps as MuiBaseTextFieldProps,
    Input as MuiInput,
    FilledInput as MuiFilledInput,
    OutlinedInput as MuiOutlinedInput,
    InputLabel as MuiInputLabel,
    Select as MuiSelect,
    FormControl as MuiFormControl,
    FormHelperText as MuiFormHelperText,
    unstable_composeClasses,
    getTextFieldUtilityClass,
    styled,
    useThemeProps
} from '@mui/material';

import { MuiCustomFormControl, MuiCustomFormControlProps } from '../FormControl';
import { MuiCustomOriginalInput, MuiCustomOriginalInputProps } from '../OriginalInput';
import { MuiCustomOriginalInputLabel } from '../OriginInputLabel';
import { MuiCustomOriginalInputLabelProps } from '../OriginInputLabel';

type ExtendedProps = Omit<MuiBaseTextFieldProps, 'variant'>;

export interface MuiCustomOriginalTextFieldProps extends ExtendedProps {
    variant?: 'original';
    labelAlign?: MuiCustomFormControlProps['labelAlign'];
    labelTextJustify?: MuiCustomOriginalInputLabelProps['textJustify'];
    labelWidth?: MuiCustomOriginalInputLabelProps['width'];
    InputProps?: Partial<MuiCustomOriginalInputProps>;
    onChange?: MuiCustomOriginalInputProps['onChange'];
}

export type MuiCustomTextFieldProps =
    | MuiCustomOriginalTextFieldProps
    | (MuiTextFieldProps & Pick<MuiCustomOriginalTextFieldProps, 'labelAlign' | 'labelTextJustify' | 'labelWidth'>);

const variantComponent = {
    original: MuiCustomOriginalInput,
    standard: MuiInput,
    filled: MuiFilledInput,
    outlined: MuiOutlinedInput
} as const;

const useUtilityClasses = (styleProps: MuiCustomTextFieldProps) => {
    const { classes } = styleProps;

    const slots = {
        root: ['root']
    };

    return unstable_composeClasses(slots, getTextFieldUtilityClass, classes);
};

const TextFieldRoot = styled(MuiFormControl, {
    name: 'MuiTextField',
    slot: 'Root',
    overridesResolver: (props, styles) => styles.root
})({});

export const MuiCustomTextField = React.forwardRef<HTMLDivElement, MuiCustomTextFieldProps>(function MuiCustomTextField(
    inProps,
    forwardedRef
) {
    const props = useThemeProps({ props: inProps, name: 'MuiTextField' });

    const {
        variant = 'outlined',
        labelAlign,
        labelTextJustify,
        labelWidth,
        autoComplete,
        autoFocus = false,
        children,
        className,
        color = 'primary',
        defaultValue,
        disabled = false,
        error = false,
        FormHelperTextProps,
        fullWidth = false,
        helperText,
        id,
        InputLabelProps,
        inputProps,
        InputProps,
        inputRef,
        label,
        maxRows,
        minRows,
        multiline = false,
        name,
        onBlur,
        onChange,
        onFocus,
        placeholder,
        required = false,
        rows,
        select = false,
        SelectProps,
        type,
        value,
        ...other
    } = inProps;

    const styleProps = {
        ...props,
        autoFocus,
        color,
        disabled,
        error,
        fullWidth,
        multiline,
        required,
        select,
        variant
    } as MuiTextFieldProps;

    const classes = useUtilityClasses(styleProps);

    if (process.env.NODE_ENV !== 'production') {
        if (select && !children) {
            console.error('Material-UI: `children` must be passed when using the `TextField` component with `select`.');
        }
    }

    const InputMore = {} as {
        notched?: boolean;
        label?: React.ReactNode;
        id?: string;
        'aria-describedby'?: string;
    };

    if (variant === 'outlined') {
        if (InputLabelProps && typeof InputLabelProps?.shrink !== 'undefined') {
            InputMore.notched = InputLabelProps.shrink;
        }
        if (label) {
            const displayRequired = InputLabelProps?.required ?? required;
            InputMore.label = (
                <React.Fragment>
                    {label}
                    {displayRequired && '\u00a0*'}
                </React.Fragment>
            );
        }
    }

    if (variant === 'original' && InputLabelProps?.shrink) {
        delete InputLabelProps?.shrink;
    }

    if (select) {
        // unset defaults from textbox inputs
        if (!SelectProps || !SelectProps.native) {
            InputMore.id = undefined;
        }
        InputMore['aria-describedby'] = undefined;
    }

    const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
    const inputLabelId = label && id ? `${id}-label` : undefined;

    const TextFieldRootComponent = variant === 'original' ? MuiCustomFormControl : TextFieldRoot;
    const InputComponent = variantComponent[variant];
    const InputLabelComponent = variant === 'original' ? MuiCustomOriginalInputLabel : MuiInputLabel;

    const OriginalFormControlMore: Record<string, unknown> = {};
    const OriginalInputLabelMore: Record<string, unknown> = {};

    if (props.variant === 'original') {
        if (labelAlign) {
            OriginalFormControlMore['labelAlign'] = labelAlign;
        }
        if (labelTextJustify) {
            OriginalInputLabelMore['textJustify'] = labelTextJustify;
        }
        if (labelWidth) {
            OriginalInputLabelMore['width'] = labelWidth;
        }
    }

    const InputElement = (
        <InputComponent
            aria-describedby={helperTextId}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            defaultValue={defaultValue}
            fullWidth={fullWidth}
            multiline={multiline}
            name={name}
            rows={rows}
            maxRows={maxRows}
            minRows={minRows}
            type={type}
            value={value}
            id={id}
            inputRef={inputRef}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            placeholder={placeholder}
            inputProps={inputProps}
            {...InputMore}
            {...InputProps}
        />
    );

    return (
        <TextFieldRootComponent
            className={clsx(classes.root, className)}
            disabled={disabled}
            error={error}
            fullWidth={fullWidth}
            ref={forwardedRef}
            required={required}
            color={color}
            {...(variant !== 'original' && { variant })}
            {...OriginalFormControlMore}
            {...other}
        >
            {label && (
                <InputLabelComponent htmlFor={id} id={inputLabelId} {...InputLabelProps} {...OriginalInputLabelMore}>
                    {label}
                </InputLabelComponent>
            )}

            {select ? (
                <MuiSelect
                    aria-describedby={helperTextId}
                    id={id}
                    labelId={inputLabelId}
                    value={value}
                    input={InputElement}
                    {...SelectProps}
                >
                    {children}
                </MuiSelect>
            ) : (
                InputElement
            )}

            {helperText && (
                <MuiFormHelperText id={helperTextId} {...FormHelperTextProps}>
                    {helperText}
                </MuiFormHelperText>
            )}
        </TextFieldRootComponent>
    );
});

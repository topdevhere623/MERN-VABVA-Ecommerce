import React from 'react';
import clsx from 'clsx';

import {
    AutocompleteProps,
    AutocompleteRenderInputParams,
    AutocompleteGroupedOption,
    Chip,
    CircularProgress,
    Icon,
    IconButton,
    InputAdornment,
    useAutocomplete,
    PaperProps
} from '@mui/material';

// The reason of direct import here is: https://github.com/mui-org/material-ui/issues/10857#issuecomment-488877520
import Clear from '@mui/icons-material/Clear';
import { ChevronDownSvg } from '../../assets/svg-icons/feather';

import { MuiCustomTextFieldProps } from '../TextField';

import { MuiCustomAutocompleteListItem } from './AutocompleteListItem';
import { MuiCustomAutocompleteList, MuiCustomAutocompleteListProps } from './AutocompleteList';
import { MuiCustomAutocompletePopper, MuiCustomAutocompletePopperProps } from './AutocompletePopper';
import { MuiCustomAutocompleteListItemText } from './AutocompleteListItemText';
import { MuiCustomAutocompleteInputContainer, MuiCustomAutocompleteInputContainerProps } from './AutocompleteInputContainer';
import { MuiCustomAutocompleteListGroup } from './AutocompleteListGroup';

type DefaultOption = { label: string } | string;

export interface MuiCustomAutocompleteRenderInputParams
    extends Omit<AutocompleteRenderInputParams, 'inputProps' | 'InputProps' | 'InputLabelProps'> {
    InputLabelProps?: MuiCustomTextFieldProps['InputLabelProps'];
    InputProps?: MuiCustomTextFieldProps['InputProps'] & {
        inputComponent?: React.ElementType<MuiCustomAutocompleteInputContainerProps>;
    };
    inputProps?: ReturnType<ReturnType<typeof useAutocomplete>['getInputProps']> & {
        tags?: React.ReactNode;
    };
}

export interface MuiCustomAutocompleteProps<
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
> extends Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'> {
    renderInput: (params: MuiCustomAutocompleteRenderInputParams) => React.ReactNode;
    loading?: boolean;
    remoteFilter?: boolean;
    ListProps?: MuiCustomAutocompleteListProps & Pick<MuiCustomAutocompletePopperProps, 'autoWidth'>;
    PaperProps?: PaperProps;
}

function defaultGetOptionLabel(option: DefaultOption) {
    if (typeof option === 'string') {
        return option;
    }

    return option?.label ?? '';
}

function MuiCustomAutocompleteWithRef<
    T extends DefaultOption,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined
>(props: MuiCustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, forwardedRef: React.Ref<HTMLDivElement>) {
    const {
        renderInput,
        renderOption: renderOptionProp,
        renderTags,
        renderGroup: renderGroupProp,
        getOptionLabel = defaultGetOptionLabel,
        loading,
        remoteFilter,
        filterOptions = remoteFilter ? (x) => x : undefined,
        groupBy,
        multiple = false,
        freeSolo = false,
        forcePopupIcon = 'auto',
        className,
        disabled = false,
        disableClearable = false,
        fullWidth = false,
        ListProps,
        ChipProps,
        PaperProps: PaperPropsProp,
        style,

        clearIcon = <Clear />,
        popupIcon = (
            <Icon>
                <ChevronDownSvg />
            </Icon>
        )
    } = props;

    const {
        getRootProps,
        getInputProps,
        getInputLabelProps,
        getClearProps,
        getPopupIndicatorProps,
        getListboxProps,
        getOptionProps,
        getTagProps,

        id,
        value,
        dirty,
        inputValue,
        popupOpen,
        anchorEl,
        setAnchorEl,
        groupedOptions
    } = useAutocomplete({
        filterOptions,
        ...props,
        componentName: 'MuiCustomAutocomplete'
    });

    const hasClearIcon = !disableClearable && !disabled && dirty;
    const hasPopupIcon = (!freeSolo || forcePopupIcon === true) && forcePopupIcon !== false;
    let tags: React.ReactNode = null;

    const inputStartAdornment: React.ReactNode = null;
    const inputEndAdornment: React.ReactNode = (hasClearIcon || hasPopupIcon || loading) && (
        <InputAdornment position="end">
            {loading ? <CircularProgress /> : null}
            {hasClearIcon && !loading ? (
                <IconButton
                    size="small"
                    className="MuiIconButton-dense MuiIconButton-circular"
                    {...(getClearProps() as unknown)}
                >
                    {clearIcon}
                </IconButton>
            ) : null}
            {hasPopupIcon && !loading ? (
                <IconButton
                    size="small"
                    className="MuiIconButton-dense MuiIconButton-circular"
                    sx={{ ...(popupOpen && { transform: 'rotate(180deg)' }) }}
                    {...(getPopupIndicatorProps() as unknown)}
                >
                    {popupIcon}
                </IconButton>
            ) : null}
        </InputAdornment>
    );

    if (multiple && Array.isArray(value) && value.length > 0) {
        const getCustomizedChipProps = (params: { index: number }) => {
            return {
                className: 'MuiCustomAutocomplete-chip',
                disabled,
                ...getTagProps(params)
            };
        };

        if (renderTags) {
            tags = renderTags(value as T[], getCustomizedChipProps);
        } else {
            tags = value.map((option, index) => {
                return (
                    // eslint-disable-next-line react/jsx-key
                    <Chip label={getOptionLabel(option as T)} {...getCustomizedChipProps({ index })} {...ChipProps} />
                );
            });
        }
    }

    const hasTags = Array.isArray(tags) && tags.length > 0;

    const inputElement = renderInput({
        id,
        disabled,
        fullWidth: true,
        size: undefined,
        InputLabelProps: {
            ...getInputLabelProps(),
            ...(hasTags && { shrink: true })
        },
        InputProps: {
            ref: setAnchorEl,
            className: 'MuiCustomAutocomplete-inputBase',
            startAdornment: inputStartAdornment || null,
            endAdornment: inputEndAdornment || null,
            ...(multiple && { inputComponent: MuiCustomAutocompleteInputContainer })
        },
        inputProps: {
            ...getInputProps(),
            ...(multiple && hasTags && { tags })
        }
    });

    const defaultRenderOption: typeof renderOptionProp = (params, option) => (
        <MuiCustomAutocompleteListItem {...params}>
            <MuiCustomAutocompleteListItemText>{getOptionLabel(option)}</MuiCustomAutocompleteListItemText>
        </MuiCustomAutocompleteListItem>
    );
    const renderOption = renderOptionProp || defaultRenderOption;

    const renderListOption = (option: T, index: number) => {
        const optionProps = getOptionProps({ option, index });

        return renderOption(optionProps, option, {
            selected: !!optionProps['aria-selected'],
            inputValue
        });
    };

    const defaultRenderGroup: typeof renderGroupProp = (params) => {
        const { group, key, children } = params;

        return [<MuiCustomAutocompleteListGroup key={key}>{group}</MuiCustomAutocompleteListGroup>, children];
    };
    const renderGroup = renderGroupProp || defaultRenderGroup;

    const shouldDisplayList = groupedOptions.length > 0;
    const { autoWidth: paperAutoWidth, ...otherListProps } = ListProps || {};

    return (
        <div
            className={clsx('MuiCustomAutocomplete', className, {
                'MuiCustomAutocomplete-fullWidth': fullWidth
            })}
            style={style}
            {...getRootProps()}
            ref={forwardedRef}
        >
            {inputElement}

            <MuiCustomAutocompletePopper
                open={popupOpen}
                anchorEl={anchorEl}
                autoWidth={paperAutoWidth}
                PaperProps={PaperPropsProp}
            >
                {shouldDisplayList && (
                    <MuiCustomAutocompleteList {...getListboxProps()} {...otherListProps}>
                        {groupedOptions.map((option, index) => {
                            if (groupBy) {
                                const groupedOption = option as AutocompleteGroupedOption<T>;

                                return renderGroup({
                                    key: String(groupedOption.key),
                                    group: groupedOption.group,
                                    children: groupedOption.options.map((item, index2) => {
                                        const optionIndex = groupedOption.index + index2;

                                        return renderListOption(item, optionIndex);
                                    })
                                });
                            }

                            return renderListOption(option as T, index);
                        })}
                    </MuiCustomAutocompleteList>
                )}
            </MuiCustomAutocompletePopper>
        </div>
    );
}

export const MuiCustomAutocomplete = React.forwardRef(MuiCustomAutocompleteWithRef) as <
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
>(
    props: MuiCustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> & {
        ref?: React.Ref<HTMLDivElement>;
    }
) => JSX.Element | null;

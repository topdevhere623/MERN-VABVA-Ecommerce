import React, { useEffect, useRef, useState } from 'react';

import {
    useEventCallback,
    AutocompleteInputChangeReason,
    AutocompleteChangeReason,
    FilterOptionsState
} from '@mui/material';
import { useFormikContext } from 'formik';

import { MuiCustomAutocomplete, MuiCustomAutocompleteListItem } from '~/mui-custom/Autocomplete';
import { MuiCustomTextField } from '~/mui-custom/TextField';
import { ICountryPhoneCode } from '~/api/country.api';

export interface PhoneFieldProps {
    countries?: ICountryPhoneCode[];
    countryInputRef?: React.Ref<HTMLInputElement>;
    phoneInputRef?: React.Ref<HTMLInputElement>;
}

// Source of original function: https://github.com/mui-org/material-ui/blob/b6977280a603551ff0e5412982b1464b48805cbf/packages/mui-core/src/AutocompleteUnstyled/useAutocomplete.js#L18
const customFilterOptions = <T extends ICountryPhoneCode>(data: T[], state: FilterOptionsState<T>) => {
    const { inputValue, getOptionLabel } = state;

    let input = inputValue.trim();
    input = input.toLowerCase();
    input = '+' + input.replace('+', '');

    return data.filter((option) => {
        let candidate = getOptionLabel(option);
        candidate = candidate.toLowerCase();

        return candidate.indexOf(input) === 0;
    });
};

const validateCounryCodeInput = (value = '') => {
    return value.trim() === '' || /^\+?([0-9]+)?$/g.test(value);
};

const validatePhoneNumberInput = (value = '') => {
    return value.trim() === '' || /^[0-9]{0,10}$/g.test(value);
};

export const PhoneField = (props: PhoneFieldProps) => {
    const { countries = [], countryInputRef } = props;

    const [countryCodeInputValue, setCountryCodeInputValue] = useState('');
    const [countryCodeValue, setCountryCodeValue] = useState<ICountryPhoneCode>();
    const [phoneNumberValue, setPhoneNumberValue] = useState('');
    const phoneNumberRef = useRef<HTMLInputElement>(null);

    const formikCtx = useFormikContext();

    const handleCountryCodeInputChange = useEventCallback(
        (ev: React.SyntheticEvent, newValue: string, reason: AutocompleteInputChangeReason) => {
            if (validateCounryCodeInput(newValue)) {
                setCountryCodeInputValue(newValue);
            }
        }
    );

    const handleCountryCodeChange = useEventCallback(
        (
            ev: React.SyntheticEvent,
            newValue: ICountryPhoneCode | (string | ICountryPhoneCode)[] | string | null,
            reason: AutocompleteChangeReason
        ) => {
            if (newValue) {
                setCountryCodeValue(newValue as ICountryPhoneCode);

                if (formikCtx) {
                    formikCtx.setFieldValue('country', newValue);
                }
            }
        }
    );

    const handlePhoneNumberChange = useEventCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const value = ev.target.value;

        if (validatePhoneNumberInput(value)) {
            setPhoneNumberValue(value);

            if (formikCtx) {
                formikCtx.setFieldTouched('phone', true);
                formikCtx.setFieldValue('phone', value);
            }
        }
    });

    useEffect(() => {
        if (countryCodeValue && phoneNumberRef.current) {
            phoneNumberRef.current.focus();
            phoneNumberRef.current.select();
        }
    }, [countryCodeValue]);

    return (
        <div className="MuiCustomInputGroup MuiCustomInputGroup-outlined">
            <MuiCustomAutocomplete
                autoHighlight
                autoSelect
                forcePopupIcon={false}
                disableClearable
                openOnFocus
                inputValue={countryCodeInputValue}
                options={countries}
                filterOptions={customFilterOptions}
                getOptionLabel={(option) => {
                    return '+' + option.phone_code;
                }}
                isOptionEqualToValue={(option, value) => option._id === value._id}
                renderInput={(inputProps) => {
                    return (
                        <MuiCustomTextField
                            {...inputProps}
                            label="Country code"
                            InputLabelProps={{ shrink: true }}
                            required
                            fullWidth
                            inputRef={countryInputRef}
                        />
                    );
                }}
                renderOption={(listProps, option) => {
                    const { _id, name, phone_code, iso2 } = option;
                    const flagName = iso2 && iso2.toLowerCase();

                    return (
                        <MuiCustomAutocompleteListItem {...listProps} key={_id}>
                            <span className="u-text-strong u-text-no-wrap">{`+${phone_code}`}</span>
                            {flagName && (
                                // Source: https://flagpedia.net/download/api
                                <img
                                    loading="lazy"
                                    width="20"
                                    src={`https://flagcdn.com/${flagName}.svg`}
                                    alt={iso2}
                                    className="u-margin-l-8"
                                />
                            )}
                            <span className="u-margin-l-8" style={{ flex: 1 }}>
                                {name}
                            </span>
                        </MuiCustomAutocompleteListItem>
                    );
                }}
                ListProps={{
                    maxHeight: '26rem'
                }}
                PaperProps={{
                    style: { minWidth: '34rem' }
                }}
                style={{ maxWidth: '13rem' }}
                onInputChange={handleCountryCodeInputChange}
                onChange={handleCountryCodeChange}
            />
            <MuiCustomTextField
                fullWidth
                required
                value={phoneNumberValue}
                label="Phone number"
                InputLabelProps={{ shrink: true }}
                inputRef={phoneNumberRef}
                onChange={handlePhoneNumberChange}
            />
        </div>
    );
};

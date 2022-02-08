import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';
import {
    FormHelperText,
    useEventCallback,
    AutocompleteInputChangeReason,
    AutocompleteChangeReason,
    FilterOptionsState
} from '@mui/material';

import { CountryApi, ICountryPhoneCode } from '~/api/country.api';
import { MuiCustomAutocomplete, MuiCustomAutocompleteListItem } from '~/mui-custom/Autocomplete';
import { useMountedRef } from '~/mui-custom/utils';
import { MuiCustomTextField } from '~/mui-custom/TextField';

export default {
    title: 'App/PhoneField'
} as Meta;

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

export const PhoneField: Story = () => {
    const [options, setOptions] = useState<ICountryPhoneCode[]>([]);
    const [countryCodeInputValue, setCountryCodeInputValue] = useState('');
    const [countryCodeValue, setCountryCodeValue] = useState<ICountryPhoneCode>();
    const [phoneNumberValue, setPhoneNumberValue] = useState('');
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const mountedRef = useMountedRef();

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
            if (reason === 'selectOption' && newValue) {
                setCountryCodeValue(newValue as ICountryPhoneCode);
            }
        }
    );

    const handlePhoneNumberChange = useEventCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        const value = ev.target.value;

        if (validatePhoneNumberInput(value)) {
            setPhoneNumberValue(value);
        }
    });

    const fetchCountries = useCallback(async () => {
        try {
            const response = await CountryApi.getCountryPhoneCodes();

            if (response && mountedRef.current) {
                setOptions(response);
            }
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.name, e.message);
            }
        }
    }, [mountedRef]);

    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    useEffect(() => {
        if (countryCodeValue && phoneNumberRef.current) {
            phoneNumberRef.current.focus();
            phoneNumberRef.current.select();
        }
    }, [countryCodeValue]);

    return (
        <div style={{ width: '100%', maxWidth: '56rem', margin: '0 auto' }}>
            <div className="MuiCustomInputGroup MuiCustomInputGroup-outlined">
                <MuiCustomAutocomplete
                    autoHighlight
                    autoSelect
                    forcePopupIcon
                    disableClearable
                    openOnFocus
                    inputValue={countryCodeInputValue}
                    options={options}
                    filterOptions={customFilterOptions}
                    getOptionLabel={(option) => {
                        return '+' + option.phone_code;
                    }}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    renderInput={(inputProps) => {
                        return (
                            <MuiCustomTextField
                                {...inputProps}
                                variant="outlined"
                                label="Country code"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                            />
                        );
                    }}
                    renderOption={(listProps, option) => {
                        const { _id, name, phone_code, iso2 } = option;
                        return (
                            <MuiCustomAutocompleteListItem {...listProps} key={_id}>
                                <span className="u-text-strong u-text-no-wrap">{`+${phone_code}`}</span>
                                {iso2 && (
                                    <img
                                        loading="lazy"
                                        width="20"
                                        src={`https://flagcdn.com/${iso2.toLowerCase()}.svg`}
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
                    style={{ maxWidth: '12rem' }}
                    onInputChange={handleCountryCodeInputChange}
                    onChange={handleCountryCodeChange}
                />
                <MuiCustomTextField
                    fullWidth
                    value={phoneNumberValue}
                    variant="outlined"
                    label="Phone number"
                    InputLabelProps={{ shrink: true }}
                    inputRef={phoneNumberRef}
                    onChange={handlePhoneNumberChange}
                />
            </div>
            <FormHelperText>Sign up with your mobile number.</FormHelperText>
        </div>
    );
};

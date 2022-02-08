import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import _debonce from 'lodash/debounce';

import {
    Autocomplete,
    AutocompleteInputChangeReason,
    Avatar,
    Icon,
    InputAdornment,
    Stack,
    Checkbox,
    useEventCallback,
    createFilterOptions
} from '@mui/material';

import {
    MuiCustomAutocomplete,
    MuiCustomAutocompleteListItemText,
    MuiCustomAutocompleteListItem,
    MuiCustomAutocompleteListItemAvatar,
    MuiCustomAutocompleteListItemIcon
} from '~/mui-custom/Autocomplete';
import { MuiCustomTextField } from '~/mui-custom/TextField';
import { MuiCustomHighlighter } from '~/mui-custom/Highlighter';
import { useMountedRef, loadScript } from '~/mui-custom/utils';
import { fakeRequest } from '~/api/utils';

import { FilmSvg, MapPinSvg } from '../../assets/svg-icons/feather';

import topFilmsRawData from '../assets/data/top-films.json';

export default {
    title: 'mui-custom/Autocomplete',
    component: Autocomplete
} as Meta;

interface Film {
    title: string;
    year: number;
    image?: string;
}

export const AsynchronousRequest: Story = () => {
    const [open, setOpen] = useState(false);
    const [defaultOptions] = useState<readonly Film[]>(topFilmsRawData);
    const [options, setOptions] = useState<readonly Film[]>(defaultOptions);
    const [loading, setLoading] = useState(false);
    const isMountedRef = useMountedRef();

    const fetch = useCallback(
        async (query?: string) => {
            if (query) {
                setLoading(true);

                let response = await fakeRequest<Film[]>(topFilmsRawData, {
                    delay: 300
                });

                const filterFn = createFilterOptions<Film>({ limit: 25 });

                response = filterFn(response, {
                    inputValue: query,
                    getOptionLabel: (option) => option.title
                });

                if (isMountedRef.current) {
                    setOptions(response);
                    setLoading(false);
                }
            }
        },
        [isMountedRef]
    );

    const handleOpen = useEventCallback(() => {
        setOpen(true);
    });

    const handleClose = useEventCallback(() => {
        setOpen(false);
    });

    const handleInputChange = useMemo(() => {
        return _debonce((ev: React.SyntheticEvent, newValue: string, reason: AutocompleteInputChangeReason) => {
            if (reason === 'input' && newValue.length > 0) {
                fetch(newValue);
            } else {
                setOptions(defaultOptions);
            }
        }, 300);
    }, [fetch, defaultOptions]);

    const shouldPopupOpen = open && options.length > 0;

    return (
        <Stack direction="column" alignItems="flex-start" spacing={10} sx={{ maxWidth: '40rem' }}>
            <MuiCustomAutocomplete
                open={shouldPopupOpen}
                fullWidth
                openOnFocus
                remoteFilter
                loading={loading}
                forcePopupIcon={false}
                onOpen={handleOpen}
                onClose={handleClose}
                onInputChange={handleInputChange}
                options={options}
                getOptionLabel={(option) => {
                    return typeof option === 'string' ? option : option.title;
                }}
                isOptionEqualToValue={(option, value) => option.title.trim() === value.title.trim()}
                renderInput={(params) => {
                    return (
                        <MuiCustomTextField
                            {...params}
                            variant="original"
                            label="Favorite film"
                            placeholder="Start typing: The ..."
                            helperText="Min length of query: 3 characters."
                        />
                    );
                }}
                renderOption={(params, option, state) => {
                    const { title, year, image } = option;
                    const { inputValue } = state;

                    return (
                        <MuiCustomAutocompleteListItem {...params}>
                            <MuiCustomAutocompleteListItemAvatar>
                                {image ? (
                                    <Avatar src={image} imgProps={{ loading: 'lazy', alt: title }} variant="rounded" />
                                ) : (
                                    <Avatar variant="rounded">
                                        <Icon fontSize="large">
                                            <FilmSvg />
                                        </Icon>
                                    </Avatar>
                                )}
                            </MuiCustomAutocompleteListItemAvatar>
                            <MuiCustomAutocompleteListItemText
                                primary={
                                    inputValue.length ? <MuiCustomHighlighter text={title} query={inputValue} /> : title
                                }
                                secondary={String(year)}
                            />
                        </MuiCustomAutocompleteListItem>
                    );
                }}
            />
        </Stack>
    );
};

// Google Map Place
// Docs:
// - https://developers.google.com/maps/documentation/javascript/places-autocomplete#add-autocomplete
// - https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletePrediction

export const GoogleMapPlace: Story = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<google.maps.places.AutocompletePrediction[]>([]);
    const googlePlaceAutocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
    const isMountedRef = useMountedRef();

    const isValidQueryLength = (query: string) => {
        return query.length >= 3;
    };

    const fetchPlace = useMemo(() => {
        return _debonce((query: string) => {
            if (window?.google && !googlePlaceAutocompleteService.current) {
                googlePlaceAutocompleteService.current = new google.maps.places.AutocompleteService();
            }

            if (!isValidQueryLength(query)) {
                setOptions([]);
                return;
            }

            if (googlePlaceAutocompleteService.current) {
                setLoading(true);

                googlePlaceAutocompleteService.current.getPlacePredictions({ input: query }, (result) => {
                    if (!isMountedRef.current) {
                        return;
                    }

                    if (Array.isArray(result)) {
                        setOptions(result);
                    } else {
                        setOptions([]);
                    }

                    setLoading(false);
                });
            }
        }, 300);
    }, [isMountedRef]);

    const handleInputValueChange = useEventCallback(
        (ev: React.SyntheticEvent, newValue: string, reason: AutocompleteInputChangeReason) => {
            if (reason === 'input') {
                fetchPlace(newValue);
            } else if (reason === 'clear') {
                setOptions([]);
            }
        }
    );

    const handlePopupOpen = useEventCallback(() => {
        setOpen(true);
    });

    const handlePopupClose = useEventCallback(() => {
        setOpen(false);
    });

    useEffect(() => {
        loadScript(
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyBXw_smmk72DTrF1vabIzZ7-iNCUKoTiJ0&libraries=places',
            'google-map'
        );
    }, []);

    const shouldPopupOpen = open && options.length > 0;

    return (
        <div style={{ maxWidth: '40rem' }} tabIndex={1}>
            <MuiCustomAutocomplete
                open={shouldPopupOpen}
                fullWidth
                forcePopupIcon={false}
                remoteFilter
                loading={loading}
                options={options}
                getOptionLabel={(option) => {
                    return typeof option === 'string' ? option : option?.description;
                }}
                isOptionEqualToValue={(option, value) => {
                    return option.place_id.trim() === value.place_id.trim();
                }}
                renderInput={(inputProps) => {
                    return (
                        <MuiCustomTextField
                            {...inputProps}
                            variant="original"
                            placeholder="Search a location"
                            InputProps={{
                                ...inputProps.InputProps,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon>
                                            <MapPinSvg />
                                        </Icon>
                                    </InputAdornment>
                                )
                            }}
                        />
                    );
                }}
                renderOption={(listItemParams, option, state) => {
                    const { structured_formatting } = option;
                    const primaryText = structured_formatting.main_text;
                    const secondaryText = structured_formatting.secondary_text;
                    const { inputValue } = state;

                    return (
                        <MuiCustomAutocompleteListItem {...listItemParams}>
                            <MuiCustomAutocompleteListItemIcon>
                                <Icon fontSize="small">
                                    <MapPinSvg />
                                </Icon>
                            </MuiCustomAutocompleteListItemIcon>
                            <MuiCustomAutocompleteListItemText
                                primary={<MuiCustomHighlighter text={primaryText} query={inputValue} />}
                                secondary={secondaryText}
                            />
                        </MuiCustomAutocompleteListItem>
                    );
                }}
                onOpen={handlePopupOpen}
                onClose={handlePopupClose}
                onInputChange={handleInputValueChange}
            />
        </div>
    );
};

// Multiselect

export const MultiSelect: Story = () => {
    const sortedOptions = topFilmsRawData.slice(0, 50).sort((a, b) => {
        return b.year - a.year;
    });

    return (
        <div style={{ maxWidth: '40rem' }}>
            <MuiCustomAutocomplete
                fullWidth
                openOnFocus
                multiple
                disableCloseOnSelect
                defaultValue={[
                    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
                    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 }
                ]}
                forcePopupIcon={false}
                options={sortedOptions}
                ChipProps={{ color: 'primary' }}
                getOptionLabel={(option) => {
                    return option.title;
                }}
                filterOptions={(options, state) => {
                    const filterFn = createFilterOptions<Film>({
                        matchFrom: 'start'
                    });

                    return filterFn(options, state);
                }}
                groupBy={(option) => `${String(option.year)} year`}
                isOptionEqualToValue={(option, value) => {
                    return value.title.trim() === option.title.trim();
                }}
                renderInput={(inputProps) => {
                    return (
                        <MuiCustomTextField
                            {...inputProps}
                            variant="outlined"
                            color="primary"
                            label="Filter by films"
                            placeholder="Select a film"
                        />
                    );
                }}
                renderOption={(listItemProps, option, state) => {
                    const { title } = option;
                    const { selected } = state;

                    return (
                        <MuiCustomAutocompleteListItem {...listItemProps}>
                            <MuiCustomAutocompleteListItemIcon>
                                <Checkbox color="primary" className="MuiCheckbox-dense" checked={selected} />
                            </MuiCustomAutocompleteListItemIcon>
                            <MuiCustomAutocompleteListItemText className="u-text-truncate">
                                {title}
                            </MuiCustomAutocompleteListItemText>
                        </MuiCustomAutocompleteListItem>
                    );
                }}
            />
        </div>
    );
};

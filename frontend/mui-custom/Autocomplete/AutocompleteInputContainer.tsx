import React from 'react';
import clsx from 'clsx';

import { MuiCustomAutocompleteRenderInputParams } from './Autocomplete';

export type MuiCustomAutocompleteInputContainerProps = MuiCustomAutocompleteRenderInputParams['inputProps'];

export const MuiCustomAutocompleteInputContainer = React.forwardRef<
    HTMLInputElement,
    MuiCustomAutocompleteInputContainerProps
>(function InputWrap(props, forwardedRef) {
    const { tags, ...other } = props;

    return (
        <div
            className={clsx('MuiCustomAutocompleteInputContainer', {
                'MuiCustomAutocompleteInputContainer-filled': Array.isArray(tags) && tags.length > 0
            })}
        >
            {tags}
            <input {...other} ref={forwardedRef} />
        </div>
    );
});

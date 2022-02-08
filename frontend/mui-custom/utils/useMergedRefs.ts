import React, { useMemo } from 'react';
import { setRef } from '@mui/material';

export function useMergedRefs<T>(...refs: React.Ref<T>[]): React.Ref<T> {
    return useMemo(() => {
        return (value) => {
            refs.forEach((ref) => {
                setRef<T>(ref, value);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...refs]);
}

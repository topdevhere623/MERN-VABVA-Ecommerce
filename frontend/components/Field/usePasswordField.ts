import { useMemo, useState } from 'react';
import useEventCallback from '@mui/utils/useEventCallback';

export const usePasswordField = () => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = useEventCallback(() => {
        setPasswordVisible((prevState) => !prevState);
    });

    return useMemo(
        () => ({ isPasswordVisible, togglePasswordVisibility } as const),
        [isPasswordVisible, togglePasswordVisibility]
    );
};

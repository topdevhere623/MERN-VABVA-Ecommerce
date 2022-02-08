import React, { useMemo, useState } from 'react';

import { useEventCallback } from '@mui/material';

import { SignInFormFlowItemType, SignInFormFlowContext, SignInFormFlowContextValue } from './SignInFormFlowContext';
import { useFlowContainer } from '~/components/FlowContainer';

export interface SignInFormFlowItemProps {
    value: SignInFormFlowItemType;
}

export type SignInFormFlowProviderProps = {
    children: React.ReactElement<SignInFormFlowItemProps>[] | React.ReactElement<SignInFormFlowItemProps>;
    defaultValue?: SignInFormFlowItemType;
};

export const SignInFormFlowProvider = (props: SignInFormFlowProviderProps) => {
    const { activeElement, setActiveItem } = useFlowContainer(props);
    const [sessionId, setSessionId] = useState<SignInFormFlowContextValue['sessionId']>();

    const handleUpdateSessionId = useEventCallback((value: string) => {
        setSessionId(value);
    });

    const contextValue = useMemo<SignInFormFlowContextValue>(
        () => ({
            sessionId,
            moveTo: setActiveItem,
            updateSessionId: handleUpdateSessionId
        }),
        [setActiveItem, handleUpdateSessionId, sessionId]
    );

    return <SignInFormFlowContext.Provider value={contextValue}>{activeElement}</SignInFormFlowContext.Provider>;
};

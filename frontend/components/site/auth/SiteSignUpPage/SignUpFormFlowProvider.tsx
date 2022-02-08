import React, { useMemo, useState } from 'react';

import { useEventCallback } from '@mui/material';

import { SignUpFormFlowItemType, SignUpFormFlowContext, SignUpFormFlowContextValue } from './SignUpFormFlowContext';

export interface SignUpFormFlowItemProps {
    value: SignUpFormFlowItemType;
}

export type SignUpFormFlowProviderProps = {
    children: React.ReactElement<SignUpFormFlowItemProps>[] | React.ReactElement<SignUpFormFlowItemProps>;
    defaultValue?: SignUpFormFlowItemType;
};

export const SignUpFormFlowProvider = (props: SignUpFormFlowProviderProps) => {
    const { children, defaultValue } = props;
    const [activeItem, setActiveItem] = useState(defaultValue);
    const [sessionId, setSessionId] = useState<SignUpFormFlowContextValue['sessionId']>();

    const childElements = React.Children.toArray(children) as React.ReactElement<SignUpFormFlowItemProps>[];

    const handleMoveTo = useEventCallback((value: SignUpFormFlowItemType) => {
        setActiveItem(value);
    });

    const handleUpdateSessionId = useEventCallback((value: string) => {
        setSessionId(value);
    });

    const contextValue = useMemo<SignUpFormFlowContextValue>(
        () => ({
            sessionId,
            moveTo: handleMoveTo,
            updateSessionId: handleUpdateSessionId
        }),
        [handleMoveTo, handleUpdateSessionId, sessionId]
    );

    let activeElement: React.ReactElement | null = null;

    if (!activeItem) {
        activeElement = childElements[0];
    } else {
        activeElement =
            childElements.find((child) => {
                if (child.props.value === activeItem) {
                    return child;
                }
            }) || null;
    }

    return <SignUpFormFlowContext.Provider value={contextValue}>{activeElement}</SignUpFormFlowContext.Provider>;
};

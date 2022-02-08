import React, { useMemo, useState } from 'react';

export interface FlowContainerItemProps<T extends string> {
    value: T;
}

export interface UseFlowContainerProps<T extends string> {
    children: React.ReactElement<FlowContainerItemProps<T>>[] | React.ReactElement<FlowContainerItemProps<T>>;
    defaultValue?: T;
}

export const useFlowContainer = <T extends string>(props: UseFlowContainerProps<T>) => {
    const { children, defaultValue } = props;
    const [activeItem, setActiveItem] = useState(defaultValue);

    const childElements = React.Children.toArray(children) as React.ReactElement<FlowContainerItemProps<T>>[];

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

    return useMemo(() => {
        return {
            activeElement,
            setActiveItem
        } as const;
    }, [activeElement]);
};

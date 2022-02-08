import React, { useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';
import { TransitionGroup } from 'react-transition-group';

import { MuiCustomLinkedListContext, MuiCustomLinkedListContextValue } from './LinkedListContext';
import { MuiCustomLinkedListGroupItem } from './LinkedListTypes';

export type MuiCustomLinkedListProps = React.ComponentProps<'div'>;

export const MuiCustomLinkedList = React.forwardRef<HTMLDivElement, MuiCustomLinkedListProps>(
    function MuiCustomLinkedList(props, forwardedRef) {
        const { children, className, ...other } = props;

        const [path, setPath] = useState<MuiCustomLinkedListGroupItem[]>([]);

        const getActiveGroup = useCallback(() => {
            return path[path.length - 1];
        }, [path]);

        const handleSelectGroup = useCallback(
            (value: MuiCustomLinkedListGroupItem) => {
                const foundGroup = path.find((item) => item.key === value.key);

                if (!foundGroup) {
                    setPath((prevState) => [...prevState, value]);
                }
            },
            [path]
        );

        const handleCloseGroup = useCallback(() => {
            if (path.length > 0) {
                setPath((prevState) => {
                    return prevState.slice(0, prevState.length - 1);
                });
            }
        }, [path]);

        const contextValue = useMemo<MuiCustomLinkedListContextValue>(() => {
            return {
                getActiveGroup,
                onCloseGroup: handleCloseGroup,
                onSelectGroup: handleSelectGroup
            };
        }, [getActiveGroup, handleCloseGroup, handleSelectGroup]);

        return (
            <MuiCustomLinkedListContext.Provider value={contextValue}>
                <div
                    {...other}
                    className={clsx('MuiCustomLinkedList', className)}
                    ref={forwardedRef}
                >
                    <TransitionGroup component={null}>{children}</TransitionGroup>
                </div>
            </MuiCustomLinkedListContext.Provider>
        );
    }
);

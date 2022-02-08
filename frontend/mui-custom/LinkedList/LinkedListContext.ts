import { createCtx } from '../utils';
import { MuiCustomLinkedListGroupItem } from './LinkedListTypes';

export type MuiCustomLinkedListContextValue = {
    getActiveGroup: () => MuiCustomLinkedListGroupItem | undefined;
    onSelectGroup: (value: MuiCustomLinkedListGroupItem) => void;
    onCloseGroup: () => void;
};

export const MuiCustomLinkedListContext = createCtx<MuiCustomLinkedListContextValue>();
export const useMuiCustomLinkedList = MuiCustomLinkedListContext.useContext;

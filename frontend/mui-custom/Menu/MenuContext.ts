import { createCtx } from '../utils';

export type MuiCustomMenuContextValue = {
    isParentOpen: boolean;
};

export const MuiCustomMenuContext = createCtx<MuiCustomMenuContextValue>();
export const useMuiCustomMenu = MuiCustomMenuContext.useContext;

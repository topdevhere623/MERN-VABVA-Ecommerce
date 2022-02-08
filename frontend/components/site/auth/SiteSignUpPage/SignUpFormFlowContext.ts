import { createCtx } from '~/mui-custom/utils';

export type SignUpFormFlowItemType = 'phone' | 'verify-code' | 'profile';

export type SignUpFormFlowContextValue = {
    moveTo(item: SignUpFormFlowItemType): void;
    updateSessionId(sesstionId: string | number): void;
    sessionId?: string;
};

export const SignUpFormFlowContext = createCtx<SignUpFormFlowContextValue>();
export const useSignUpFormFlow = SignUpFormFlowContext.useContext;

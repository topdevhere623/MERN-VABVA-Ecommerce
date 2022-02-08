import { createCtx } from '~/mui-custom/utils';

export type SignInFormFlowItemType = 'login' | 'password';

export type SignInFormFlowContextValue = {
    moveTo(item: SignInFormFlowItemType): void;
    updateSessionId(sesstionId: string | number): void;
    sessionId?: string;
};

export const SignInFormFlowContext = createCtx<SignInFormFlowContextValue>();
export const useSignInFormFlow = SignInFormFlowContext.useContext;

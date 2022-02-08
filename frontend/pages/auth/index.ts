import { GetServerSideProps } from 'next';

import { appConfig } from '~/config/app.config';

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            destination: appConfig.urls.signup(),
            permanent: false
        }
    };
};

function AuthPage() {
    return null;
}

export default AuthPage;

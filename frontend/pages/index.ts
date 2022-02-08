import { GetServerSideProps } from 'next';

import { appConfig } from '~/config/app.config';

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            destination: appConfig.urls.orders(),
            permanent: false
        }
    };
};

function MainPage() {
    return null;
}

export default MainPage;

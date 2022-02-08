import axios from 'axios';

export const getServerUrl = () => {
    if (process.env.NEXT_PUBLIC_SERVER_URL) {
        return String(process.env.NEXT_PUBLIC_SERVER_URL).replace(/\/$/, '');
    }

    return '';
};

export const http = axios.create({
    baseURL: getServerUrl(),
    validateStatus: (status) => {
        return status < 500;
    }
});

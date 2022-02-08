import axios from 'axios';
import * as yup from 'yup';

export type RandomUser = {
    id?: {
        name?: string;
        value?: string | null;
    };
    name?: {
        title?: string;
        first?: string;
        last?: string;
    };
    email?: string;
    phone?: string;
    picture?: {
        large?: string;
        medium?: string;
        thumbnail?: string;
    };
    location?: {
        street?: { number?: number; name?: string };
        city?: string;
        country?: string;
    };
};

export const randomUserSchema: yup.SchemaOf<RandomUser> = yup.object({
    id: yup.object({
        name: yup.string(),
        value: yup.string().nullable()
    }),
    name: yup.object({
        title: yup.string(),
        first: yup.string(),
        last: yup.string()
    }),
    email: yup.string(),
    phone: yup.string(),
    picture: yup.object({
        large: yup.string(),
        medium: yup.string(),
        thumbnail: yup.string()
    }),
    location: yup.object({
        street: yup.object({
            number: yup.number(),
            name: yup.string()
        }),
        city: yup.string(),
        country: yup.string()
    })
});

interface RandomUsersRequest {
    results?: RandomUser[];
    error?: string;
}

export const fetchRandomUsers = async (count = 25) => {
    const response = await axios.get<RandomUsersRequest>('https://randomuser.me/api/', {
        params: {
            format: 'json',
            results: count,
            inc: 'name, location, email, phone, picture'
        }
    });

    const { data } = response;

    if (data?.results) {
        try {
            const validData = await yup.array().of(randomUserSchema).validate(data?.results);

            return validData as RandomUser[];
        } catch (e) {
            if (e instanceof yup.ValidationError) {
                throw new Error(e.message);
            }
        }
    }

    if (data?.error) {
        throw new Error(data?.error);
    }

    return null;
};

interface Options {
    success?: boolean;
    delay?: number;
}

const defaultOptions: Options = {
    success: true,
    delay: 1500
};

export function fakeRequest<T>(data: T, opt: Options = defaultOptions) {
    const { delay, success } = { ...defaultOptions, ...opt };

    return new Promise<T>((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve(data);
            } else {
                reject(data);
            }
        }, delay);
    });
}

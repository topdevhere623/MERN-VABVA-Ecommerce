export const loadScript = (src: string, id: string) => {
    if (typeof window === undefined) {
        return;
    }

    if (document.querySelector(`#${id}`)) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;

    const head = document.querySelector('head');
    head?.appendChild(script);
};

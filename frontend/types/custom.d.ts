declare module '*.svg' {
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.scss' {
    const styles: Record<string, string>;
    export default styles;
}

import sassVariables from './sass-variables.module.scss';

// Helpers
export const getSassBreakpoint = (key: string): number => {
    const breakpoint = sassVariables[`breakpoint-${key}`];

    if (breakpoint === '' || breakpoint === undefined) {
        return 0;
    }
    return parseFloat(breakpoint);
};

export const sassSpacingCallback = (factor: number): string => {
    let spacer = sassVariables.spacer || 1;
    spacer = parseFloat(spacer as string);

    const result = Math.round(factor * 0.25 * spacer * 100) / 100;

    return `${result}rem`;
};

export function getSassVariable(key: string, format?: 'string'): string;
export function getSassVariable(key: string, format: 'number'): number | undefined;
export function getSassVariable(key: string, format: 'string' | 'number' = 'string'): string | number | undefined {
    const value = sassVariables[key];

    if (format === 'string') {
        return value || '';
    }

    if (value === '' || value === undefined) {
        return undefined;
    }

    return parseFloat(value);
}

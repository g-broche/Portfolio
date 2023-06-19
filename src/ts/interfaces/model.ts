export interface Photo {
    readonly id: number,
    readonly title: string,
    readonly fileNames: {
        xsmall: string,
        small: string,
        medium: string,
        large: string,
    },
    readonly tag: string[]
};
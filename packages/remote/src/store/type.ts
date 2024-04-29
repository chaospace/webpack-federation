
type Selectors<T, K = keyof T> = K extends string ? `${K}Selector` : never;
type Setter<T, K = keyof T> = K extends `set${infer U}` ? `set${U}` : never;

export type {
    Selectors,
    Setter
}
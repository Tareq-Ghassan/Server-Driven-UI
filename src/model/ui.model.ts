export interface LocalizedString {
    en: string;
    ar: string;
}

export type Style = Record<string, string | number>;

export type UIElement = {
    key?: string;
    type: string;
    children?: UIElement[];
    value?: unknown;
    style?: Style;
    padding?: Record<string, string | number>;
    [key: string]: unknown;
};

export interface ScreenTheme {
    tokens: Record<string, string | number>;
}

export interface Screen {
    key: string;
    theme?: ScreenTheme;
    config?: UIElement[];
    body: UIElement[];
}

export interface UIDefinition {
    version: number;
    screen: Screen;
}



import chalk, { ChalkOptions, Level } from 'chalk';
export declare class Print extends chalk.constructor {
    static prints: {
        [key: string]: Print;
    };
    private _uid;
    config: PrintConfig;
    constructor(options?: ChalkOptions);
}
export interface PrintConfigCategory {
    name: string;
    visible?: boolean;
    extensions?: {
        [key: string]: any;
    };
}
export interface PrintConfigExtension {
    name: string;
    use?: boolean;
    config?: any;
    callback: (this: PrintConfig, value: string, categoryOptions: any, extension: PrintConfigExtension) => string;
}
export declare class PrintConfig {
    private print_id;
    categories: {
        [key: string]: PrintConfigCategory;
    };
    extensions: {
        [key: string]: PrintConfigExtension;
    };
    use: {};
    auto_trim: boolean;
    constructor(print_id: string);
    readonly print: Print;
    color(enabled?: boolean): boolean;
    level(level?: Level): Level;
    category(keyOrCategory: string | PrintConfigCategory): PrintConfigCategory;
    extension(keyOrExtension: string | PrintConfigExtension): PrintConfigExtension | undefined;
    trim(value: any): any;
    display(category: string, visible?: boolean): false | PrintConfigCategory;
    silent(): void;
    verbose(): void;
    filter(category: string): void;
    private _log(...messages);
    private _format(...messages);
    private _applyExtensions(category, str);
}

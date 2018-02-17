import { Print, PrintConfig, PrintConfigExtension } from "./print";
declare const _default: {
    Print: typeof Print;
    PrintConfig: typeof PrintConfig;
    Extensions: {
        style: {
            name: string;
            use: boolean;
            callback: (this: PrintConfig, str: string, options: any, extension: PrintConfigExtension) => string;
        };
        date: {
            name: string;
            use: boolean;
            callback: (this: PrintConfig, str: string, options: any, extension: PrintConfigExtension) => string;
        };
        tag: {
            name: string;
            use: boolean;
            callback: (this: PrintConfig, str: string, options: any, extension: PrintConfigExtension) => string;
        };
    };
    Categories: {
        log: {
            name: string;
            visible: boolean;
            extensions: {
                date: {
                    styles: string[];
                };
            };
        };
        debug: {
            name: string;
            visible: boolean;
            extensions: {
                date: {
                    styles: string[];
                };
                style: {
                    styles: string[];
                };
            };
        };
        warn: {
            name: string;
            visible: boolean;
            extensions: {
                date: {
                    styles: string[];
                };
                style: {
                    styles: string[];
                };
                tag: {
                    tag: string;
                    styles: string[];
                };
            };
        };
        error: {
            name: string;
            visible: boolean;
            extensions: {
                date: {
                    styles: string[];
                };
                style: {
                    styles: string[];
                };
                tag: {
                    tag: string;
                    styles: string[];
                };
            };
        };
    };
};
export default _default;

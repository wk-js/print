import { PrintConfigExtension, PrintConfig } from "../print";
export declare const TagExtension: {
    name: string;
    use: boolean;
    callback: (this: PrintConfig, str: string, options: any, extension: PrintConfigExtension) => string;
};

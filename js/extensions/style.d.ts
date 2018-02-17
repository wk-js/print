import { PrintConfigExtension, PrintConfig } from "../print";
export declare const StyleExtension: {
    name: string;
    use: boolean;
    callback: (this: PrintConfig, str: string, options: any, extension: PrintConfigExtension) => string;
};

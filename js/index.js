"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const print_1 = require("./print");
const style_1 = require("./extensions/style");
const date_1 = require("./extensions/date");
const tag_1 = require("./extensions/tag");
const log_1 = require("./categories/log");
const debug_1 = require("./categories/debug");
const warn_1 = require("./categories/warn");
const error_1 = require("./categories/error");
exports.default = {
    Print: print_1.Print,
    PrintConfig: print_1.PrintConfig,
    Extensions: {
        style: style_1.StyleExtension,
        date: date_1.DateExtension,
        tag: tag_1.TagExtension
    },
    Categories: {
        log: log_1.LogCategory,
        debug: debug_1.DebugCategory,
        warn: warn_1.WarnCategory,
        error: error_1.ErrorCategory
    }
};

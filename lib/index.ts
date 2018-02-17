import { Print, PrintConfig, PrintConfigExtension } from "./print";
import { StyleExtension } from "./extensions/style";
import { DateExtension } from "./extensions/date";
import { TagExtension } from "./extensions/tag";
import { LogCategory } from "./categories/log";
import { DebugCategory } from "./categories/debug";
import { WarnCategory } from "./categories/warn";
import { ErrorCategory } from "./categories/error";

export default {
  Print: Print,
  PrintConfig: PrintConfig,
  Extensions: {
    style: StyleExtension,
    date: DateExtension,
    tag: TagExtension
  },
  Categories: {
    log: LogCategory,
    debug: DebugCategory,
    warn: WarnCategory,
    error: ErrorCategory
  }
}
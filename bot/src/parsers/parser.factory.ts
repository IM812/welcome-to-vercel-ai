import type { Platform } from '../generated/prisma/index';
import type { Parser } from './base.parser';
import { AvitoParser } from './avito.parser';
import { CianParser } from './cian.parser';
import { YoulaParser } from './youla.parser';
import { AutoRuParser } from './autoru.parser';

export class ParserFactory {
  static create(platform: Platform): Parser {
    switch (platform) {
      case 'AVITO':
        return new AvitoParser();
      case 'CIAN':
        return new CianParser();
      case 'YOULA':
        return new YoulaParser();
      case 'AUTORU':
        return new AutoRuParser();
      default: {
        const _exhaustive: never = platform;
        throw new Error(`Unknown platform: ${String(_exhaustive)}`);
      }
    }
  }
}

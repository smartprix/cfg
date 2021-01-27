// global.d.ts
import { ConfigType } from './default';

declare global {
  interface BaseConfig extends ConfigType {}
}

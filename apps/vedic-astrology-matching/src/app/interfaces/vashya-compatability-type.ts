import { VashyaType } from './vashya-name-type';

export type VashyaCompatibility = Record<
  VashyaType,
  Record<VashyaType, number>
>;

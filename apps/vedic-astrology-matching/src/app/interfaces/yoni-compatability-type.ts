import { YoniName } from './yoni-name-type';

export type YoniCompatibility = Record<YoniName, Record<YoniName, number>>;

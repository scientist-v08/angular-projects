import { YoniName } from './yoni-name-type';

export interface NakshatraInfo {
  id: number;
  nakshatra: string;
  gana: 1 | 2 | 3; // 1 = Deva, 2 = Manushya, 3 = Rakshasa
  yoni: YoniName;
  nadi: 1 | 2 | 3; // 1 = Adi, 2 = Madhya, 3 = Antya
}

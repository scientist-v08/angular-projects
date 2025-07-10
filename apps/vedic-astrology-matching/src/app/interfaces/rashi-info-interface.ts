import { HouseRulers } from './maitri-kuta-interface';

export interface RashiInfo {
  rashi: string;
  position: number;
  ruler: HouseRulers;
  varna: 1 | 2 | 3 | 4; // 1=Brahmin, 2=Kshatriya, 3=Vaishya, 4=Shudra
  vashya: 'Chatushpada' | 'Dwipada' | 'Jalachara' | 'Vanachara' | 'Keeta';
}

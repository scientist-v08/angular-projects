import { Injectable } from '@angular/core';
import { NakshatraInfo } from '../interfaces/nakshatra-info-interface';

@Injectable()
export class RajjuDoshaService {
  rajjuCalculator(
    groomInfo: NakshatraInfo,
    brideInfo: NakshatraInfo,
    sameRulerException: boolean
  ): string {
    if (groomInfo.rajju === brideInfo.rajju) {
      if (!sameRulerException) {
        switch (groomInfo.rajju) {
          case 'Paada':
            return 'Rajju dosha: May cause long distance relationship';
          case 'Ooru':
            return 'Rajju dosha: May cause decline of wealth';
          case 'Nabhi':
            return 'Rajju dosha: May cause loss of children';
          case 'Kanta':
          case 'Sira':
            return 'Rajju dosha: May cause lose of spouse';
        }
      }
    }
    return 'No Rajju Dosha';
  }
}

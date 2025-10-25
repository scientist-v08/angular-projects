import { Injectable } from '@angular/core';
import { KutaIterator } from '../interfaces/kutaIterator-interface';
import { NakshatraInfo } from '../interfaces/nakshatra-info-interface';
import { yoniCompatibilityChart } from '../data/yoni-compatibility-chart';
import { RashiInfo } from '../interfaces/rashi-info-interface';
import { maitriKuta } from '../data/maitri-kuta-data';
import { HouseRulers } from '../interfaces/maitri-kuta-interface';

@Injectable()
export class YoniMaitriGanaNadiCalculatorService {
  yoniCalculator(
    groomInfo: NakshatraInfo,
    brideInfo: NakshatraInfo
  ): KutaIterator {
    const yoniScore = yoniCompatibilityChart[groomInfo.yoni][brideInfo.yoni];
    return {
      index: 3,
      score: yoniScore,
      comments: `The passion animal of ${groomInfo.nakshatra} is ${groomInfo.yoni} and that of ${brideInfo.nakshatra} is ${brideInfo.yoni}. The union of these 2 gives us a score of ${yoniScore}`,
    };
  }

  maitriCalculator(groomInfo: RashiInfo, brideInfo: RashiInfo): KutaIterator {
    const maitriScore = maitriKuta[groomInfo.ruler][brideInfo.ruler];
    const comments =
      this.maitriComments(groomInfo.ruler, groomInfo.rashi) +
      ' ' +
      this.maitriComments(brideInfo.ruler, brideInfo.rashi) +
      ' ' +
      `The friendship between these two will have a score of ${maitriScore}`;
    return {
      index: 4,
      score: maitriScore,
      comments: comments,
    };
  }

  private maitriComments(houseRuler: HouseRulers, rasi: string): string {
    switch (houseRuler) {
      case 'Mars':
        return `Those born in ${rasi} Raashi are driven, often taking decisive actions and showing strong initiative.`;
      case 'Venus':
        return `Those born in ${rasi} Raashi are drawn to love, beauty, and fostering harmonious relationships.`;
      case 'Mercury':
        return `Those born in ${rasi} Raashi excel in communication, intellect, and adaptability.`;
      case 'Sun':
        return `Those born in ${rasi} Raashi radiate authority, vitality, and confident self-expression.`;
      case 'Jupiter':
        return `Those born in ${rasi} Raashi embody wisdom, growth, and a benevolent spirit.`;
      case 'Saturn':
        return `Those born in ${rasi} Raashi are disciplined, often facing delays but embracing responsibilities.`;
      case 'Moon':
        return `Those born in ${rasi} Raashi are guided by emotions, intuition, and nurturing qualities.`;
      default:
        return `No description available for ${rasi} Raashi.`;
    }
  }

  ganaCalculator(
    groomInfo: NakshatraInfo,
    brideInfo: NakshatraInfo,
    sameRulerException: boolean
  ): KutaIterator {
    const ganaMapper: string[] = [
      '',
      'Deva Gana',
      'Manushya Gana',
      'Raakshasa Gana',
    ];
    const groomComment = `${groomInfo.nakshatra} nakshatra is born under ${
      ganaMapper[groomInfo.gana]
    }. `;
    const brideComment = `${brideInfo.nakshatra} nakshatra is born under ${
      ganaMapper[brideInfo.gana]
    }. `;
    let ganaScore = 0;
    if (groomInfo.gana === brideInfo.gana) {
      ganaScore = 6;
    } else if (groomInfo.gana === 1 && brideInfo.gana === 2) {
      ganaScore = 5;
    } else if (brideInfo.gana === 1 && groomInfo.gana === 2) {
      ganaScore = 5;
    } else {
      ganaScore = 0;
    }
    let exceptionComment = '';
    if (sameRulerException && ganaScore !== 6) {
      ganaScore = 6;
      exceptionComment =
        'Even if there is a Gana mismatch this pair will have exception and have a score of 6.';
    }
    const additionalComment = `The union of both of these nakshatras give us a score of ${ganaScore}.`;
    const comments =
      groomComment + brideComment + additionalComment + exceptionComment;
    return {
      index: 5,
      score: ganaScore,
      comments: comments,
    };
  }

  nadiCalculator(
    groomInfo: NakshatraInfo,
    brideInfo: NakshatraInfo
  ): KutaIterator {
    if (groomInfo.nadi === brideInfo.nadi) {
      return {
        index: 7,
        score: 0,
        comments:
          'Nadi dosha: This may cause either the husband or the wife or the child to develop some chronic disease and die after suffering a lot. Please avoid this union if possible.',
      };
    } else {
      return {
        index: 7,
        score: 8,
        comments:
          'No nadi dosha. Continue with the union if the other parameters are agreeable.',
      };
    }
  }
}

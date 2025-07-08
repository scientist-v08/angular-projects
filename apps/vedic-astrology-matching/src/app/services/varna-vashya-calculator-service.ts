import { Injectable } from '@angular/core';
import { RashiInfo } from '../interfaces/rashi-info-interface';
import { KutaIterator } from '../interfaces/kutaIterator-interface';
import { NakshatraInfo } from '../interfaces/nakshatra-info-interface';
import { vashyaCompatibilityChart } from '../data/vashya-compatibility-chart';

@Injectable()
export class VarnaVashyaCalculatorService {
  varnaCalculator(groom: RashiInfo, bride: RashiInfo): KutaIterator {
    let varnaScore = groom.varna - bride.varna;
    if (varnaScore < 0) {
      varnaScore = varnaScore * -1;
    }
    let score: number;
    let comments: string;

    switch (varnaScore) {
      case 0:
      case 2:
        score = 1;
        comments =
          'Both the man and the woman will respect each others role in the relationship';
        break;
      default:
        score = 0;
        comments =
          'The man and the woman may not respect each others role in the relationship causing ego clashes';
        break;
    }

    return {
      index: 0,
      score: score,
      comments: comments,
    };
  }

  vashyaCalculator(
    groom: RashiInfo,
    bride: RashiInfo,
    gn: string,
    bn: string,
    groomPada: string,
    bridePada: string
  ): KutaIterator {
    const gnNum = Number(gn);
    const bnNum = Number(bn);
    /** This code ensures that the vashya for Dhanu Raashi: PA & UA vashya is Chatushpada */
    if (groom.position === 9 && gnNum > 19) {
      groom.vashya = 'Chatushpada';
    }
    if (bride.position === 9 && bnNum > 19) {
      bride.vashya = 'Chatushpada';
    }
    /** This code ensures that for Makara Raashi: Shravana 2,3,4 pada the vashya is Jalachara */
    if (gnNum === 22 && groomPada !== '1') {
      groom.vashya = 'Jalachara';
    }
    if (bnNum === 22 && bridePada !== '1') {
      bride.vashya = 'Jalachara';
    }
    /** This code ensures that for Makara Raashi: Dhanista nakshatra the vashya is Jalachara */
    if (groom.position === 10 && gnNum === 23) {
      groom.vashya = 'Jalachara';
    }
    if (bride.position === 10 && bnNum === 23) {
      bride.vashya = 'Jalachara';
    }
    const vashyaScore = vashyaCompatibilityChart[groom.vashya][bride.vashya];
    let comments: string;
    switch (vashyaScore) {
      case 2:
        comments =
          'Both the man and the woman will have control over the other.';
        break;
      case 1:
        comments =
          'Both the man and the woman will have partial control over the other.';
        break;
      default:
        comments =
          'Both the man and the woman may not have control over the other.';
        break;
    }
    /** Reset the code */
    if (groom.position === 9 && gnNum > 19) {
      groom.vashya = 'Dwipada';
    }
    if (bride.position === 9 && bnNum > 19) {
      bride.vashya = 'Dwipada';
    }
    /** Reset the code */
    if (gnNum === 22 && groomPada !== '1') {
      groom.vashya = 'Chatushpada';
    }
    if (bnNum === 22 && bridePada !== '1') {
      bride.vashya = 'Chatushpada';
    }
    /** Reset the code */
    if (groom.position === 10 && gnNum === 23) {
      groom.vashya = 'Chatushpada';
    }
    if (bride.position === 10 && bnNum === 23) {
      bride.vashya = 'Chatushpada';
    }
    return {
      index: 1,
      score: vashyaScore,
      comments,
    };
  }
}

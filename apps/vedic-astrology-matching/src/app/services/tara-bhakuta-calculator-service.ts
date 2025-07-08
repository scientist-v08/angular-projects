import { Injectable } from '@angular/core';
import { NakshatraInfo } from '../interfaces/nakshatra-info-interface';
import { KutaIterator } from '../interfaces/kutaIterator-interface';
import { RashiInfo } from '../interfaces/rashi-info-interface';

@Injectable()
export class TaraBhakutaCalculatorService {
  taraCalculator(
    groomInfo: NakshatraInfo,
    brideInfo: NakshatraInfo
  ): KutaIterator {
    const groomTara = this.mod(brideInfo.id - groomInfo.id + 1, 9);
    const brideTara = this.mod(groomInfo.id - brideInfo.id + 1, 9);
    const groom: { comments: string; score: number } = this.taraType(
      groomTara,
      false,
      brideInfo.nakshatra,
      groomInfo.nakshatra
    );
    const bride: { comments: string; score: number } = this.taraType(
      brideTara,
      true,
      groomInfo.nakshatra,
      brideInfo.nakshatra
    );
    return {
      index: 2,
      score: (groom.score + bride.score) / 2,
      comments: groom.comments + bride.comments,
    };
  }

  private mod(n: number, m: number): number {
    return ((n % m) + m) % m;
  }

  private taraType(
    taraNumber: number,
    isBride: boolean,
    brideNakshatra: string,
    groomNakshatra: string
  ): { comments: string; score: number } {
    switch (taraNumber) {
      case 1: // Janma Tara (Birth Star)
        return {
          comments: isBride
            ? ''
            : `${brideNakshatra} nakshatra aligns with ${groomNakshatra}'s birth star, indicating a self-centric or potentially challenging influence.`,
          score: 0,
        };
      case 2: // Sampat Tara (Wealth, Prosperity)
        return {
          comments: `${brideNakshatra} nakshatra brings wealth, prosperity, and good fortune to ${groomNakshatra} nakshatra.`,
          score: 3,
        };
      case 3: // Vipatt Tara (Danger, Obstacles)
        return {
          comments: `${brideNakshatra} nakshatra may bring obstacles, dangers, or challenges to ${groomNakshatra} nakshatra.`,
          score: 0,
        };
      case 4: // Kshema Tara (Well-being, Prosperity)
        return {
          comments: `${brideNakshatra} nakshatra ensures well-being, growth, and security for ${groomNakshatra} nakshatra.`,
          score: 3,
        };
      case 5: // Pratyari Tara (Enemies, Opposition)
        return {
          comments: `${brideNakshatra} nakshatra may indicate opposition, enemies, or conflict for ${groomNakshatra} nakshatra.`,
          score: 0,
        };
      case 6: // Sadhaka Tara (Achievement, Support)
        return {
          comments: `${brideNakshatra} nakshatra is supportive, helping ${groomNakshatra} nakshatra achieve goals and find success.`,
          score: 3,
        };
      case 7: // Vadha Tara (Destruction, Trouble)
        return {
          comments: `${brideNakshatra} nakshatra may bring significant distress, destruction, or serious trouble to ${groomNakshatra} nakshatra.`,
          score: 0,
        };
      case 8: // Mitra Tara (Friendship, Harmony)
        return {
          comments: `${brideNakshatra} nakshatra fosters friendship, harmony, and mutual understanding with ${groomNakshatra} nakshatra.`,
          score: 3,
        };
      case 0: // Ati Mitra Tara (Great Friendship)
      case 9: // Ati Mitra Tara (If 9 is explicitly used before % 9, otherwise 0)
        return {
          comments: `${brideNakshatra} nakshatra forms a profound friendship and deep compatibility with ${groomNakshatra} nakshatra.`,
          score: 3,
        };
      default:
        return {
          comments: 'Unable to calculate Tara',
          score: 0,
        };
    }
  }

  bhakutaCalculator(groomInfo: RashiInfo, brideInfo: RashiInfo): KutaIterator {
    let loveScore = groomInfo.position - brideInfo.position;
    if (loveScore < 0) {
      loveScore = loveScore * -1;
      loveScore += 1;
    } else {
      loveScore += 1;
    }
    if (groomInfo.position === brideInfo.position) {
      loveScore = 0;
    }
    let comments = '';
    switch (loveScore) {
      case 0:
      case 5:
      case 7:
      case 9:
        comments =
          'The couple will love each other irrespective of any other factors. But it takes time to form love.';
        loveScore = 7;
        break;
      case 2:
      case 12:
        comments =
          '2/12 Bhakuta dosha: The couple will eventually hate each other.';
        loveScore = 0;
        break;
      case 6:
      case 8:
        comments =
          '6/8 Bhakuta dosha: The couple will eventually hate each other.';
        loveScore = 0;
        break;
      case 3:
      case 11:
        comments =
          '3/11 Bhakuta: The couple will like each other for their communication. Ancient texts differentiates between like and love and assigns zero points. Modern astrologers assign 7 points. Feel free to add 7 points to the final score.';
        loveScore = 0;
        break;
      case 4:
      case 10:
        comments =
          '4/10 Bhakuta: The couple will like each other for their approach of family building. Ancient texts differentiates between like and love and assigns zero points. Modern astrologers assign 7 points. Feel free to add 7 points to the final score.';
        loveScore = 0;
        break;
    }
    return {
      index: 6,
      score: loveScore,
      comments: comments,
    };
  }
}

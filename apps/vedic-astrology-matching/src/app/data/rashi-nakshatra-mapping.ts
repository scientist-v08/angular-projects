import { RashiNakshatraInterface } from './all-rashi';

export interface RashiToNakshatraMap {
  nakshatras: RashiNakshatraInterface[];
}

export const allNakshtraMappedToRashi: RashiToNakshatraMap[] = [
  {
    nakshatras: [
      { position: 1, name: 'Ashwini' },
      { position: 2, name: 'Bharani' },
      { position: 3, name: 'Kritika' },
    ],
  },
  {
    nakshatras: [
      { position: 3, name: 'Kritika' },
      { position: 4, name: 'Rohini' },
      { position: 5, name: 'Mrigashira' },
    ],
  },
  {
    nakshatras: [
      { position: 5, name: 'Mrigashira' },
      { position: 6, name: 'Ardra' },
      { position: 7, name: 'Punarvasu' },
    ],
  },
  {
    nakshatras: [
      { position: 7, name: 'Punarvasu' },
      { position: 8, name: 'Pushya' },
      { position: 9, name: 'Ashlesha' },
    ],
  },
  {
    nakshatras: [
      { position: 10, name: 'Magha' },
      { position: 11, name: 'Purva Phalguni' },
      { position: 12, name: 'Uttara Phalguni' },
    ],
  },
  {
    nakshatras: [
      { position: 12, name: 'Uttara Phalguni' },
      { position: 13, name: 'Hasta' },
      { position: 14, name: 'Chitra' },
    ],
  },
  {
    nakshatras: [
      { position: 14, name: 'Chitra' },
      { position: 15, name: 'Swati' },
      { position: 16, name: 'Vishakha' },
    ],
  },
  {
    nakshatras: [
      { position: 16, name: 'Vishakha' },
      { position: 17, name: 'Anuradha' },
      { position: 18, name: 'Jyeshtha' },
    ],
  },
  {
    nakshatras: [
      { position: 19, name: 'Mula' },
      { position: 20, name: 'Purva Ashadha' },
      { position: 21, name: 'Uttara Ashadha' },
    ],
  },
  {
    nakshatras: [
      { position: 21, name: 'Uttara Ashadha' },
      { position: 22, name: 'Shravana' },
      { position: 23, name: 'Dhanishta' },
    ],
  },
  {
    nakshatras: [
      { position: 23, name: 'Dhanishta' },
      { position: 24, name: 'Shatabhisha' },
      { position: 25, name: 'Purva Bhadrapada' },
    ],
  },
  {
    nakshatras: [
      { position: 25, name: 'Purva Bhadrapada' },
      { position: 26, name: 'Uttara Bhadrapada' },
      { position: 27, name: 'Revati' },
    ],
  },
];

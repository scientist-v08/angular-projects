export interface RashiNakshatraInterface {
  position: number;
  name: string;
}

export const allRashis: RashiNakshatraInterface[] = [
  { position: 1, name: 'Mesha (Aries)' },
  { position: 2, name: 'Vrishabha (Taurus)' },
  { position: 3, name: 'Mithuna (Gemini)' },
  { position: 4, name: 'Karka (Cancer)' },
  { position: 5, name: 'Simha (Leo)' },
  { position: 6, name: 'Kanya (Virgo)' },
  { position: 7, name: 'Tula (Libra)' },
  { position: 8, name: 'Vrischika (Scorpio)' },
  { position: 9, name: 'Dhanu (Sagittarius)' },
  { position: 10, name: 'Makara (Capricorn)' },
  { position: 11, name: 'Kumbha (Aquarius)' },
  { position: 12, name: 'Meena (Pisces)' },
];

export const allPadas: RashiNakshatraInterface[] = [
  { position: 1, name: 'Pada 1' },
  { position: 2, name: 'Pada 2' },
  { position: 3, name: 'Pada 3' },
  { position: 4, name: 'Pada 4' },
];

export type HouseRulers =
  | 'Mars'
  | 'Venus'
  | 'Mercury'
  | 'Sun'
  | 'Jupiter'
  | 'Saturn'
  | 'Moon';

interface CelestialBody {
  Mars: number;
  Venus: number;
  Mercury: number;
  Sun: number;
  Jupiter: number;
  Saturn: number;
  Moon: number;
}

export type MaitriKutaInterface = {
  [key in HouseRulers]: CelestialBody;
};

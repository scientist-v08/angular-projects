import { VashyaCompatibility } from '../interfaces/vashya-compatability-type';

export const vashyaCompatibilityChart: VashyaCompatibility = {
  Dwipada: {
    Dwipada: 2,
    Chatushpada: 1,
    Jalachara: 1,
    Keeta: 1,
    Vanachara: 0,
  },
  Chatushpada: {
    Dwipada: 1,
    Chatushpada: 2,
    Jalachara: 1,
    Keeta: 1,
    Vanachara: 1,
  },
  Jalachara: {
    Dwipada: 1,
    Chatushpada: 1,
    Jalachara: 2,
    Keeta: 1,
    Vanachara: 1,
  },
  Keeta: {
    Dwipada: 0,
    Chatushpada: 1,
    Jalachara: 1,
    Keeta: 2,
    Vanachara: 0,
  },
  Vanachara: {
    Dwipada: 0,
    Chatushpada: 0,
    Jalachara: 1,
    Keeta: 0,
    Vanachara: 2,
  },
};

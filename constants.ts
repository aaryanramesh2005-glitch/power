

import { ACUnit, ACMode, FanSpeed } from './types';

export const INITIAL_AC_UNITS: ACUnit[] = [
  {
    id: 1,
    name: 'Living Room',
    power: false,
    temperature: 22,
    mode: ACMode.Cool,
    fanSpeed: FanSpeed.Auto,
    energyUsage: {
      dailyKwh: 3.1,
      monthlyKwh: 72.5,
    }
  },
  {
    id: 2,
    name: 'Bedroom',
    power: true,
    temperature: 20,
    mode: ACMode.Cool,
    fanSpeed: FanSpeed.Low,
    energyUsage: {
      dailyKwh: 1.8,
      monthlyKwh: 45.2,
    }
  },
  {
    id: 3,
    name: 'Office',
    power: false,
    temperature: 24,
    mode: ACMode.Fan,
    fanSpeed: FanSpeed.Medium,
    energyUsage: {
      dailyKwh: 0.5,
      monthlyKwh: 15.8,
    }
  },
];
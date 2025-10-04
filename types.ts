

export enum ACMode {
  Cool = 'cool',
  Heat = 'heat',
  Fan = 'fan',
  Auto = 'auto',
}

export enum FanSpeed {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Auto = 'auto',
}

export interface ACUnit {
  id: number;
  name: string;
  power: boolean;
  temperature: number;
  mode: ACMode;
  fanSpeed: FanSpeed;
  energyUsage: {
    dailyKwh: number;
    monthlyKwh: number;
  };
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export interface GeminiFunctionCall {
    name: string;
    args: {
        acUnitName?: string;
        power?: boolean;
        temperature?: number;
        mode?: string;
        fanSpeed?: string;
    };
}

export interface GeminiResponse {
    text: string | null;
    functionCalls: GeminiFunctionCall[] | null;
}
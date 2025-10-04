import React, { useState } from 'react';
import { ACUnit, ACMode, FanSpeed } from '../types';
import { PowerIcon, PlusIcon, MinusIcon, SnowflakeIcon, SunIcon, FanIcon, AutoIcon, WaveLowIcon, WaveMediumIcon, WaveHighIcon, LightningBoltIcon, ChevronDownIcon } from './icons';

interface ACControlCardProps {
  acUnit: ACUnit;
  onUpdate: (id: number, updates: Partial<ACUnit>) => void;
}

const modeIcons: Record<ACMode, React.ReactNode> = {
  [ACMode.Cool]: <SnowflakeIcon className="h-6 w-6" />,
  [ACMode.Heat]: <SunIcon className="h-6 w-6" />,
  [ACMode.Fan]: <FanIcon className="h-6 w-6" />,
  [ACMode.Auto]: <AutoIcon className="h-6 w-6" />,
};

const fanSpeedIcons: Record<FanSpeed, React.ReactNode> = {
    [FanSpeed.Low]: <WaveLowIcon className="h-6 w-6" />,
    [FanSpeed.Medium]: <WaveMediumIcon className="h-6 w-6" />,
    [FanSpeed.High]: <WaveHighIcon className="h-6 w-6" />,
    [FanSpeed.Auto]: <AutoIcon className="h-6 w-6" />,
}

const ACControlCard: React.FC<ACControlCardProps> = ({ acUnit, onUpdate }) => {
  const { id, name, power, temperature, mode, fanSpeed, energyUsage } = acUnit;
  const [isEnergyVisible, setIsEnergyVisible] = useState(false);

  const handleTempChange = (newTemp: number) => {
    if (newTemp >= 16 && newTemp <= 30) {
      onUpdate(id, { temperature: newTemp });
    }
  };
  
  const getGlowClass = () => {
    if (!power) return 'shadow-slate-300/40 dark:shadow-slate-800/50';
    if (mode === ACMode.Cool) return 'shadow-cyan-500/40';
    if (mode === ACMode.Heat) return 'shadow-orange-500/40';
    return 'shadow-slate-500/40';
  };

  const getBorderClass = () => {
    if (!power) return 'border-slate-200 dark:border-slate-700';
    if (mode === ACMode.Cool) return 'border-cyan-500/50';
    if (mode === ACMode.Heat) return 'border-orange-500/50';
    return 'border-slate-500/50';
  }

  return (
    <div className={`
      bg-white dark:bg-slate-800/50 rounded-2xl p-6 border transition-all duration-300
      ${getBorderClass()} shadow-2xl ${getGlowClass()}
      flex flex-col gap-6
    `}>
      <div className={`${!power ? 'opacity-60 saturate-50' : ''} transition-all duration-300 flex flex-col gap-6`}>
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">{name}</h2>
          <button
            onClick={() => onUpdate(id, { power: !power })}
            className={`
              p-2 rounded-full transition-colors duration-300
              ${power ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600'}
            `}
            aria-label={power ? 'Turn Off' : 'Turn On'}
          >
            <PowerIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Temperature Control */}
        <div className="flex items-center justify-center gap-4 text-center">
           <button onClick={() => handleTempChange(temperature - 1)} disabled={!power} className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><MinusIcon className="h-6 w-6"/></button>
          <div className="flex flex-col items-center w-28">
              <span className={`text-6xl font-light tracking-tighter ${power && mode === ACMode.Cool ? 'text-cyan-400 dark:text-cyan-300' : power && mode === ACMode.Heat ? 'text-orange-400 dark:text-orange-300' : 'text-slate-800 dark:text-white'}`}>{temperature}</span>
              <span className="text-2xl font-light text-slate-500 dark:text-slate-400 -mt-2">°C</span>
          </div>
          <button onClick={() => handleTempChange(temperature + 1)} disabled={!power} className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><PlusIcon className="h-6 w-6"/></button>
        </div>
        
        {/* Mode Selection */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Mode</span>
          <div className="grid grid-cols-4 gap-2">
              {Object.values(ACMode).map((m) => (
                  <button
                      key={m}
                      onClick={() => onUpdate(id, { mode: m })}
                      disabled={!power}
                      className={`
                          p-3 flex justify-center items-center rounded-lg transition-all duration-200
                          capitalize text-sm font-semibold
                          ${mode === m ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}
                          disabled:opacity-50 disabled:cursor-not-allowed
                      `}
                  >
                      {modeIcons[m]}
                  </button>
              ))}
          </div>
        </div>

        {/* Fan Speed Selection */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Fan Speed</span>
          <div className="grid grid-cols-4 gap-2">
              {Object.values(FanSpeed).map((s) => (
                  <button
                      key={s}
                      onClick={() => onUpdate(id, { fanSpeed: s })}
                      disabled={!power}
                      className={`
                          p-3 flex justify-center items-center rounded-lg transition-all duration-200
                          capitalize text-sm font-semibold
                          ${fanSpeed === s ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}
                          disabled:opacity-50 disabled:cursor-not-allowed
                      `}
                  >
                      {fanSpeedIcons[s]}
                  </button>
              ))}
          </div>
        </div>
      </div>
      
      {/* Energy Usage */}
      <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex flex-col gap-4">
        <button 
          onClick={() => setIsEnergyVisible(!isEnergyVisible)}
          className="flex justify-between items-center w-full text-left"
        >
          <div className="flex items-center gap-2">
            <LightningBoltIcon className="h-5 w-5 text-yellow-500"/>
            <h3 className="font-semibold text-slate-700 dark:text-slate-200">Energy Usage</h3>
          </div>
          <ChevronDownIcon className={`h-5 w-5 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${isEnergyVisible ? 'rotate-180' : ''}`} />
        </button>
        <div className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isEnergyVisible ? 'max-h-40' : 'max-h-0'}
        `}>
          <div className="flex justify-around pt-2">
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">Daily</p>
              <p className="text-lg font-bold text-slate-800 dark:text-white">{energyUsage.dailyKwh.toFixed(2)} <span className="text-sm font-normal text-slate-600 dark:text-slate-300">kWh</span></p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">Monthly</p>
              <p className="text-lg font-bold text-slate-800 dark:text-white">{energyUsage.monthlyKwh.toFixed(2)} <span className="text-sm font-normal text-slate-600 dark:text-slate-300">kWh</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ACControlCard;
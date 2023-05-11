import React, { useState, useEffect, useCallback } from 'react';
import './style.css';

type Time = {
  ms: number;
  s: number;
  m: number;
  h: number;
}

const StopWatch: React.FC = () => {
  const [time, setTime] = useState<Time>({ ms: 0, s: 0, m: 0, h: 0 });
  const [saveLaps, setSaveLaps] = useState<Time[]>([]);
  const [int, setInt] = useState<NodeJS.Timeout | null>(null);
  const [reverse, setReverse] = useState<boolean>(false);

  const [isResetClicked, setIsResetClicked] = useState<boolean>(false);


  const updateTimer = useCallback(() => {
    setTime((tempo: Time) => {
      let ms = tempo.ms + 1;
      let s = tempo.s;
      let m = tempo.m;
      let h = tempo.h;

      if (ms === 100) {
        ms = 0;
        s++;
      }

      if (s === 60) {
        s = 0;
        m++;
      }

      if (m === 60) {
        m = 0;
        h++;
      }
      return { ms, s, m, h };
    });
  }, []);

  const startTimer = useCallback(() => {
    setInt(setInterval(updateTimer, 10));
    setReverse(false);
  }, [updateTimer]);

  const stopTimer = useCallback(() => {
    if (int) {
      clearInterval(int);
    }
    setInt(null);
    setReverse(true);
  }, [int]);

  const resetTimer = useCallback(() => {
    if (int) {
      clearInterval(int);
    }
    setInt(null);
    setReverse(true);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
    setSaveLaps([]);
  }, [int]);

  const saveLap = useCallback(() => {
    setSaveLaps((tempo) => [...tempo, time]);
  }, [time]);

  const timeString = useCallback((time: Time) => {
    const { ms, s, m, h } = time;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    return () => {
      if (int) {
        clearInterval(int);
      }
    }
  }, [int]);

  return (
    <div className="stopwatch-container container d-flex align-items-center justify-content-center flex-column">
      <h1 className={`stopwatch-time ${isResetClicked ? 'clicked' : ''} mb-3`}>{timeString(time)}</h1>
      <div className="stopwatch-buttons">
        {
          (() => {
            let buttons;
            if (int === null) {
              if (reverse) {
                buttons = (
                  <>
                    <button className="start-btn" onClick={startTimer}>Start</button>
                    <button className={`reset-btn ${isResetClicked ? 'clicked' : ''}`} onClick={() => {
                    setIsResetClicked(true);
                    setTimeout(() => setIsResetClicked(false), 500); 
                    resetTimer();}}>
                      Reset
                    </button>
                  </>
                );
              } else {
                buttons = (
                  <>
                    <button className="start-btn" onClick={startTimer}>Start</button>
                    <button className="stop-btn" onClick={stopTimer} disabled>Stop</button>
                  </>
                );
              }
            } else {
              buttons = (
                <>
                  <button className="stop-btn" onClick={stopTimer}>
                    Stop
                  </button>
                  <button className="lap-btn" onClick={saveLap}>
                    Lap
                  </button>
                </>
              );
            }
            return buttons;
          })()
        }
      </div>
      <ol className="stopwatch-laps">
        {saveLaps.map((lap, index) => (
          <li key={index}>{timeString(lap)}</li>
        ))}
      </ol>
    </div>
  );
  
    }
  export default StopWatch      
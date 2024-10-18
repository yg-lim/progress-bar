import './App.css'
import { ProgressBar } from './components/ProgressBar';
import { CreateProgressBarButton } from './components/CreateProgressBarButton';
import { useState, SyntheticEvent, useEffect } from 'react';

const MAX_CONCURRENT_BARS = 5;

function App() {
  const [progressBars, setProgressBars] = useState<number[]>([]);
  const [activeBars, setActiveBars] = useState<number[]>([]);

  useEffect(() => {
    setProgressBars([]);
    setActiveBars([0]);
  }, []);

  useEffect(() => {
    if (activeBars.length < MAX_CONCURRENT_BARS) {
      const nextBarToActivate = progressBars.find(id => id > activeBars[activeBars.length - 1] && !activeBars.includes(id));
      if (nextBarToActivate !== undefined) {
        setActiveBars(prev => [...prev, nextBarToActivate]);
      }
    }
  }, [activeBars, progressBars]);

  function handleClick(event: SyntheticEvent) {
    event.preventDefault();

    setProgressBars(prevBars => [...prevBars, prevBars.length]);
  }

  function handleCompleted(id: number) {
    setActiveBars(prev => prev.filter(bar => bar !== id));
  }

  return (
    <>
      <CreateProgressBarButton handleClick={handleClick} />
      {
        progressBars.map(id => {
          return <div key={id} style={{ marginTop: '10px' }}>
            <ProgressBar active={activeBars.includes(id)} id={id} handleCompleted={handleCompleted} />
          </div>
        })
      }
    </>
  )
}

export default App

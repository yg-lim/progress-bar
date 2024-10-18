import { useState, useEffect, useRef } from "react";

const BAR_SEGMENTS = 5;
const BAR_PERCENTAGE = 100 / BAR_SEGMENTS;

interface ProgressBarProps {
  id: number;
  active: boolean;
  handleCompleted: (id: number) => void;
}

export function ProgressBar({ id, active, handleCompleted }: ProgressBarProps) {
  const [completed, setCompleted] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  function handleStart() {
    setCompleted(0);

    clearInterval(intervalRef.current!);
    intervalRef.current = setInterval(() => setCompleted(prevCompleted => {
      if (prevCompleted >= BAR_SEGMENTS) {
        clearInterval(intervalRef.current!);
        return BAR_SEGMENTS;
      }

      return prevCompleted + 1;
    }), 1000);
  }

  function handleStop() {
    clearInterval(intervalRef.current!);
  }

  useEffect(() => {
    if (completed === BAR_SEGMENTS) handleCompleted(id);
  }, [completed]);

  useEffect(() => {
    if (active) handleStart();
    else {
      handleStop();
    }
    return () => clearInterval(intervalRef.current!);
  }, [active]);

  const progress = completed * BAR_PERCENTAGE;

  return (
    <div style={{ width: '200px', height: '20px', border: '1px solid black', backgroundColor: 'white', background: `linear-gradient(to right, green ${progress}%, rgba(0,0,0,0) ${progress}%)` }}></div>
  );
}

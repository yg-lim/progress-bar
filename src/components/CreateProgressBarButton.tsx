import { SyntheticEvent } from "react";

interface CreateProgressBarButtonProps {
  handleClick: (event: SyntheticEvent) => void;
}

export function CreateProgressBarButton({ handleClick }: CreateProgressBarButtonProps) {
  return (
    <button onClick={handleClick} style={{ marginBottom: '20px' }}>Add Progress Bar</button>
  )
}

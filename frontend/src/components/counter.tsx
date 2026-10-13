import { useState } from 'react';

export type CounterProbs = {
  initialValue: number;
  label: string;
  onDecrement?: (newValue: number) => void;
  onIncrement?: (newValue: number) => void;
};


export function Counter (probs: CounterProbs) {

  const [value, setValue] = useState(probs.initialValue)

  const handleDecrement = () => {
    const newValue = value - 1;
    setValue(newValue);
    probs.onDecrement?.(newValue);
  }

  const handleIncrement = () => {
    const newValue = value + 1;
    setValue(newValue);
    probs.onIncrement?.(newValue);
  }

  return (
    <div>
      <label>{ probs.label }</label>
      <div className="flex items-center gap-4" >
        <button onClick={handleDecrement}>-</button>
        <p>{ value }</p>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
};

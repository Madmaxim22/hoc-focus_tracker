import React from 'react';

export interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default Input;

import './App.css'
import React from 'react';
import withFocusTracker from './hoc/withFocusTracker';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <input {...props} ref={ref} />
));

const InputWithFocusTracker = withFocusTracker(Input);


function App() {

  const [value, setValue] = React.useState('');
  const [focused, setFocused] = React.useState(false);

  return (
    <>
    <InputWithFocusTracker
      value={value}
      onChange={e => setValue(e.target.value)}
      onFocusChange={setFocused}
      onFocus={e => console.log('Focused')}
      onBlur={e => console.log('Blurred')}
    />
    {focused ? <span>Поле в фокусе</span> : <span>Поле не в фокусе</span>}
    </>
  )
} 

export default App

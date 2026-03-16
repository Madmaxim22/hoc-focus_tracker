import './App.css'
import React from 'react';
import withFocusTracker, { type FocusTrackerInjectedProps } from './hoc/withFocusTracker';
import Input, { type InputProps } from './components/Input';
import Label, { type LabelProps } from './components/Label';
import FocusStatus from './components/FocusStatus';

interface InputContainerProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputContainer = React.forwardRef<HTMLElement, InputContainerProps>((props) => {
  // здесь нет ни <div>, ни <input>, ни ref на DOM
  return (
    <>
      <h3>Заголовок</h3>
      {/* ref и onFocus/onBlur НЕ используются */}
      <Input value={props.value} onChange={props.onChange} />
    </>
  );
});

type InputWithFocusTrackerProps = InputProps & Partial<FocusTrackerInjectedProps>;
type InputContainerWithFocusTrackerProps = InputContainerProps & Partial<FocusTrackerInjectedProps>;
type LabelWithFocusTrackerProps = LabelProps & Partial<FocusTrackerInjectedProps>;

const InputWithFocusTracker = withFocusTracker<InputProps>(Input) as React.ComponentType<InputWithFocusTrackerProps>;
const InputContainerWithFocusTracker = withFocusTracker<InputContainerProps>(InputContainer) as React.ComponentType<InputContainerWithFocusTrackerProps>;
const LabelWithFocusTracker = withFocusTracker<LabelProps>(Label) as React.ComponentType<LabelWithFocusTrackerProps>;

function App() {

  const [value, setValue] = React.useState('');
  const [focusedInput, setFocusedInput] = React.useState(false);
  const [focusedInputContainer, setFocusedInputContainer] = React.useState(false);
  const [focusedLabel, setFocusedLabel] = React.useState(false);

  return (
    <>
      <InputWithFocusTracker
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocusChange={setFocusedInput}
        onFocus={() => console.log('Focused')}
        onBlur={() => console.log('Blurred')}
      />
      <FocusStatus
        isFocused={focusedInput}
        focusedText="Поле в фокусе"
        blurredText="Поле не в фокусе"
      />

      <InputContainerWithFocusTracker
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocusChange={setFocusedInputContainer}
        onFocus={() => console.log('Focused')}
        onBlur={() => console.log('Blurred')}
      />
      <FocusStatus
        isFocused={focusedInputContainer}
        focusedText="Wrapper контейнера в фокусе"
        blurredText="Wrapper контейнера не в фокусе"
      />

      <LabelWithFocusTracker
        text="Метка"
        onFocusChange={setFocusedLabel}
        onFocus={() => console.log('Focused label')}
        onBlur={() => console.log('Blurred label')}
      />
      <FocusStatus
        isFocused={focusedLabel}
        focusedText="Wrapper метки в фокусе"
        blurredText="Wrapper метки не в фокусе"
      />
    </>
  )
} 

export default App

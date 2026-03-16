import './App.css'
import React from 'react';
import withFocusTracker from './hoc/withFocusTracker';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Пример 1: компонент С СОБСТВЕННЫМ DOM-узлом.
// Здесь компонент сам рендерит <input> и пробрасывает в него ref.
// Доп. проп isFocused «виден» только для HOC и не входит в публичный интерфейс InputProps.
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input {...props} ref={ref} />;
});

const InputWithFocusTracker = withFocusTracker(Input);

// Пример 2: компонент БЕЗ корневого DOM-узла.
// Он возвращает несколько элементов через React.Fragment (<>...</>),
// то есть у него нет одного корневого DOM-элемента.
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

const InputContainerWithFocusTracker = withFocusTracker(InputContainer);

// Пример 3: ещё один компонент без корневого DOM-элемента.
// Возвращает два <span> как соседние элементы внутри Fragment.
interface LabelProps {
  text: string;
  isFocused?: boolean;
}

const Label: React.FC<LabelProps> = ({ text, isFocused }) => (
  <>
    <span>{text}</span>
    <span style={{ marginLeft: 8 }}>
      {isFocused ? ' (в фокусе wrapper HOC)' : ' (не в фокусе wrapper HOC)'}
    </span>
  </>
);

const LabelWithFocusTracker = withFocusTracker<LabelProps>(Label);

function App() {

  const [value, setValue] = React.useState('');
  const [focusedInput, setFocusedInput] = React.useState(false);
  const [focusedInputContainer, setFocusedInputContainer] = React.useState(false);
  const [focusedLabel, setFocusedLabel] = React.useState(false);

  return (
    <>
      {/* Пример 1: компонент с собственным DOM-узлом (Input + HOC) */}
      <InputWithFocusTracker
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocusChange={setFocusedInput}
        onFocus={() => console.log('Focused')}
        onBlur={() => console.log('Blurred')}
      />
      {focusedInput ? <span>Поле в фокусе</span> : <span>Поле не в фокусе</span>}

      {/* Пример 2: компонент без собственного DOM-узла (InputContainer) */}
      <InputContainerWithFocusTracker
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocusChange={setFocusedInputContainer}
        onFocus={() => console.log('Focused')}
        onBlur={() => console.log('Blurred')}
      />
      {focusedInputContainer ? <span>Wrapper контейнера в фокусе</span> : <span>Wrapper контейнера не в фокусе</span>}

      {/* Пример 3: компонент без корневого DOM-узла (Label),
          HOC сам создаёт корневой <div>, поэтому фокус всё равно отслеживается */}
      <LabelWithFocusTracker
        text="Метка"
        onFocusChange={setFocusedLabel}
        onFocus={() => console.log('Focused label')}
        onBlur={() => console.log('Blurred label')}
      />
      {focusedLabel ? <span>Wrapper метки в фокусе</span> : <span>Wrapper метки не в фокусе</span>}
    </>
  )
} 

export default App

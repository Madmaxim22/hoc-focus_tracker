import './App.css';
import React from 'react';
import {
  withFocusOnComponent,
  withFocusOnWrapper,
  type FocusTrackerInjectedProps,
} from './hoc/withFocusTracker';
import Input, { type InputProps } from './components/Input';
import Label, { type LabelProps } from './components/Label';
import FocusStatus from './components/FocusStatus';

interface InputContainerProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputContainer = React.forwardRef<HTMLElement, InputContainerProps>((props) => {
  return (
    <div className="demo-container">
      <div className="demo-container__badge">Контейнер компонента InputContainer</div>
      <h3 className="demo-container__title">Заголовок внутри контейнера</h3>
      <Input value={props.value} onChange={props.onChange} />
    </div>
  );
});

type InputWithFocusTrackerProps = InputProps & Partial<FocusTrackerInjectedProps>;
type InputContainerWithFocusTrackerProps = InputContainerProps & Partial<FocusTrackerInjectedProps>;
type LabelWithFocusTrackerProps = LabelProps & Partial<FocusTrackerInjectedProps>;

const InputWithFocusTracker = withFocusOnComponent<InputProps>(Input) as React.ComponentType<InputWithFocusTrackerProps>;
const InputContainerWithFocusTracker = withFocusOnWrapper<InputContainerProps>(InputContainer) as React.ComponentType<InputContainerWithFocusTrackerProps>;
const LabelWithFocusTracker = withFocusOnWrapper<LabelProps>(Label) as React.ComponentType<LabelWithFocusTrackerProps>;

function App() {
  const [value, setValue] = React.useState('');
  const [focusedInput, setFocusedInput] = React.useState(false);
  const [focusedInputContainer, setFocusedInputContainer] = React.useState(false);
  const [focusedLabel, setFocusedLabel] = React.useState(false);

  return (
    <div className="app">
      <div className="app__inner">
        <header className="app__header">
          <h1 className="app__title">Трекер фокуса (HOC)</h1>
          <p className="app__subtitle">
            Примеры использования компонента высшего порядка для отслеживания фокуса.
          </p>
        </header>

        <main className="app__grid">
          <section className="card">
            <h2 className="card__title">Обычный инпут</h2>
            <p className="card__description">
              Фокус отслеживается непосредственно на самом поле ввода.
            </p>

            <div className="card__control">
              <InputWithFocusTracker
                value={value}
                onChange={e => setValue(e.target.value)}
                onFocusChange={setFocusedInput}
                onFocus={() => console.log('Focused')}
                onBlur={() => console.log('Blurred')}
              />
            </div>

            <FocusStatus
              isFocused={focusedInput}
            />
          </section>

          <section className="card">
            <h2 className="card__title">Контейнер с инпутом</h2>
            <p className="card__description">
              HOC оборачивает контейнер, внутри которого находится поле ввода.
            </p>

            <div className="card__control">
              <InputContainerWithFocusTracker
                value={value}
                onChange={e => setValue(e.target.value)}
                onFocusChange={setFocusedInputContainer}
                onFocus={() => console.log('Focused')}
                onBlur={() => console.log('Blurred')}
              />
            </div>

            <FocusStatus
              isFocused={focusedInputContainer}
            />
          </section>

          <section className="card">
            <h2 className="card__title">Метка (Label)</h2>
            <p className="card__description">
              Фокус отслеживается на wrapper HOC вокруг текстовой метки.
            </p>

            <div className="card__control">
              <LabelWithFocusTracker
                text="Метка"
                onFocusChange={setFocusedLabel}
                onFocus={() => console.log('Focused label')}
                onBlur={() => console.log('Blurred label')}
              />
            </div>

            <FocusStatus
              isFocused={focusedLabel}
            />
          </section>
        </main>
      </div>
    </div>
  );
} 

export default App

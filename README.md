[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-hoc--focus_tracker-1f2937?style=for-the-badge&logo=github)](https://madmaxim22.github.io/hoc-focus_tracker/)

## Описание

Учебный пример использования **компонентов высшего порядка (HOC)** в React для **отслеживания фокуса**:

- **InputWithFocusTracker** — фокус отслеживается на самом поле ввода.
- **InputContainerWithFocusTracker** — фокус отслеживается на контейнере, внутри которого расположен инпут.
- **LabelWithFocusTracker** — фокус отслеживается на HOC‑обёртке вокруг текстовой метки.

Для каждого примера внизу отображается компонент `FocusStatus` со статусом: находится ли элемент **в фокусе** или **вне фокуса**.

Проект показывает:

- как инкапсулировать логику отслеживания фокуса в переиспользуемый HOC;
- два варианта HOC:
  - отслеживание фокуса **на самом компоненте** (`withFocusOnComponent`);
  - отслеживание фокуса **на wrapper‑контейнере** (`withFocusOnWrapper`);
- использование **хука `useFocusTracker`** для управления состоянием фокуса и колбэком `onFocusChange`.

## Технологии

- **React** + TypeScript
- **Vite** (или аналогичный современный сборщик)
- CSS‑модули/классические стили для оформления интерфейса

## Структура проекта

Основные файлы, связанные с HOC:

- `src/hoc/withFocusTracker.tsx` — реализации:
  - `useFocusTracker` — хук для хранения состояния `isFocused` и вызова `onFocusChange`;
  - `withFocusOnComponent` — HOC, который:
    - подписывается на события `onFocus` / `onBlur` самого компонента;
    - прокидывает во вложенный компонент пропсы `isFocused`, `onFocus`, `onBlur`;
  - `withFocusOnWrapper` — HOC, который:
    - создаёт wrapper‑`div` с `tabIndex={-1}`;
    - отслеживает фокус на wrapper’е и передаёт `isFocused` во вложенный компонент.
- `src/components/Input.tsx` — простой контролируемый инпут с `forwardRef`.
- `src/components/Label.tsx` — компонент метки (`Label`), принимающий текст и опциональный `isFocused`.
- `src/components/FocusStatus.tsx` — визуальный индикатор состояния фокуса.
- `src/utils/composeEventHandlers.ts` — утилита для безопасной композиции обработчиков событий (объединяет существующий `onFocus`/`onBlur` с логикой HOC).
- `src/App.tsx` — витрина‑демо, где собраны три варианта использования HOC.

## Как работает HOC отслеживания фокуса

1. Хук `useFocusTracker` внутри HOC хранит состояние `isFocused` и предоставляет функции `handleFocus` и `handleBlur`.
2. При срабатывании `focus`:
   - `isFocused` устанавливается в `true`;
   - вызывается внешний колбэк `onFocusChange?.(true)`, если он был передан.
3. При срабатывании `blur`:
   - `isFocused` устанавливается в `false`;
   - вызывается `onFocusChange?.(false)`.
4. В `App.tsx` в каждом примере:
   - в HOC‑обёрнутый компонент передаётся `onFocusChange={setFocusedX}`;
   - локальный `useState` хранит флаг `focusedX`;
   - компонент `FocusStatus` отображает текущий статус.

Таким образом, HOC полностью инкапсулирует механику отслеживания фокуса и позволяет переиспользовать её с любыми совместимыми компонентами.

## Запуск проекта локально

```bash
npm install
npm run dev
```

После запуска откройте в браузере адрес, указанный Vite (обычно `http://localhost:5173`).


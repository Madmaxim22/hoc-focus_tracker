import React from 'react';
import { composeEventHandlers } from '../utils/composeEventHandlers';

export interface FocusTrackerInjectedProps<T = HTMLElement> {
  isFocused: boolean;
  onFocusChange?: (isFocused: boolean) => void;
  onFocus?: (event: React.FocusEvent<T>) => void;
  onBlur?: (event: React.FocusEvent<T>) => void;
}

function useFocusTracker<T extends HTMLElement = HTMLElement>(
  onFocusChange?: (isFocused: boolean) => void
) {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = React.useCallback(() => {
    setIsFocused(true);
    onFocusChange?.(true);
  }, [onFocusChange]);

  const handleBlur = React.useCallback(() => {
    setIsFocused(false);
    onFocusChange?.(false);
  }, [onFocusChange]);

  return { isFocused, handleFocus, handleBlur };
}

/**
 * Вариант HOC, который отслеживает фокус непосредственно на самом компоненте.
 * Подходит для компонентов, которые пробрасывают ref до DOM-узла (например, input).
 */
export function withFocusOnComponent<P, T extends HTMLElement = HTMLElement>(
  WrappedComponent: React.ComponentType<P & FocusTrackerInjectedProps<T>>
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P & FocusTrackerInjectedProps<T>> & React.RefAttributes<T>
> {
  const Component = React.memo(
    React.forwardRef<T, P & FocusTrackerInjectedProps<T>>((props, ref) => {
      const { onFocusChange, onFocus, onBlur, ...restProps } = props;
      const { isFocused, handleFocus, handleBlur } = useFocusTracker<T>(onFocusChange);

      return (
        <WrappedComponent
          {...(restProps as P)}
          isFocused={isFocused}
          onFocus={composeEventHandlers(onFocus, handleFocus)}
          onBlur={composeEventHandlers(onBlur, handleBlur)}
          ref={ref as React.ForwardedRef<T>}
        />
      );
    })
  );

  Component.displayName = `withFocusOnComponent(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return Component;
}

/**
 * Вариант HOC, который создаёт визуальный wrapper вокруг компонента
 * и отслеживает фокус на этом wrapper’е.
 */
export function withFocusOnWrapper<P>(
  WrappedComponent: React.ComponentType<P & FocusTrackerInjectedProps>
): React.FC<P & FocusTrackerInjectedProps> {
  const Component: React.FC<P & FocusTrackerInjectedProps> = React.memo((props) => {
    const { onFocusChange, onFocus, onBlur, ...restProps } = props;
    const { isFocused, handleFocus, handleBlur } = useFocusTracker(onFocusChange);

    return (
      <div
        className="hoc-wrapper"
        tabIndex={-1}
        onFocus={composeEventHandlers(onFocus, handleFocus)}
        onBlur={composeEventHandlers(onBlur, handleBlur)}
      >
        <div className="hoc-wrapper__badge">
          Контейнер HOC (отслеживание фокуса)
        </div>
        <WrappedComponent
          {...(restProps as P)}
          isFocused={isFocused}
        />
      </div>
    );
  });

  Component.displayName = `withFocusOnWrapper(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return Component;
}

// Для совместимости по умолчанию экспортируем вариант с wrapper’ом
export default withFocusOnWrapper;

import React from 'react';

interface FocusTrackerInjectedProps {
  isFocused: boolean;
  onFocusChange?: (isFocused: boolean) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
}

function withFocusTracker<P>(
  WrappedComponent: React.ComponentType<P>
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P & FocusTrackerInjectedProps> & React.RefAttributes<HTMLElement>
> {
  const Component = React.forwardRef<HTMLElement, P & FocusTrackerInjectedProps>((props, _ref) => {
    const { onFocusChange, ...restProps } = props;
    const [isFocused, setIsFocused] = React.useState(false);
    const handleFocus = (event: React.FocusEvent) => {
      setIsFocused(true);
      props.onFocus?.(event);
      onFocusChange?.(true);
    };
    const handleBlur = (event: React.FocusEvent) => {
      setIsFocused(false);
      props.onBlur?.(event);
      onFocusChange?.(false);
    };
    return (
      <WrappedComponent
        {...(restProps as P)}
        isFocused={isFocused}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={_ref}
      />
    );
  });

  return Component;
}
export default withFocusTracker;

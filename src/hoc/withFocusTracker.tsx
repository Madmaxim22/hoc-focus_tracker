import React from 'react';
import { composeEventHandlers } from '../utils/composeEventHandlers';

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
  const Component = React.forwardRef<HTMLElement, P & FocusTrackerInjectedProps>(
    (props, _ref) => {
      const { onFocusChange, onFocus, onBlur, ...restProps } = props;
      const [isFocused, setIsFocused] = React.useState(false);
      
      const handleFocus = () => {
        setIsFocused(true);
        onFocusChange?.(true);
      };

      const handleBlur = () => {
        setIsFocused(false);
        onFocusChange?.(false);
      };
      return (
        <div 
        tabIndex={-1} 
        onFocus={composeEventHandlers(onFocus, handleFocus)} 
        onBlur={composeEventHandlers(onBlur, handleBlur)}
        ref={_ref as React.ForwardedRef<HTMLDivElement>}
        >
          <WrappedComponent
            {...(restProps as P)}
            isFocused={isFocused}
          />
        </div>
      );
    }
  );

  return Component;
}
export default withFocusTracker;

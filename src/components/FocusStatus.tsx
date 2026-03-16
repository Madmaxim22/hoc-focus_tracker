import React from 'react';

interface FocusStatusProps {
  isFocused: boolean;
  focusedText: string;
  blurredText: string;
}

const FocusStatus: React.FC<FocusStatusProps> = ({ isFocused, focusedText, blurredText }) => {
  return <span>{isFocused ? focusedText : blurredText}</span>;
};

export default FocusStatus;

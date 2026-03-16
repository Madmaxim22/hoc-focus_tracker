import React from 'react';

export interface LabelProps {
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

export default Label;

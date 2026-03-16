import React from 'react';

export interface LabelProps {
  text: string;
  isFocused?: boolean;
}

const Label: React.FC<LabelProps> = ({ text }) => (
  <div className="label">
    <span className="label__text">{text}</span>
  </div>
);

export default Label;

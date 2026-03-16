interface FocusStatusProps {
  isFocused: boolean;
}

export default function FocusStatus({ isFocused }: FocusStatusProps) {
  return (
    <div className="focus-status">
      <span className={`focus-status__badge ${isFocused ? 'focus-status__badge--focused' : 'focus-status__badge--blurred'}`}>
        {isFocused ? 'В фокусе' : 'Не в фокусе'}
      </span>
    </div>
  );
}

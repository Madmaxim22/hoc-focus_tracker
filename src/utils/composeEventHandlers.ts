export function composeEventHandlers<E>(
  theirHandler?: (event: E) => void,
  ourHandler?: (event: E) => void,
  options?: { checkDefaultPrevented?: boolean }
) {
  return (event: E) => {
    theirHandler?.(event);

    if (
      !options?.checkDefaultPrevented ||
      !(event as unknown as { defaultPrevented?: boolean }).defaultPrevented
    ) {
      ourHandler?.(event);
    }
  };
}

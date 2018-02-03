export const shouldBePresentError = (errorPresence: boolean): string | null => {
  return (errorPresence ? `should be present` : null);
};

export const shouldBeInRangeError = (value: number, min: number, max: number): string | null => {
  if ((value > max) || (value < min)) {
    return `should be in range from ${min} to ${max}`;
  } else {
    return null;
  }
};

export function numericId(len) {
  const max = Math.pow(10, len)-1,
    min = Math.pow(10, len-1);

  const number = Math.random() * (max - min) + min;
  return Math.floor(number);
}

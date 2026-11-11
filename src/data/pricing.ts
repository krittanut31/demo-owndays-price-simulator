// แว่นสายตา: 7,000 – 22,000 ขยับทีละ 1,000
export const eyeglassPriceRanges: number[] = Array.from(
  { length: 16 },
  (_, i) => 7000 + i * 1000,
);

// แว่นกันแดด
export const sunglassPriceRanges: number[] = [6000, 8000];

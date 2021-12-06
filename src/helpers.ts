export function cssCalc(a: string, sign: '+' | '-', b: string) {
  return `calc(${a} ${sign} ${b})`;
}

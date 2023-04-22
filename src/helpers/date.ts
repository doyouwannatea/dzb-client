export function isValidDate(dateString: string): boolean {
  return !isNaN(Date.parse(dateString));
}

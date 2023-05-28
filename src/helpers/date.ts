import { DateTime } from 'luxon';

export function isValidDate(
  dateString: string,
  format = 'yyyy-MM-dd',
): boolean {
  return DateTime.fromFormat(dateString, format).isValid;
}

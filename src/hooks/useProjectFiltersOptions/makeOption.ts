import { Option } from './types';

export const makeOption =
  <T>(labelKey: keyof T, valueKey: keyof T) =>
  (item: T): Option => ({
    label: String(item[labelKey]),
    value: String(item[valueKey]),
  });

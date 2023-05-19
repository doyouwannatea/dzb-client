import { VueWrapper } from '@vue/test-utils';

export const getTestId = (testId: string) => `[data-test-id="${testId}"]`;

export const getInput = (wrapper: VueWrapper, testId: string) =>
  wrapper.find<HTMLInputElement>(getTestId(testId));
export const getRadioButton = (wrapper: VueWrapper, testId: string) =>
  wrapper.find<HTMLInputElement>(`${getTestId(testId)} > input[type='radio']`);
export const getDropdown = (wrapper: VueWrapper, testId: string) => {
  const dropdownWrapper = wrapper.find(`${getTestId(testId)}`);
  if (!dropdownWrapper.exists()) throw new Error(testId);
  return dropdownWrapper;
};

export const getInputValue = (wrapper: VueWrapper, testId: string): string =>
  getInput(wrapper, testId).element.value;
export const getRadioButtonValue = (
  wrapper: VueWrapper,
  testId: string,
): boolean => getRadioButton(wrapper, testId).element.checked;
export const getDropdownValue = (
  wrapper: VueWrapper,
  testId: string,
): string => {
  try {
    return getDropdown(wrapper, testId)
      .find('.multiselect-single-label-text')
      .text();
  } catch (error) {
    return '';
  }
};

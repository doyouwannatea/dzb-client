import { useMediaQuery } from '@vueuse/core';
import { desktopS, mobileS } from '@/values/breakpoints';

export const useMobileS = () => useMediaQuery(`(max-width: ${mobileS})`);
export const useDesktopS = () => useMediaQuery(`(max-width: ${desktopS})`);

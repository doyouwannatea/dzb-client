import { watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { sleep } from '@/helpers/promise';
import { saveScrollPosition, getScrollPosition } from '@/helpers/scroll';
import { useProjectsStore } from '@/stores/projects/useProjectsStore';

const COOKIE_KEY = 'project-page-scrollY';

export const useSaveHomePageScrollPosition = () => {
  onBeforeRouteLeave(() => saveScrollPosition(COOKIE_KEY));
};

export const useHomePageSavedScrollPosition = () => {
  const useProjectStore = useProjectsStore();

  watch(
    () => useProjectStore.projectList,
    async () => {
      if (useProjectStore.projectList) {
        const scrollPosY = getScrollPosition(COOKIE_KEY);
        await sleep(0);
        scrollTo({ left: 0, top: Number(scrollPosY) });
      }
    },
  );
};

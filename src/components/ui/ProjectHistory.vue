<template>
  <ul ref="containerRef" class="container" @wheel="scrollHorizontally">
    <li
      v-for="{ title, year, projectId } in props.projectList"
      :key="projectId"
      :class="{ current: projectId === props.currentProjectId }"
      class="project"
    >
      <p class="year">{{ year }}</p>
      <RouterLink class="link" :to="toProjectRoute(projectId)">
        {{ title }}
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { toProjectRoute } from '@/router/utils/routes';

  interface Project {
    title: string;
    year: string;
    projectId: number;
  }

  interface Props {
    /**
     * Список проектов для отображения
     */
    projectList: Project[];
    /**
     * Текущий ID проекта. Выделяется среди остальных проектов
     */
    currentProjectId: number;
  }

  const props = defineProps<Props>();
  const containerRef = ref<HTMLElement | null>(null);

  // https://ru.stackoverflow.com/questions/722003/%D0%93%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%BD%D1%82%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F-%D0%BF%D1%80%D0%BE%D0%BA%D1%80%D1%83%D1%82%D0%BA%D0%B0-%D0%B1%D0%BB%D0%BE%D0%BA%D0%B0-%D0%BC%D1%8B%D1%88%D1%8C%D1%8E
  function scrollHorizontally(event: WheelEvent) {
    if (!containerRef.value) return;

    let modifier = 1;
    if (event.deltaMode === event.DOM_DELTA_LINE) {
      modifier = parseInt(getComputedStyle(containerRef.value).lineHeight);
    }
    if (event.deltaMode === event.DOM_DELTA_PAGE) {
      modifier = containerRef.value.clientHeight;
    }
    if (event.deltaY !== 0) {
      // замена вертикальной прокрутки горизонтальной
      containerRef.value.scrollLeft += modifier * event.deltaY;
      event.preventDefault();
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    overflow-x: auto;

    /* Works on Firefox */
    scrollbar-color: var(--gray-color-3) transparent;

    /* Works on Chrome, Edge, and Safari */
    &::-webkit-scrollbar {
      height: auto;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--gray-color-3);
      border-right: 2.5rem solid #fff;
    }
  }

  .year {
    margin: 1.6875rem 0 1.25rem;
    font-size: 1.125rem;
    font-weight: 800;
    color: var(--gray-color-2);
  }

  .link {
    display: block;
    font-size: 1.125rem;
    line-height: 150%;
    color: var(--accent-color-1);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .project {
    position: relative;
    min-width: 20.625rem;
    padding-right: 1rem;
    list-style: none;
    border-top: 0.25rem solid var(--gray-color-1);

    &::before {
      position: absolute;
      top: -0.6563rem;
      width: 1.0625rem;
      height: 1.0625rem;
      content: '';
      background-color: var(--gray-color-2);
      border-radius: 50%;
    }

    &:last-child {
      border-color: transparent;
    }
  }

  .current {
    font-size: 1.125rem;
    font-weight: 800;
    color: var(--accent-color-1);

    &::before {
      background-color: var(--accent-color-1);
    }

    &::after {
      position: absolute;
      top: -2.0938rem;
      left: -2.25rem;
      content: 'Вы здесь';
    }

    &:first-child {
      &::after {
        left: 0;
      }
    }

    .year {
      color: inherit;
    }
  }
</style>

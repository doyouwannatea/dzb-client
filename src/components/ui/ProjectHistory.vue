<template>
  <div>
    <h1>Версии проекта</h1>
    <div class="content">
      <div
        v-for="{ title, year, link, last, current } in items"
        :key="title + year"
        :class="[last ? 'last' : '', current ? 'current' : '']"
        class="block"
      >
        <div class="project">
          <p>{{ year }}</p>
          <RouterLink class="link" :to="{ link }">
            <h2>{{ title }}</h2>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { withDefaults } from 'vue';

  export interface Projects {
    title: string;
    year: string;
    link?: string;
    last?: boolean;
    current?: boolean;
  }

  withDefaults(
    defineProps<{
      items?: Projects[];
    }>(),
    {
      items: () => [],
    },
  );
</script>

<style lang="scss" scoped>
  h1 {
    font-size: 40px;
    font-weight: 800;
  }

  h2 {
    font-size: 18px;
    line-height: 150%;
  }

  p {
    margin: 27px 0 20px;
    font-size: 18px;
    font-weight: 800;
    color: var(--gray-color-2);
  }

  .content {
    display: flex;
    padding: 100px 0;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .block {
    position: relative;
    width: 300px;
    border-top: 4px solid var(--gray-color-1);

    &::before {
      position: absolute;
      top: -10.5px;
      display: block;
      width: 17px;
      height: 17px;
      content: '';
      background-color: var(--gray-color-2);
      border-radius: 50%;
    }
  }

  .last {
    border-color: white;
  }

  .project {
    width: 250px;
  }

  .current {
    font-weight: 800;

    &::before {
      background-color: var(--accent-color-1);
    }

    &::after {
      position: absolute;
      top: -33.5px;
      left: -36px;
      display: block;
      font-size: 18px;
      font-weight: 800;
      color: var(--accent-color-1);
      content: 'Вы здесь';
    }

    p {
      color: var(--accent-color-1);
    }

    h2 {
      font-weight: 800;
    }
  }

  .link {
    color: var(--accent-color-1);
  }
</style>

<template>
  <div class="main" :class="[divider ? 'border' : '']">
    <div class="title">
      <div class="number">{{ props.number }}</div>
      <h1>{{ props.title }}</h1>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { withDefaults } from '@vue/runtime-core';

  type Props = { number: string; title: string; divider?: boolean };

  const props = withDefaults(defineProps<Props>(), {
    number: '1',
    title: 'Тип проекта',
    divider: false,
  });
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .main {
    display: flex;
    margin-bottom: 1.875rem;
  }

  .border {
    padding-bottom: 1.875rem;
    border-bottom: 0.125rem solid var(--gray-color-1);
  }

  .title {
    width: 15.9375rem;
    margin-right: 1.875rem;

    h1 {
      display: inline;
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 130%;
    }
  }

  .number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.625rem;
    height: 4.625rem;
    margin-bottom: 1.125rem;
    font-size: 2rem;
    color: var(--accent-color-1);
    background: #f1f4fe;
    border-radius: 50%;
  }

  .content {
    width: 100%;
  }
</style>

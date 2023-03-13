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
    margin-bottom: 30px;
  }

  .border {
    padding-bottom: 30px;
    border-bottom: 2px solid var(--gray-color-1);
  }

  .title {
    width: 255px;
    margin-right: 30px;

    h1 {
      display: inline;
      font-size: 20px;
      font-weight: 700;
      line-height: 130%;
    }
  }

  .number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 74px;
    height: 74px;
    margin-bottom: 18px;
    font-size: 32px;
    color: var(--accent-color-1);
    background: #f1f4fe;
    border-radius: 50%;
  }

  .content {
    width: 100%;
  }
</style>

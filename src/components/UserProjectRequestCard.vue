<template>
  <BasePanel :cols="1" class="card">
    <div class="card-content">
      <!-- left col -->
      <div>
        <h2 class="title">Платформа для размещения вузовских олимпиад</h2>
        <p class="desc">Создать платформу (страничку) для рекламы олимпиад.</p>
      </div>
      <!-- left col -->

      <!-- right col -->
      <div class="right-col">
        <BaseBadge class="status">заявка отправлена</BaseBadge>
        <div class="priority">I</div>
      </div>
      <!-- right col -->
    </div>
  </BasePanel>
</template>

<script setup lang="ts">
  import BasePanel from '@/components/base/BasePanel.vue';
  import BaseBadge from './base/BaseBadge.vue';

  type Props = { editable: boolean };
  withDefaults(defineProps<Props>(), { editable: false });
</script>

<style scoped>
  .card {
    padding: 1.375rem 1.3125rem;
  }

  .card-content {
    display: grid;
    align-items: flex-start;
    grid-template-columns: minmax(300px, 2fr) 1fr;
  }

  .title {
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1.9375rem;
    color: #4f5569;
  }

  .desc {
    font-size: 1.125rem;
    line-height: 150%;
    margin-top: 0.625rem;
  }

  .right-col {
    display: flex;
    align-items: center;
    gap: 0.875rem;
  }

  .priority {
    border-radius: 50%;
    background-color: #e7e7e7;
    min-width: 2.8125rem;
    min-height: 2.8125rem;

    /* text */
    font-weight: 600;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
  }

  .status {
    white-space: nowrap;
    color: #a4a4a4;
    border-color: #a4a4a4;
  }
</style>

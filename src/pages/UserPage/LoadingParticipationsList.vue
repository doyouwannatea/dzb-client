<template>
  <ul class="list">
    <li v-for="key in 3" :key="key">
      <BaseEmptyCard size="s" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import BaseEmptyCard from '@/components/ui/BaseEmptyCard.vue';
</script>

<style lang="scss" scoped>
  .list {
    display: flex;
    flex-direction: column;
    gap: 0.9375rem;
    list-style: none;
  }
</style>

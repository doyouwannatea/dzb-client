<template>
  <ul class="tag-list">
    <li v-for="tag of visibleTags" :key="tag.id">
      <BaseTag :disabled="disableAll">{{ tag.tag }}</BaseTag>
    </li>
    <li v-if="showTagsBtnVisible" class="tag-btn">
      <BaseButton variant="inline-link" @click="isTagsVisible = true">
        {{ showTagsBtnText }}
      </BaseButton>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import type { Tag } from '@/models/Project';
  import { computed, ref, withDefaults } from 'vue';
  import BaseTag from './base/BaseTag.vue';
  import { declOfNum } from '@/helpers/string';
  import BaseButton from './base/BaseButton.vue';

  type Props = {
    tags: Tag[];
    showAll?: boolean;
    defaultVisible?: number;
    disableAll?: boolean;
  };

  const props = withDefaults(defineProps<Props>(), {
    tags: () => [],
    showAll: false,
    defaultVisible: 3,
    disableAll: false,
  });

  // Setup variables
  const hiddenTagsCount = props.tags.length - props.defaultVisible;
  const showTagsBtnText = `+${hiddenTagsCount} ${declOfNum(hiddenTagsCount, [
    'тег',
    'тега',
    'тегов',
  ])}`;

  // Reactive variables
  const isTagsVisible = ref(props.showAll);
  const visibleTags = computed(() =>
    isTagsVisible.value
      ? props.tags
      : props.tags.slice(0, props.defaultVisible),
  );
  const showTagsBtnVisible = computed(
    () => props.tags.length > props.defaultVisible && !isTagsVisible.value,
  );
</script>

<style scoped>
  .tag-btn {
    display: flex;
    align-items: center;
  }

  .tag-list {
    list-style: none;
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
</style>

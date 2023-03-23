<template>
  <ul v-if="visibleTags.length > 0 || $slots['after-list']" class="list">
    <li v-for="tag of visibleTags" :key="tag.id">
      <BaseTag
        :disabled="disableAll"
        :deletable="deletable"
        :variant="tagVariant"
        @delete="$emit('delete', tag)"
      >
        {{ tag.name }}
      </BaseTag>
    </li>
    <li v-if="showBtnVisible" class="show-btn-wrapper">
      <BaseButton
        case="lowercase"
        variant="inline-link"
        @click="isTagsVisible = true"
      >
        {{ showBtnText }}
      </BaseButton>
    </li>
    <li v-if="$slots['after-list']">
      <slot name="after-list"></slot>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { computed, ref, withDefaults } from 'vue';
  import { declOfNum } from '@/helpers/string';
  import { Tag } from '@/models/Tag';
  // components
  import BaseTag from './BaseTag.vue';
  import BaseButton from './BaseButton.vue';

  type Props = {
    tagList: Tag<number | string>[];
    showAll?: boolean;
    defaultVisible?: number;
    disableAll?: boolean;
    deletable?: boolean;
    tagVariant?: 'primary' | 'outlined';
  };

  type Emits = {
    (e: 'delete', tag: Tag<number | string>): void;
  };

  const props = withDefaults(defineProps<Props>(), {
    tagList: () => [],
    showAll: false,
    defaultVisible: 3,
    disableAll: false,
    deletable: undefined,
    tagVariant: 'primary',
  });
  defineEmits<Emits>();

  // Setup variables
  const hiddenTagsCount = props.tagList.length - props.defaultVisible;
  const showBtnText = `+${hiddenTagsCount} ${declOfNum(hiddenTagsCount, [
    'тег',
    'тега',
    'тегов',
  ])}`;

  // Reactive variables
  const isTagsVisible = ref(props.showAll);
  const visibleTags = computed(() =>
    isTagsVisible.value
      ? props.tagList
      : props.tagList.slice(0, props.defaultVisible),
  );
  const showBtnVisible = computed(
    () => props.tagList.length > props.defaultVisible && !isTagsVisible.value,
  );
</script>

<style scoped lang="scss">
  .show-btn-wrapper {
    display: flex;
    align-items: center;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    padding-left: 0;
    list-style: none;
  }
</style>

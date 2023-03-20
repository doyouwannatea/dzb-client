<template>
  <ul
    v-for="group in props.groupedList"
    :key="group.id"
    :class="$style['group-list']"
  >
    <li v-if="group.groupLabel" :class="$style['list-group-label']">
      {{ group.groupLabel }}
    </li>
    <li
      v-for="item in group.list"
      :key="item.id || item.label"
      :class="$style['list-item']"
    >
      <component
        :is="props.clickable ? 'button' : 'span'"
        :class="[$style['item-label'], { [$style.selected]: item.selected }]"
        @click="() => onItemClick(item)"
      >
        {{ item.label }}
      </component>
    </li>
  </ul>
</template>

<script setup lang="ts">
  export type ListItem<T = unknown> = {
    id: number;
    label: string;
    value?: T;
    selected?: boolean;
  };

  export type GroupedList<T = unknown> = {
    id: number;
    groupLabel?: string;
    list: ListItem<T>[];
  };

  type Props = {
    groupedList: GroupedList[];
    clickable?: boolean;
  };
  type Emits = {
    (event: 'item-click', payload: unknown): void;
  };

  const props = withDefaults(defineProps<Props>(), { clickable: true });
  const emit = defineEmits<Emits>();

  function onItemClick(listItem: ListItem) {
    if (listItem.selected) return;
    if (!props.clickable) return;
    emit('item-click', listItem.value);
  }
</script>

<style module lang="scss">
  .group-list {
    list-style: none;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  .list-group-label {
    margin-bottom: 0.1875rem;
    font-size: 0.75rem;
    color: var(--gray-color-2);
    text-transform: uppercase;
  }

  .item-label {
    display: block;
    width: 100%;
    padding: 0.5rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-color);
    text-align: left;
    background-color: transparent;
    border: none;
  }

  button.item-label {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    &:focus-visible {
      outline-offset: -2px;
    }
  }

  .selected {
    color: var(--gray-color-2) !important;
    text-decoration: line-through !important;
    cursor: default !important;
  }
</style>

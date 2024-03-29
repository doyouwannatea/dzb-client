<template>
  <div
    :class="$style.content"
    :style="{
      gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
    }"
  >
    <ul
      v-for="group in props.groupedList"
      :key="group.id"
      :class="$style['group-list']"
    >
      <ClickableGroupedListLabel is="li" v-if="group.groupLabel">
        {{ group.groupLabel }}
      </ClickableGroupedListLabel>
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
  </div>
</template>

<script setup lang="ts">
  import ClickableGroupedListLabel from './ClickableGroupedListLabel.vue';

  export type ListItem<T = unknown> = {
    id: number | string;
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
    /**
     * Группированный список
     */
    groupedList: GroupedList[];
    /**
     * Включает событие клика на элементах списка
     */
    clickable?: boolean;
    /**
     * Количество одинаковых колонок
     */
    cols?: string | number;
  };
  type Emits = {
    /**
     * Событие клика на элементы списка <br>
     * Работает если включена опция <code>clickable</code> <br>
     * В качестве <code>payload</code> принимает <code>value</code> элемента списка
     */
    (event: 'item-click', payload: unknown): void;
  };

  const props = withDefaults(defineProps<Props>(), {
    clickable: true,
    cols: 1,
  });
  const emit = defineEmits<Emits>();

  function onItemClick(listItem: ListItem) {
    if (listItem.selected) return;
    if (!props.clickable) return;
    emit('item-click', listItem.value);
  }
</script>

<style module lang="scss">
  .content {
    display: grid;
  }

  .group-list {
    list-style: none;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
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

<template>
  <ul v-if="props.isOpen" ref="root" class="dropdown">
    <li v-for="item in props.itemsList" :key="item.content" class="item">
      <template v-if="item.type === 'link'">
        <template v-if="item.routeName">
          <RouterLink class="action" :to="{ name: item.routeName }">
            {{ item.content }}
          </RouterLink>
        </template>
        <template v-else>
          <a :href="item.href" class="action">{{ item.content }}</a>
        </template>
      </template>
      <template v-if="item.type === 'button'">
        <button class="action" @click="item.action">{{ item.content }}</button>
      </template>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { isPartOfNode } from '@/helpers/dom';
  import { RouteNames } from '@/router/types/route-names';
  import { onClickOutside } from '@vueuse/core';
  import { withDefaults, ref } from 'vue';

  export type DropdownItem =
    | {
        content: string;
        type: 'link';
        href?: string;
        routeName?: RouteNames;
      }
    | { content: string; type: 'button'; action: () => void };

  const root = ref(null);
  const props = withDefaults(
    defineProps<{
      isOpen: boolean;
      itemsList: DropdownItem[];
      hadleNode?: HTMLElement | null;
    }>(),
    { isOpen: false, hadleNode: null, itemsList: () => [] },
  );
  const emit = defineEmits<{
    (e: 'close'): void;
  }>();

  onClickOutside(root, (evt) => {
    if (isPartOfNode(evt.target as HTMLElement, props.hadleNode)) return;
    emit('close');
  });
</script>

<style scoped>
  .dropdown {
    top: 3.125rem;
    right: 0;
    position: absolute;
    background: #ffffff;
    padding: 1.0625rem 0;
    width: 15rem;
    box-shadow: 0px 0px 0.3125rem rgba(0, 0, 0, 0.18);
  }

  .item {
    list-style: none;
  }

  .item:not(:last-child) {
    border-bottom: 1px solid var(--gray-color-1);
  }

  .action {
    font-family: 'Mont';
    font-style: normal;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.25rem;
    color: var(--text-color);
    display: inline-block;
    padding: 0.625rem 1.3125rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
    text-decoration: none;
  }

  .action:hover {
    background-color: var(--gray-color-1);
  }
</style>

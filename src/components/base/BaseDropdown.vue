<template>
  <ul v-if="props.isOpen" ref="root" class="dropdown">
    <li v-for="item in props.itemsList" :key="item.content" class="item">
      <!-- if item is a link -->
      <template v-if="item.type === 'link'">
        <!-- if item is a ROUTER link -->
        <RouterLink
          v-if="item.routeName"
          class="action"
          :to="{ name: item.routeName }"
        >
          {{ item.content }}
        </RouterLink>
        <!-- if item is a COMMON link -->
        <a v-else :href="item.href" class="action">{{ item.content }}</a>
      </template>
      <!-- if item is a button -->
      <button
        v-else-if="item.type === 'button'"
        class="action"
        @click="item.action"
      >
        {{ item.content }}
      </button>
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
  type DropdownProps = {
    isOpen: boolean;
    itemsList: DropdownItem[];
    handleNode?: HTMLElement;
  };
  type DropdownEmits = {
    (e: 'close'): void;
  };

  const props = withDefaults(defineProps<DropdownProps>(), {
    isOpen: false,
    handleNode: undefined,
    itemsList: () => [],
  });
  const emit = defineEmits<DropdownEmits>();
  const root = ref(null);

  onClickOutside(root, (evt) => {
    if (isPartOfNode(evt.target as HTMLElement, props.handleNode)) return;
    emit('close');
  });
</script>

<style scoped>
  .dropdown {
    top: 80%;
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

<template>
  <BaseDropdown
    :is-open="isOpen"
    :handle-node="handleNode"
    :position="position"
    @close="$emit('close')"
  >
    <ul>
      <li v-for="item in itemList" :key="item.content" class="item">
        <!-- if item is a link -->
        <template v-if="item.type === 'link'">
          <!-- if item is a ROUTER link -->
          <RouterLink v-if="item.location" class="action" :to="item.location">
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
  </BaseDropdown>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { RouteLocationRaw } from 'vue-router';
  // components
  import BaseDropdown, { Position } from './BaseDropdown.vue';

  export type DropdownItem =
    | {
        content: string;
        type: 'link';
        href?: string;
        location?: RouteLocationRaw;
      }
    | { content: string; type: 'button'; action: () => void };
  type Props = {
    isOpen: boolean;
    handleNode: HTMLElement;
    itemList: DropdownItem[];
    position?: Position;
  };
  type Emits = {
    (e: 'close'): void;
  };

  withDefaults(defineProps<Props>(), {
    itemList: () => [],
    position: () => ({}),
  });
  defineEmits<Emits>();
</script>

<style scoped>
  .item {
    list-style: none;
  }

  .item:not(:last-child) {
    border-bottom: 1px solid var(--gray-color-1);
  }

  .action {
    display: inline-block;
    width: 100%;
    padding: 0.625rem 1.3125rem;
    font-family: Mont, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.25rem;
    color: var(--text-color);
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  .action:hover {
    background-color: var(--gray-color-1);
  }
</style>

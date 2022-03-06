<template>
  <BaseDropdown
    :handle-node="props.handleNode"
    :is-open="props.isOpen"
    :items-list="items"
    @close="emit('close')"
  />
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';
  import BaseDropdown, { DropdownItem } from './base/BaseDropdown.vue';

  type Props = {
    isOpen: boolean;
    handleNode?: HTMLElement;
  };
  type Emits = {
    (e: 'close'): void;
  };

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const authStore = useAuthStore();

  const items: DropdownItem[] = [
    { content: 'Мой профиль', type: 'link', href: '#' },
    { content: 'Мои заявки', type: 'link', href: '#' },
    { content: 'Мои проекты', type: 'link', href: '#' },
    { content: 'Навыки', type: 'link', href: '#' },
    {
      content: 'Выйти',
      type: 'button',
      action: () => {
        authStore.exit();
        emit('close');
      },
    },
  ];
</script>

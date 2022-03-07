<template>
  <BaseDropdown
    :handle-node="props.handleNode"
    :is-open="props.isOpen"
    :items-list="items"
    @close="emit('close')"
  />
</template>

<script setup lang="ts">
  import { RouteNames } from '@/router/types/route-names';
  import { useAuthStore } from '@/stores/auth';
  import { useUserNavigationRoutes } from '@/hooks/useRoutes';
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
  const routes = useUserNavigationRoutes();

  const items = routes.map<DropdownItem>((route) => ({
    content: route.meta.title,
    routeName: route.name as RouteNames,
    type: 'link',
  }));

  items.push({
    content: 'Выйти',
    type: 'button',
    action: () => {
      authStore.exit();
      emit('close');
    },
  });
</script>

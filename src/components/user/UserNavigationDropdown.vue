<template>
  <DropdownList
    :handle-node="props.handleNode"
    :is-open="props.isOpen"
    :item-list="items"
    @close="emit('close')"
  />
</template>

<script setup lang="ts">
  import { watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { RouteNames } from '@/router/types/route-names';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import { useRoledUserNavigationRoutes } from '@/hooks/useRoutes';
  // components
  import DropdownList, { DropdownItem } from '../ui/DropdownList.vue';
  import { useModalsStore } from '@/stores/modals/useModalsStore';

  type Props = {
    isOpen: boolean;
    handleNode: HTMLElement;
  };
  type Emits = {
    (e: 'close'): void;
  };

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const route = useRoute();
  const routes = useRoledUserNavigationRoutes();
  const modalsStore = useModalsStore();

  watch(
    () => route.path,
    () => emit('close'),
  );

  const items = routes.map<DropdownItem>((route) => ({
    content: route.meta.title,
    routeName: route.name as RouteNames,
    type: 'link',
  }));

  items.push({
    content: 'Выйти',
    type: 'button',
    action: () => {
      modalsStore.openConfirmModal(
        'Вы уверены, что хотите выйти из аккаунта?',
        'Выйти из аккаунта',
        'Остаться',
      );
    },
  });
</script>

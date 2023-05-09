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
  import { useRoledUserNavigationRoutes } from '@/hooks/useRoutes';
  // components
  import DropdownList, { DropdownItem } from '../ui/DropdownList.vue';
  import { useLogoutWithModalMutation } from '@/api/AuthApi/hooks/useLogoutWithModalMutation';

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
  const { logout } = useLogoutWithModalMutation();

  watch(
    () => route.path,
    () => emit('close'),
  );

  const items = routes.map<DropdownItem>((route) => ({
    content: route.meta.title,
    location: { name: route.name },
    type: 'link',
  }));

  items.push({
    content: 'Выйти',
    type: 'button',
    action: logout,
  });
</script>

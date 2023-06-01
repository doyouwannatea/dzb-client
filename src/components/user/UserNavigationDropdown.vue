<template>
  <DropdownList
    :handle-node="props.handleNode"
    :is-open="props.isOpen"
    :item-list="items"
    @update:is-open="(value) => emit('update:isOpen', value)"
  />
</template>

<script setup lang="ts">
  import { watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { DropdownItem } from '@/models/components/DropdownItem';
  import { useLogoutWithModalMutation } from '@/api/AuthApi/hooks/useLogoutWithModalMutation';
  import { useRoledUserNavigationRoutes } from '@/hooks/useRoutes';
  import DropdownList from '../ui/DropdownList.vue';

  type Props = {
    isOpen: boolean;
    handleNode: HTMLElement;
  };
  type Emits = {
    (e: 'update:isOpen', isOpen: boolean): void;
  };

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const route = useRoute();
  const routes = useRoledUserNavigationRoutes();
  const { logout } = useLogoutWithModalMutation();

  watch(
    () => route.path,
    () => emit('update:isOpen', false),
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

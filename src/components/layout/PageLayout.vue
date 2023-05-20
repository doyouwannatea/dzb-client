<template>
  <BaseLayout>
    <template #header>
      <AppHeader />
      <BottomNavigationBar v-if="isSmallDevice" />
    </template>
    <template #content>
      <BaseContainer v-bind="$attrs" :size="ContainerSize.md">
        <slot></slot>
      </BaseContainer>
    </template>
    <template #footer>
      <AppFooter />
    </template>
  </BaseLayout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    inheritAttrs: false,
  });
</script>

<script setup lang="ts">
  import BaseLayout from '../ui/BaseLayout.vue';
  import AppHeader from './AppHeader.vue';
  import AppFooter from './AppFooter.vue';
  import BaseContainer from '../ui/BaseContainer.vue';
  import BottomNavigationBar from './mobile/BottomNavigationBar.vue';
  import { useSmallDevice } from '@/hooks/useBreakpoints';
  import { ContainerSize } from '@/models/BaseContainer';

  const isSmallDevice = useSmallDevice();
</script>

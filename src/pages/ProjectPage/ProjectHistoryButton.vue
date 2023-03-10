<template>
  <template v-if="props.historyLength">
    <BaseButton
      v-if="props.historyLength > 1"
      v-bind="$attrs"
      class="button"
      variant="inline-link"
      case="default"
    >
      Открыть версии <br />
      проекта ↗
    </BaseButton>
    <template v-else>
      На данный момент это единственная версия проекта
    </template>
  </template>
</template>

<script setup lang="ts">
  import BaseButton from '@/components/ui/BaseButton.vue';
  interface Props {
    historyLength?: number;
  }
  const props = defineProps<Props>();
</script>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    inheritAttrs: false,
  });
</script>

<style lang="scss" scoped>
  .button {
    font-size: inherit;
    text-align: left;
    white-space: normal;
  }
</style>

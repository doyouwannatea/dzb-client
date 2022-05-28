<template>
  <section :class="['accordion', { opened: opened, closed: !opened }]">
    <header class="header">
      <button type="button" class="title" @click="emits('toggle')">
        <slot name="title"></slot>
        <slot name="icon">
          <span class="icon"></span>
        </slot>
      </button>
    </header>
    <div v-if="props.opened" class="content">
      <slot name="content"></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
  const props = withDefaults(defineProps<{ opened?: boolean }>(), {
    opened: false,
  });
  const emits = defineEmits<{
    (e: 'toggle'): void;
  }>();
</script>

<style scoped>
  .title,
  .content {
    display: block;
    width: 100%;
    font-family: inherit;
    text-align: left;
    background-color: inherit;
    border: inherit;
  }

  .icon {
    display: inline-block;
    width: 19px;
    height: 11px;
    background: url('@/assets/icons/dropdown-arrow.svg') center / cover
      no-repeat;
    transform: rotate(180deg);
  }

  .accordion.opened .icon {
    transform: rotate(0);
  }
</style>

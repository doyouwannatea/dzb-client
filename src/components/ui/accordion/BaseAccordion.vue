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
    <Transition
      name="dropdown"
      :css="props.animated"
      @enter="onEnter"
      @leave="onLeave"
    >
      <div v-if="props.opened" ref="contentRef" class="content">
        <slot name="content"></slot>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref, Transition } from 'vue';

  const props = withDefaults(
    defineProps<{ opened?: boolean; animated?: boolean }>(),
    {
      opened: false,
      animated: true,
    },
  );
  const emits = defineEmits<{
    (e: 'toggle'): void;
  }>();

  const contentRef = ref<HTMLElement | undefined>(undefined);
  const mutationObserver = ref<MutationObserver | undefined>(undefined);

  onMounted(() => {
    const el = contentRef.value;
    setDropdownHeight(el);
    mutationObserver.value = new MutationObserver(() => setDropdownHeight(el));

    if (contentRef.value)
      mutationObserver.value.observe(contentRef.value, {
        childList: true,
        characterData: true,
        subtree: true,
      });
  });

  onUnmounted(() => {
    mutationObserver.value?.disconnect();
  });

  function onEnter(el: HTMLElement) {
    el.style.height = el.scrollHeight + 'px';
  }

  function onLeave(el: HTMLElement) {
    el.style.height = '0px';
  }

  function setDropdownHeight(el?: HTMLElement) {
    if (el) {
      if (props.opened) onEnter(el);
      else onLeave(el);
    }
  }
</script>

<style lang="scss" scoped>
  .title,
  .content {
    display: block;
    width: 100%;
    padding: 0;
    font-family: inherit;
    text-align: left;
    background-color: inherit;
    border: inherit;
  }

  .content {
    height: 0;
    will-change: height;
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

  .dropdown-enter-active,
  .dropdown-leave-active {
    overflow: hidden;
    transition: height 0.5s ease;
  }

  .dropdown-enter-from {
    height: 0;
  }
</style>

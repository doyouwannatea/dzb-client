<template>
  <section :class="['accordion', { opened: opened, closed: !opened }]">
    <header class="header">
      <button
        type="button"
        class="title"
        @click="emits('update:opened', !props.opened)"
      >
        <!-- @slot Слот для заголовка компонента -->
        <slot name="title"></slot>
        <!-- @slot Слот для иконки компонента, по дефолту стоит стрелка -->
        <slot name="icon">
          <span class="icon"></span>
        </slot>
      </button>
    </header>
    <Transition
      name="dropdown"
      :css="props.animated"
      @enter="(el: Element) => onEnter(el as HTMLElement)"
      @leave="(el: Element) => onLeave(el as HTMLElement)"
    >
      <div
        v-if="props.opened"
        ref="contentRef"
        :class="['content', { animated: props.animated }]"
      >
        <!-- @slot Слот контента компонента -->
        <slot name="content"></slot>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
  import { Transition, onMounted, onUnmounted, ref } from 'vue';

  interface Props {
    /**
     * Компонент открыт / закрыт
     */
    opened?: boolean;
    /**
     * Анимация вкл / выкл
     */
    animated?: boolean;
  }
  interface Emits {
    /**
     * Событие обновляет props.opened при нажатии на заголовок компонента
     */
    (e: 'update:opened', opened: boolean): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    opened: false,
    animated: false,
  });
  const emits = defineEmits<Emits>();

  const contentRef = ref<HTMLElement | undefined>(undefined);
  const mutationObserver = ref<MutationObserver | undefined>(undefined);

  onMounted(animate);
  onUnmounted(disconnect);

  function animate() {
    if (!props.animated) return;

    const el = contentRef.value;
    function onContentChange() {
      if (el) {
        setDropdownHeight(el, props.opened);
      }
    }

    onContentChange();
    mutationObserver.value = new MutationObserver(onContentChange);

    if (el) {
      mutationObserver.value.observe(el, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }
  }

  function disconnect() {
    mutationObserver.value?.disconnect();
  }

  function onEnter(el: HTMLElement) {
    if (!props.animated) return;
    el.style.height = el.scrollHeight + 'px';
  }

  function onLeave(el: HTMLElement) {
    if (!props.animated) return;
    el.style.height = '0px';
  }

  function setDropdownHeight(el: HTMLElement, opened: boolean) {
    if (opened) onEnter(el);
    else onLeave(el);
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

  .content.animated {
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

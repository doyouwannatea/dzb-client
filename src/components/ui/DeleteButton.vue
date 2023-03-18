<template>
  <BaseButton :class="$style['delete-btn']" variant="outlined" color="red">
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        :class="$style['delete-btn-path']"
        d="M3.8208 6.8877H5.8208H21.8208"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        :class="$style['delete-btn-path']"
        d="M8.8208 6.8877V4.8877C8.8208 4.35726 9.03151 3.84855 9.40659 3.47348C9.78166 3.09841 10.2904 2.8877 10.8208 2.8877H14.8208C15.3512 2.8877 15.8599 3.09841 16.235 3.47348C16.6101 3.84855 16.8208 4.35726 16.8208 4.8877V6.8877M19.8208 6.8877V20.8877C19.8208 21.4181 19.6101 21.9268 19.235 22.3019C18.8599 22.677 18.3512 22.8877 17.8208 22.8877H7.8208C7.29037 22.8877 6.78166 22.677 6.40659 22.3019C6.03151 21.9268 5.8208 21.4181 5.8208 20.8877V6.8877H19.8208Z"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </BaseButton>
</template>

<script setup lang="ts">
  import BaseButton from './BaseButton.vue';
</script>

<style module lang="scss">
  .delete-btn-path {
    stroke: var(--red-color-1);
  }

  .delete-btn {
    aspect-ratio: 1 / 1;
    padding: 0 !important;

    svg {
      min-width: 25px;
      height: 25px;
    }

    &:hover,
    &:active {
      .delete-btn-path {
        stroke: #fff;
      }
    }
  }
</style>

<template>
  <div class="team-counter">
    <svg
      class="icon"
      width="25"
      height="25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        class="icon-path"
        clip-path="url(#a)"
        stroke="#3D68ED"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M17.075 21.838v-2a4 4 0 0 0-4-4h-8a4 4 0 0 0-4 4v2M9.075 11.838a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23.075 21.838v-2a4 4 0 0 0-3-3.87M16.075 3.968a4 4 0 0 1 0 7.75"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path
            fill="#fff"
            transform="translate(.075 .838)"
            d="M0 0h24v24H0z"
          />
        </clipPath>
      </defs>
    </svg>
    <span>{{ total }}</span>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ total: number }>();
</script>

<style scoped>
  .team-counter {
    display: flex;
    gap: 0.5625rem;
    align-items: center;
    color: var(--accent-color-1);
  }

  .icon {
    min-width: 1.7rem;
    height: 1.7rem;
  }

  .icon-path {
    stroke: currentColor;
  }
</style>

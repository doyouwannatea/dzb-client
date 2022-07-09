<template>
  <div class="info">
    <ProjectTeamCounter :total="places" />
    <div v-if="checkProjectDifficulty(difficulty)" class="difficulty">
      <template
        v-for="(_, idx) in Array.from(new Array(difficulty))"
        :key="idx"
      >
        <span class="icon star-icon"></span>
      </template>
      <span>{{ difficultyText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Difficulty, DifficultyText } from '@/models/ProjectDifficulty';
  import { checkProjectDifficulty } from '@/helpers/project';
  // components
  import ProjectTeamCounter from './ProjectTeamCounter.vue';

  const props = defineProps<{ places: number; difficulty: Difficulty }>();
  const difficultyText = DifficultyText[props.difficulty];
</script>

<style lang="scss" scoped>
  @import '@breakpoints';

  .info {
    display: flex;
    column-gap: 1.375rem;
    row-gap: 0.375rem;
    justify-content: flex-end;
    margin-top: 0.625rem;
    font-size: 1.125rem;
    line-height: 1.4375rem;

    @media (max-width: $mobile-s) {
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  }

  .difficulty {
    display: flex;
    gap: 0.5625rem;
    align-items: center;
    color: var(--text-color);
  }

  .icon {
    min-width: 1.5rem;
    height: 1.5rem;
    background: center / contain no-repeat;
  }

  .star-icon {
    background-image: url('@/assets/icons/star.svg');
  }
</style>

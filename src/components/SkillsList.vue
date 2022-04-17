<template>
  <ul v-if="visibleSkills.length > 0" class="list">
    <li v-for="skill of visibleSkills" :key="skill.id">
      <BaseTag :disabled="disableAll">{{ skill.skill }}</BaseTag>
    </li>
    <li v-if="showBtnVisible" class="show-btn-wrapper">
      <BaseButton
        case="lowercase"
        variant="inline-link"
        @click="isSkillsVisible = true"
      >
        {{ showBtnText }}
      </BaseButton>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { Skill } from '@/models/Project';
  import { computed, ref, withDefaults } from 'vue';
  import BaseTag from './base/BaseTag.vue';
  import { declOfNum } from '@/helpers/string';
  import BaseButton from './base/BaseButton.vue';

  type Props = {
    skills: Skill[];
    showAll?: boolean;
    defaultVisible?: number;
    disableAll?: boolean;
  };

  const props = withDefaults(defineProps<Props>(), {
    skills: () => [],
    showAll: false,
    defaultVisible: 3,
    disableAll: false,
  });

  // Setup variables
  const hiddenSkillsCount = props.skills.length - props.defaultVisible;
  const showBtnText = `+${hiddenSkillsCount} ${declOfNum(hiddenSkillsCount, [
    'тег',
    'тега',
    'тегов',
  ])}`;

  // Reactive variables
  const isSkillsVisible = ref(props.showAll);
  const visibleSkills = computed(() =>
    isSkillsVisible.value
      ? props.skills
      : props.skills.slice(0, props.defaultVisible),
  );
  const showBtnVisible = computed(
    () => props.skills.length > props.defaultVisible && !isSkillsVisible.value,
  );
</script>

<style scoped>
  .show-btn-wrapper {
    display: flex;
    align-items: center;
  }

  .list {
    list-style: none;
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
</style>

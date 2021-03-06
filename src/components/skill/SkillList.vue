<template>
  <ul v-if="visibleSkills.length > 0" class="list">
    <li v-for="skill of visibleSkills" :key="skill.id">
      <BaseTag
        :disabled="disableAll"
        :deletable="deletable"
        @delete="$emit('delete', skill)"
      >
        {{ skill.name }}
      </BaseTag>
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
  import { Tag } from '@/models/Project';
  import { computed, ref, withDefaults } from 'vue';
  import { declOfNum } from '@/helpers/string';
  // components
  import BaseTag from '../ui/BaseTag.vue';
  import BaseButton from '../ui/BaseButton.vue';

  type Props = {
    skills: Tag[];
    showAll?: boolean;
    defaultVisible?: number;
    disableAll?: boolean;
    deletable?: boolean;
  };

  type Emits = {
    (e: 'delete', skill: Tag): void;
  };

  const props = withDefaults(defineProps<Props>(), {
    skills: () => [],
    showAll: false,
    defaultVisible: 3,
    disableAll: false,
    deletable: undefined,
  });
  defineEmits<Emits>();

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
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding-left: 0;
    list-style: none;
  }
</style>

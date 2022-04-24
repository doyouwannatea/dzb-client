<template>
  <!-- auth modal -->
  <BaseModal size="m" :is-show="modalsStore.editSkillsModal" @close="onClose">
    <!-- HEADER -->
    <template #header>
      <h1>Редактирование навыков</h1>
      <SkillsList
        class="tags-list"
        :skills="skills"
        :show-all="true"
        :deletable="true"
        @delete="onDeleteSkill"
      />
    </template>
    <!-- HEADER -->

    <!-- MAIN CONTENT -->
    <div class="search-wrapper">
      <h2>Добавить навыки</h2>
      <VMultiselect
        ref="multiselect"
        v-model="searchValue"
        placeholder="Поиск по навыкам"
        :searchable="true"
        :options="availableSkills"
        label="skill"
        track-by="skill"
        value-prop="skill"
        class="search"
      />
    </div>
    <div class="skills">
      <div class="col">
        <h3 class="tags-title">По направлению</h3>
        <span v-if="projectsStore.tagsLoading">loading...</span>
        <ul v-else class="skills-list by-direction-skills">
          <li v-for="skill in generalSkills" :key="skill.id" class="tag-item">
            <button
              :class="['tag-btn', { selected: userHasSkill(skill) }]"
              @click="onTagClick(skill)"
            >
              {{ skill.skill }}
            </button>
          </li>
        </ul>
      </div>
      <div class="col right-col">
        <h3 class="tags-title">По алфавиту</h3>
        <span v-if="projectsStore.tagsLoading">loading...</span>
        <ul v-else class="skills-list">
          <li v-for="skill in commonSkills" :key="skill.id" class="tag-item">
            <button
              :class="['tag-btn', { selected: userHasSkill(skill) }]"
              @click="onTagClick(skill)"
            >
              {{ skill.skill }}
            </button>
          </li>
        </ul>
      </div>
    </div>
    <!-- MAIN CONTENT -->

    <!-- ACTIONS -->
    <div class="actions">
      <BaseButton case="uppercase" :disabled="disableSaveBtn" @click="onSave">
        {{ authStore.loading ? 'loading...' : 'сохранить' }}
      </BaseButton>
    </div>
    <!-- ACTIONS -->
  </BaseModal>
</template>

<script setup lang="ts">
  import VMultiselect from '@vueform/multiselect';
  import BaseModal from './base/BaseModal.vue';
  import SkillsList from './SkillsList.vue';
  import BaseButton from './base/BaseButton.vue';
  import { computed, ref, watch } from 'vue';
  import { Skill } from '@/models/Project';
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  import { deepClone } from '@/helpers/array';

  const modalsStore = useModalsStore();
  const authStore = useAuthStore();
  const projectsStore = useProjectsStore();

  const searchValue = ref('');
  const availableSkills = computed(() => [
    ...projectsStore.additionalProjectData.tags?.skills.filter(
      (skill) => !userHasSkill(skill),
    ),
    ...projectsStore.additionalProjectData.tags?.general.filter(
      (skill) => !userHasSkill(skill),
    ),
  ]);
  const skills = ref<Skill[]>([]);
  const generalSkills = computed(() =>
    projectsStore.additionalProjectData.tags?.general.filter(searchSkills),
  );
  const commonSkills = computed(() =>
    projectsStore.additionalProjectData.tags?.skills.filter(searchSkills),
  );
  const disableSaveBtn = computed(
    () =>
      authStore.loading ||
      JSON.stringify(skills.value) ===
        JSON.stringify(authStore.userSkills?.personal || []),
  );

  watch(() => authStore.userSkills?.personal, initSkills, {
    immediate: true,
    deep: true,
  });

  function searchSkills(skill: Skill) {
    return (
      !searchValue.value ||
      skill.skill.toLowerCase() === searchValue.value.toLowerCase()
    );
  }

  function onTagClick(skill: Skill) {
    if (userHasSkill(skill)) return;
    searchValue.value = '';
    skills.value.push(skill);
  }

  function userHasSkill(skill: Skill): boolean {
    return (
      Boolean(skills.value.find((s) => s.id === skill.id)) ||
      Boolean(authStore.userSkills?.common.find((s) => s.id === skill.id))
    );
  }

  function initSkills() {
    skills.value = deepClone(authStore.userSkills?.personal || []);
  }

  function onSave() {
    authStore.updateUserSkills(skills.value);
  }

  function onDeleteSkill(skill: Skill) {
    const idx = skills.value.findIndex((s) => s.id === skill.id);
    skills.value.splice(idx, 1);
  }

  function onClose() {
    modalsStore.editSkillsModal = false;
    searchValue.value = '';
    initSkills();
  }
</script>

<style scoped>
  .tags-list {
    margin-top: 1.5rem;
  }

  .skills {
    display: grid;
    grid-template-columns: 55% 45%;
    border: 1px solid var(--gray-color-1);
    border-radius: 0.3125rem;
  }

  .search-wrapper {
    margin-bottom: 0.625rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .search {
    --ms-bg: #f9f9f9;
    max-width: 21rem;
    margin-right: 0;
  }

  .col {
    padding: 1rem 0.375rem 0.9375rem 1.25rem;
  }

  .skills-list {
    height: 22.125rem;
    overflow: auto;
  }

  .skills-list::-webkit-scrollbar {
    width: 6px;
  }

  .skills-list::-webkit-scrollbar-track {
    background-color: var(--gray-color-1);
    border-radius: 100px;
  }

  .skills-list::-webkit-scrollbar-thumb {
    background-color: var(--gray-color-2);
    border-radius: 100px;
  }

  .right-col {
    background: #f9f9f9;
    border-left: 1px solid var(--gray-color-1);
  }

  .by-direction-skills {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: max-content;
    column-gap: 1.25rem;
  }

  .tags-title {
    margin-bottom: 0.625rem;

    font-size: 0.75rem;
    line-height: 0.9375rem;
    text-transform: uppercase;

    color: var(--gray-color-2);
  }

  .tag-item {
    list-style: none;
  }

  .tag-btn {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.5625rem 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  .tag-btn:hover {
    text-decoration: underline;
  }

  .tag-btn.selected {
    text-decoration: line-through;
    cursor: not-allowed;
    color: var(--gray-color-1);
  }

  .actions {
    margin-top: 2.75rem;
    display: flex;
    justify-content: center;
  }
</style>

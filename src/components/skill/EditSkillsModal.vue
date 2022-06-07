<template>
  <!-- auth modal -->
  <BaseModal size="m" :is-show="modalsStore.editSkillsModal" @close="onClose">
    <!-- HEADER -->
    <template #header>
      <h1>Редактирование навыков</h1>
      <SkillList
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
          <li
            v-for="skill in filteredCategories"
            :key="skill.id"
            class="tag-item"
          >
            <button
              :class="['tag-btn', { selected: userHasSkill(skill) }]"
              @click="onTagClick(skill)"
            >
              {{ skill.name }}
            </button>
          </li>
        </ul>
      </div>
      <div class="col right-col">
        <h3 class="tags-title">По алфавиту</h3>
        <span v-if="projectsStore.tagsLoading">loading...</span>
        <ul v-else class="skills-list">
          <li
            v-for="skill in filteredCommonSkills"
            :key="skill.id"
            class="tag-item"
          >
            <button
              :class="['tag-btn', { selected: userHasSkill(skill) }]"
              @click="onTagClick(skill)"
            >
              {{ skill.name }}
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
  import { computed, ref, watch } from 'vue';
  import { Tag } from '@/models/Project';
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  import { deepClone } from '@/helpers/array';
  // components
  import BaseModal from '../ui/BaseModal.vue';
  import BaseButton from '../ui/BaseButton.vue';
  import SkillList from './SkillList.vue';

  // <STORES>
  const modalsStore = useModalsStore();
  const authStore = useAuthStore();
  const projectsStore = useProjectsStore();
  // </STORES>

  // <REFS>
  const searchValue = ref('');
  const skills = ref<Tag[]>([]);
  // </REFS>

  // <WATCHERS>
  watch(() => authStore.userSkills?.personal, initSkills, {
    immediate: true,
    deep: true,
  });
  // </WATCHERS>

  // <COMPUTED VALUES>
  // available skills
  const availableSkills = computed<Tag[]>(() => {
    const skills: Tag[] =
      projectsStore.additionalProjectData.tags?.skills || [];
    const generalSkills: Tag[] =
      projectsStore.additionalProjectData.tags?.skillCategories || [];
    return [
      ...skills.filter((skill) => !userHasSkill(skill)),
      ...generalSkills.filter((skill) => !userHasSkill(skill)),
    ];
  });
  // filtered general skills
  const filteredCategories = computed<Tag[] | undefined>(() =>
    projectsStore.additionalProjectData.tags?.skillCategories.filter(
      searchSkills,
    ),
  );
  // filtered common skills
  const filteredCommonSkills = computed<Tag[] | undefined>(() =>
    projectsStore.additionalProjectData.tags?.skills.filter(searchSkills),
  );
  // disable save button
  const disableSaveBtn = computed(
    () =>
      authStore.loading ||
      JSON.stringify(skills.value) ===
        JSON.stringify(authStore.userSkills?.personal || []),
  );
  // </COMPUTED VALUES>

  // <FUNCTIONS>
  function searchSkills(skill: Tag) {
    return (
      !searchValue.value ||
      skill.name.toLowerCase() === searchValue.value.toLowerCase()
    );
  }
  function userHasSkill(skill: Tag): boolean {
    return (
      Boolean(skills.value.find((s) => s.id === skill.id)) ||
      Boolean(authStore.userSkills?.common.find((s) => s.id === skill.id))
    );
  }
  function initSkills() {
    skills.value = deepClone(authStore.userSkills?.personal || []);
  }
  // </FUNCTIONS>

  // <EVENTS>
  function onTagClick(skill: Tag) {
    if (userHasSkill(skill)) return;
    searchValue.value = '';
    skills.value.push(skill);
  }
  function onSave() {
    authStore.updateUserSkills(skills.value);
  }

  function onDeleteSkill(skill: Tag) {
    const idx = skills.value.findIndex((s) => s.id === skill.id);
    skills.value.splice(idx, 1);
  }

  function onClose() {
    modalsStore.editSkillsModal = false;
    searchValue.value = '';
    initSkills();
  }
  // </EVENTS>
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
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 0.625rem;
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

    color: var(--gray-color-2);
    text-transform: uppercase;
  }

  .tag-item {
    list-style: none;
  }

  .tag-btn {
    display: block;
    width: 100%;
    padding: 0.5625rem 0;
    text-align: left;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  .tag-btn:hover {
    text-decoration: underline;
  }

  .tag-btn.selected {
    color: var(--gray-color-1);
    text-decoration: line-through;
    cursor: not-allowed;
  }

  .actions {
    display: flex;
    justify-content: center;
    margin-top: 2.75rem;
  }
</style>

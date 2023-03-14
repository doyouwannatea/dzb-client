<template>
  <BasePanel v-if="isCandidate(authStore.profileData)" class="panel">
    <div class="container">
      <h1 class="title">Навыки</h1>
      <BaseTooltip :message="academicSkillsMsg">
        <h2 class="subtitle">
          Академические навыки ({{ authStore.profileData?.training_group }})
        </h2>
      </BaseTooltip>
      <SkillList
        class="tags-list"
        :skills="skillsStore.userSkills?.common"
        :show-all="true"
        :disable-all="true"
      />
      <div v-if="skillsStore.loading">загрузка...</div>
      <div class="divider"></div>
      <BaseTooltip :message="individualSkillsMsg">
        <h2 class="subtitle">Индивидуальные навыки</h2>
      </BaseTooltip>
      <SkillList
        class="tags-list"
        :skills="skillsStore.userSkills?.personal"
        :show-all="true"
      />
      <div v-if="skillsStore.loading">загрузка...</div>
      <BaseButton
        class="edit-btn"
        case="uppercase"
        variant="outlined"
        :disabled="skillsStore.loading"
        @click="modalsStore.editSkillsModal = true"
      >
        Редактировать навыки
      </BaseButton>
    </div>
  </BasePanel>
  <EditSkillsModal />
</template>

<script setup lang="ts">
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import { useFetchAdditionalProjectData } from '@/hooks/useFetchAdditionalProjectData';
  import { useSkillsStore } from '@/stores/skills/useSkillsStore';
  import { useGetUserSkills } from '@/hooks/useFetchStudentData';
  import { isCandidate } from '@/helpers/typeCheck';
  // components
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseTooltip from '@/components/ui/BaseTooltip.vue';
  import SkillList from '@/components/skill/SkillList.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import EditSkillsModal from '@/components/skill/EditSkillsModal.vue';

  useGetUserSkills();
  useFetchAdditionalProjectData();
  const modalsStore = useModalsStore();
  const authStore = useAuthStore();
  const skillsStore = useSkillsStore();

  const academicSkillsMsg = `Академические навыки - это набор практических умений студентов,
  которые позволяют им быстрее и лучше усваивать новый материал в университете,
  видеть поставленные проблемы глубже и глубже размышлять над заданными вопросами,
  что в итоге помогает им писать более сложные и интересные академические работы (эссе, доклады)`;

  const individualSkillsMsg = `Подбор кандидатов начинается с оценки резюме.
  Если хотите, чтобы вам назначили собеседование, то указывайте свои основные умения,
  не надеясь, что пары общих фраз будет достаточно.
  Вы можете посмотреть пример профессиональных знаний для резюме системного администратора,
  чтобы понять, что надо указывать. Можно выделить такие умения:`;
</script>

<style scoped>
  .panel {
    display: flex;
    min-height: 100%;
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .divider {
    width: 100%;
    height: 1px;
    margin: 1.75rem 0;
    background: var(--gray-color-1);
  }

  .title {
    margin-bottom: 2.0625rem;
    font-size: 1.875rem;
    font-weight: 800;
    line-height: 2.375rem;
  }

  .subtitle {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.625rem;
  }

  .tags-list {
    margin-top: 0.9375rem;
  }

  .edit-btn {
    display: block;
    margin-top: auto;
    margin-left: auto;
  }
</style>

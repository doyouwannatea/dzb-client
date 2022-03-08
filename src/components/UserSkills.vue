<template>
  <BasePanel class="panel" :cols="1">
    <div>
      <h1 class="title">Навыки</h1>
      <BaseTooltip :message="academicSkillsMsg">
        <h2 class="subtitle">Академические навыки (ИСТб-18-1)</h2>
      </BaseTooltip>
      <TagsList
        class="tags-list"
        :tags="tags"
        :show-all="true"
        :disable-all="true"
      />
      <div class="divider"></div>
      <BaseTooltip :message="individualSkillsMsg">
        <h2 class="subtitle">Индивидуальные навыки</h2>
      </BaseTooltip>
      <TagsList class="tags-list" :tags="tags" :show-all="true" />
      <BaseButton class="edit-btn" case="uppercase" variant="outlined">
        Редактировать навыки
      </BaseButton>
    </div>
  </BasePanel>
</template>

<script setup lang="ts">
  import { tags } from '@/models/mock/project';
  import BasePanel from './base/BasePanel.vue';
  import BaseTooltip from './base/BaseTooltip.vue';
  import TagsList from './TagsList.vue';
  import BaseButton from './base/BaseButton.vue';

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
    min-height: 100%;
  }

  .divider {
    width: 100%;
    height: 1px;
    background: var(--gray-color-1);
    margin: 1.75rem 0;
  }

  .title {
    font-weight: 800;
    font-size: 1.875rem;
    line-height: 2.375rem;
    margin-bottom: 2.0625rem;
  }
  .subtitle {
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.625rem;
  }

  .tags-list {
    margin-top: 0.9375rem;
  }

  .edit-btn {
    margin-top: 3rem;
    margin-left: auto;
    display: block;
  }
</style>

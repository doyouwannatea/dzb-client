<template>
  <SkillsEditModal
    v-model:is-show="showEditSkillsModal"
    v-model:skill-list="skillList"
    :shared-skill-list="skills"
  />
  <PageLayout>
    <header class="header">
      <h1 :class="[$style.title, 'page-title']">Создать проект</h1>
    </header>
    <BasePanel>
      <FormSection
        :class="$style['project-type-section']"
        tag="1"
        title="Тип проекта"
        divider
      >
        <!-- <Project type> -->
        <BaseLabel
          :class="$style['radio-buttons-label']"
          label="Выберите тип проекта"
          required
        >
          <BaseRadioButton v-model="projectType" :value="1">
            Новый проект
          </BaseRadioButton>
          <BaseRadioButton v-model="projectType" :value="2">
            Продолжить старый (из Архива)
          </BaseRadioButton>
        </BaseLabel>
        <!-- </Project type> -->

        <!-- <Prev project> -->
        <BaseLabel
          is="div"
          label="Выберите проект, который хотите продолжить"
          :disabled="projectType !== 2"
        >
          <VMultiselect
            v-model="prevProject"
            class="multiselect"
            placeholder="Выберите проект для продолжения"
            no-results-text="Проект не найден"
            no-options-text="Проекты не найдены"
            :searchable="true"
            :options="[
              'Разработка автоматизированной «дорожной карты» подготовки и проведения мероприятий в ИРНИТУ',
              'Профиль потребителя энергоресурсов',
            ]"
            :disabled="projectType !== 2"
          />
        </BaseLabel>
        <!-- </Prev project> -->
      </FormSection>

      <FormSection
        :class="$style['project-data-section']"
        tag="2"
        title="Данные о проекте"
        divider
      >
        <!-- <Project name> -->
        <BaseLabel label="Название проекта" required>
          <BaseTextarea
            v-model="projectName"
            :class="$style['small-textarea']"
            placeholder="Например, платформа для размещения вузовских олимпиад"
            maxlength="100"
          />
        </BaseLabel>
        <!-- </Project name> -->

        <!-- <Project goal> -->
        <BaseLabel label="Цель проекта" required>
          <BaseTextarea
            v-model="projectGoal"
            :class="$style['small-textarea']"
            placeholder="Например, создать платформу (страничку) для рекламы олимпиад"
            maxlength="100"
          />
        </BaseLabel>
        <!-- </Project goal> -->

        <!-- <Project customer> -->
        <BaseLabel label="Заказчик">
          <BaseInput
            v-model="projectCustomer"
            placeholder="ЦЭО, Лукьянов Н.Д."
          />
        </BaseLabel>
        <!-- </Project customer> -->

        <!-- <Project theme source> -->
        <BaseLabel is="div" label="Источник темы">
          <template #label="{ label }">
            <BaseTooltip
              :position-x="isSmallDevice ? 'left' : 'right'"
              message="Eсли на момент заполнения аннотации нет информации, ее можно предоставить позднее, в сроки оговоренные положением о проектном обучении, либо оставить поле пустым"
            >
              {{ label }}
            </BaseTooltip>
          </template>

          <template #default>
            <VMultiselect
              v-model="projectThemeSource"
              class="multiselect"
              placeholder="Ввыберите источник темы"
              no-results-text="Источник не найден"
              no-options-text="Источники не найдены"
              :searchable="true"
              :options="[
                'текущие запросы служб ИРНИТУ',
                'тематики бизнес акселератора ИРНИТУ ',
                'тематики проектно-образовательных интенсивов (в том числе реализуемых в сетевой форме)',
                'тематики предприятий и сторонних организаций (в том числе реализуемых в рамках НИР, НИОКР и хоз. договорных работ) ',
                'тематики российских и международных конкурсов и соревнований',
                'тематики грантов (любого уровня, в том числе ИРНИТУ)',
                'тематики российских и международных акселерационных программ',
              ]"
            />
          </template>
        </BaseLabel>
        <!-- </Project theme source> -->

        <!-- <Project duration> -->
        <BaseLabel
          :class="$style['radio-buttons-label']"
          label="Длительность проекта"
          required
        >
          <BaseRadioButton v-model="projectDuration" :value="1">
            1 семестр (весенний)
          </BaseRadioButton>
          <BaseRadioButton v-model="projectDuration" :value="2">
            1 семестр (осенний)
          </BaseRadioButton>
          <BaseRadioButton v-model="projectDuration" :value="3">
            2 семестра
          </BaseRadioButton>
        </BaseLabel>
        <!-- </Project duration> -->

        <!-- <Project difficulty> -->
        <BaseLabel
          :class="$style['radio-buttons-label']"
          label="Сложность проекта"
          required
        >
          <BaseRadioButton v-model="projectDifficulty" :value="1">
            Легкий
          </BaseRadioButton>
          <BaseRadioButton v-model="projectDifficulty" :value="2">
            Средний
          </BaseRadioButton>
          <BaseRadioButton v-model="projectDifficulty" :value="3">
            Сложный
          </BaseRadioButton>
        </BaseLabel>
        <!-- </Project difficulty> -->
      </FormSection>

      <FormSection
        :class="$style['project-team-section']"
        tag="3"
        title="Роли в проекте"
        divider
      >
        <!-- <Project institute> -->
        <BaseLabel
          is="div"
          :class="$style['institute-input']"
          label="Кафедра, к которой будет привязан проект"
        >
          <template #label="{ label }">
            <BaseTooltip
              :position-x="isSmallDevice ? 'left' : 'right'"
              message="Заполняется автоматически в зависимости от выбранного на проекте наставника"
            >
              {{ label }}
            </BaseTooltip>
          </template>

          <template #default>
            <BaseInput
              :model-value="team[0].memberData?.fio"
              placeholder="Выберите наставника проекта"
              disabled
            />
          </template>
        </BaseLabel>
        <!-- </Project institute> -->

        <!-- <Project team> -->
        <ProjectTeamCollect
          v-model:team="team"
          :supervisor-list="mockSupervisorList"
          :role-list="sharedRoleList"
          :current-user-role-list="currentUserRoleList"
        >
          <template #add-button>+ добавить сонаставника</template>
        </ProjectTeamCollect>
        <!-- </Project team> -->
      </FormSection>

      <FormSection
        :class="$style['project-results-section']"
        tag="4"
        title="Результаты и идея проекта"
        divider
      >
        <!-- <Project expected result> -->
        <BaseLabel label="Ожидаемый результат">
          <BaseTextarea
            v-model="projectExpectedResult"
            :class="$style['small-textarea']"
            placeholder="Создать платформу (страничку) для рекламы олимпиад"
            maxlength="100"
          />
        </BaseLabel>
        <!-- </Project expected result> -->

        <!-- <Project requirements for participants> -->
        <BaseLabel label="Требования к участникам">
          <BaseTextarea
            v-model="projectRequirementsForParticipants"
            :class="$style['small-textarea']"
            placeholder="Например, знание основ верстки  и дизайна веб-страниц"
            maxlength="100"
          />
        </BaseLabel>
        <!-- </Project requirements for participants> -->

        <!-- <Project idea> -->
        <BaseLabel label="Идея проекта">
          <BaseTextarea
            v-model="projectIdea"
            :class="$style['large-textarea']"
            placeholder="Опишите идею своего проекта"
            maxlength="1200"
          />
        </BaseLabel>
        <!-- </Project idea> -->
      </FormSection>

      <FormSection
        tag="5"
        title="Направления (специальности), профилей  участников проекта"
      >
        <!-- <Project specialties> -->
        <SkillList show-all :skills="trainingСourses" />
        <!-- </Project specialties> -->
      </FormSection>

      <FormSection
        tag="6"
        title="Навыки, которые необходимы на проекте"
        divider
      >
        <!-- <Project skills> -->
        <SkillList show-all :skills="skillList">
          <template #after-list>
            <BaseButton
              case="none"
              variant="tag"
              @click="() => (showEditSkillsModal = true)"
            >
              Добавить навыки +
            </BaseButton>
          </template>
        </SkillList>
        <!-- </Project skills> -->
      </FormSection>
    </BasePanel>

    <div :class="$style.actions">
      <BaseButton color="red" variant="outlined">Сбросить и выйти</BaseButton>
      <BaseButton variant="outlined">Сохранить черновик</BaseButton>
      <BaseButton>Подать заявку</BaseButton>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';

  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import { useWatchAuthorization } from '@/hooks/useWatchAuthorization';
  import { isSupervisor } from '@/helpers/typeCheck';

  import { MemberRole } from '@/models/ProjectApplication';
  import { Tag } from '@/models/Project';
  import { supervisorList as mockSupervisorList } from '@/models/mock/supervisor';

  import PageLayout from '@/components/layout/PageLayout.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import FormSection from '@/components/ui/FormSection.vue';
  import ProjectTeamCollect, {
    TeamMember,
  } from '@/components/project/ProjectTeamCollect.vue';
  import BaseLabel from '@/components/ui/label/BaseLabel.vue';
  import BaseRadioButton from '@/components/ui/BaseRadioButton.vue';
  import VMultiselect from '@vueform/multiselect';
  import BaseTextarea from '@/components/ui/BaseTextarea.vue';
  import BaseInput from '@/components/ui/BaseInput.vue';
  import SkillList from '@/components/skill/SkillList.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import SkillsEditModal from '@/components/skill/SkillsEditModal.vue';
  import { skills } from '@/models/mock/project-skills';
  import BaseTooltip from '@/components/ui/BaseTooltip.vue';
  import { useSmallDevice } from '@/helpers/breakpoints';

  useWatchAuthorization();

  const isSmallDevice = useSmallDevice();
  const route = useRoute();
  const authStore = useAuthStore();
  const { profileData } = storeToRefs(authStore);
  const projectId = computed(() => route.params.id);

  const showEditSkillsModal = ref<boolean>(false);

  const projectType = ref<number>(1);
  const prevProject = ref<string | undefined>(undefined);
  const projectName = ref<string | undefined>(undefined);
  const projectGoal = ref<string | undefined>(undefined);
  const projectCustomer = ref<string | undefined>(undefined);
  const projectThemeSource = ref<string | undefined>(undefined);
  const projectDuration = ref<number>(1);
  const projectDifficulty = ref<number>(1);
  const projectRequirementsForParticipants = ref<string | undefined>(undefined);
  const projectExpectedResult = ref<string | undefined>(undefined);
  const projectIdea = ref<string | undefined>(undefined);

  const trainingСourses: Tag[] = [
    { id: 1, name: 'ИСТ', skillCategory_id: 1 },
    { id: 2, name: 'ЭВМ', skillCategory_id: 1 },
    { id: 3, name: 'ИБ', skillCategory_id: 1 },
    { id: 4, name: 'АСУ', skillCategory_id: 1 },
  ];
  const skillList = ref<Tag[]>([
    { id: 1, name: 'JavaScript', skillCategory_id: 1 },
    { id: 2, name: 'Web', skillCategory_id: 1 },
    { id: 3, name: 'Конференция', skillCategory_id: 1 },
  ]);

  // <Team control>
  const team = ref<TeamMember[]>(initTeam());

  const sharedRoleList: MemberRole[] = [MemberRole.CoMentor];
  const currentUserRoleList: MemberRole[] = [MemberRole.Mentor];

  function initTeam(): TeamMember[] {
    const team: TeamMember[] = [];
    if (profileData?.value && isSupervisor(profileData.value)) {
      const { is_student, is_teacher, ...currentUser } = profileData.value;
      team.push({
        memberData: currentUser,
        isCurrentUser: true,
        role: MemberRole.Mentor,
      });
    }

    return team;
  }
  // </Team control>
</script>

<style lang="scss" module>
  .title {
    margin-top: 4.75rem;
    margin-bottom: 1.875rem;
  }

  .radio-buttons-label {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    justify-self: flex-start;
  }

  .actions {
    display: flex;
    gap: 0.9375rem;
    justify-content: flex-end;
    margin-top: 1.5rem;
  }

  .small-textarea {
    min-height: 8.375rem;
  }

  .large-textarea {
    min-height: 21.25rem;
  }

  .project-type-section {
    display: grid;
    grid-template-columns: 3fr 4fr;
    gap: 1rem;
  }

  .institute-input {
    margin-bottom: 1.5rem;
  }

  .project-team-section {
    display: grid;
    grid-template-columns: 4fr 1fr 3fr;
    column-gap: 1.5rem;

    & > *:nth-child(1) {
      grid-column: 1;
    }

    & > *:nth-child(2) {
      grid-column: 1 / -1;
    }
  }

  .project-data-section {
    display: grid;
    grid-template-columns: 4fr 1fr 3fr;
    gap: 1.5rem;

    & > *:nth-child(1) {
      grid-column: 1;
    }

    & > *:nth-child(2) {
      grid-column: 1;
    }

    & > *:nth-child(3) {
      grid-column: 1;
    }

    & > *:nth-child(4) {
      grid-column: 1;
    }

    & > *:nth-child(5) {
      grid-row: 1;
      grid-column: 3;
    }

    & > *:nth-child(6) {
      grid-row: 2;
      grid-column: 3;
    }
  }

  .project-results-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.875rem;

    & > *:nth-child(1) {
      grid-column: 1;
    }

    & > *:nth-child(2) {
      grid-column: 2;
    }

    & > *:nth-child(3) {
      grid-row: 2;
      grid-column: 1 / -1;
    }
  }
</style>

<template>
  <SkillsEditModal
    v-if="projectSkills.data.value"
    v-model:is-show="showSkillsEditModal"
    v-model:skill-list="skillListRef"
    :shared-skill-list="projectSkills.data.value"
  />
  <SpecialtyEditModal
    v-if="specialtyList.data.value"
    v-model:is-show="showSpecialtyEditModal"
    v-model:specialty-list="specialtyListRef"
    :shared-specialty-list="specialtyList.data.value"
  />
  <SpecialtyEditModal
    v-if="specialtyList.data.value"
    v-model:is-show="showAdditionalSpecialtyEditModal"
    v-model:specialty-list="additionalSpecialtyListRef"
    :shared-specialty-list="specialtyList.data.value"
  >
    <template #title>
      <h1>Редактирование приглашённых специальностей</h1>
    </template>
  </SpecialtyEditModal>
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
          is="fieldset"
          :class="$style['radio-buttons-label']"
          label="Выберите тип проекта"
          required
        >
          <BaseRadioButton
            v-model="isNewProjectRef"
            :value="true"
            :disabled="disableAll"
          >
            Новый проект
          </BaseRadioButton>
          <BaseRadioButton
            v-model="isNewProjectRef"
            :value="false"
            :disabled="disableAll"
          >
            Продолжить старый (из Архива)
          </BaseRadioButton>
        </BaseLabel>
        <!-- </Project type> -->

        <!-- <Prev project> -->
        <BaseLabel is="div" label="Выберите проект, который хотите продолжить">
          <VMultiselect
            v-model="prevProjectIdRef"
            class="multiselect"
            :placeholder="
              prevProjects.isFetching.value
                ? 'Ваши проекты загружаются...'
                : prevProjects.isError.value
                ? 'Ошибка загрузки ваших проектов'
                : prevProjects.data.value && prevProjects.data.value.length < 1
                ? 'В системе не найдены Ваши проекты'
                : isNewProjectRef
                ? 'Переключите тип проекта на «Продолжить старый»'
                : 'Выберите проект для продолжения'
            "
            no-results-text="Проект не найден"
            no-options-text="Проекты не найдены"
            :searchable="true"
            :options="prevProjectsMultiselectItems"
            :disabled="
              isNewProjectRef ||
              prevProjects.isFetching.value ||
              (prevProjects.data.value && prevProjects.data.value.length < 1) ||
              disableAll
            "
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
            v-model="projectNameRef"
            :disabled="disableAll"
            :class="$style['small-textarea']"
            placeholder="Например, платформа для размещения вузовских олимпиад"
            maxlength="100"
          />
        </BaseLabel>
        <!-- </Project name> -->

        <!-- <Project goal> -->
        <BaseLabel label="Цель проекта" required>
          <BaseTextarea
            v-model="projectGoalRef"
            :disabled="disableAll"
            :class="$style['small-textarea']"
            placeholder="Например, создать платформу (страничку) для рекламы олимпиад"
            maxlength="100"
          />
        </BaseLabel>
        <!-- </Project goal> -->

        <!-- <Project customer> -->
        <BaseLabel label="Заказчик">
          <BaseInput
            v-model="projectCustomerRef"
            :disabled="disableAll"
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
              v-model="projectThemeSourceIdRef"
              class="multiselect"
              :disabled="themeSources.isFetching.value || disableAll"
              :placeholder="
                themeSources.isFetching.value
                  ? 'Источники темы загружаются...'
                  : themeSources.isError.value
                  ? 'Ошибка загрузки источников темы'
                  : 'Ввыберите источник темы'
              "
              no-results-text="Источник не найден"
              no-options-text="Источники не найдены"
              :searchable="true"
              :options="themeSourcesMultiselectItems"
            />
          </template>
        </BaseLabel>
        <!-- </Project theme source> -->

        <!-- <Project duration> -->
        <BaseLabel
          is="fieldset"
          :class="$style['radio-buttons-label']"
          label="Длительность проекта"
          required
        >
          <BaseRadioButton
            v-model="projectDurationRef"
            :disabled="disableAll"
            :value="ProjectDuration.FallSemester"
          >
            1 семестр (оень {{ currentYear }} года)
          </BaseRadioButton>
          <BaseRadioButton
            v-model="projectDurationRef"
            :disabled="disableAll"
            :value="ProjectDuration.SpringSemester"
          >
            1 семестр (весна {{ currentYear + 1 }} года)
          </BaseRadioButton>
          <BaseRadioButton
            v-model="projectDurationRef"
            :disabled="disableAll"
            :value="ProjectDuration.FullYear"
          >
            2 семестра
          </BaseRadioButton>
        </BaseLabel>
        <!-- </Project duration> -->

        <!-- <Project difficulty> -->
        <BaseLabel
          is="fieldset"
          :class="$style['radio-buttons-label']"
          label="Сложность проекта"
          required
        >
          <BaseRadioButton
            v-model="projectDifficultyRef"
            :disabled="disableAll"
            :value="ProjectDifficulty.Low"
          >
            Легкий
          </BaseRadioButton>
          <BaseRadioButton
            v-model="projectDifficultyRef"
            :disabled="disableAll"
            :value="ProjectDifficulty.Medium"
          >
            Средний
          </BaseRadioButton>
          <BaseRadioButton
            v-model="projectDifficultyRef"
            :disabled="disableAll"
            :value="ProjectDifficulty.High"
          >
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
          label="Подразделение, к которому будет привязан проект"
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
              :model-value="projectDepartmentComputed?.name"
              :placeholder="
                projectMentorComputed.memberData
                  ? 'Подразделение наставника не установлено'
                  : 'Выберите наставника проекта'
              "
              disabled
            />
          </template>
        </BaseLabel>
        <!-- </Project institute> -->

        <!-- <Project team> -->
        <ProjectTeamCollect
          v-if="supervisorList.data.value"
          v-model:team="team"
          :supervisor-list="supervisorList.data.value"
          :role-list="sharedRoleList"
          :current-user-role-list="currentUserRoleList"
          :disable-all="supervisorList.isFetching.value || disableAll"
        >
          <template #add-button>
            <template v-if="supervisorList.isFetching.value">
              Преподаватели загружаются...
            </template>
            <template v-else-if="supervisorList.isError.value">
              Ошибка загрузки преподавателей
            </template>
            <template v-else>+ добавить сонаставника</template>
          </template>
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
            v-model="projectExpectedResultRef"
            :disabled="disableAll"
            :class="$style['small-textarea']"
            placeholder="Создать платформу (страничку) для рекламы олимпиад"
            maxlength="100"
          />
        </BaseLabel>
        <!-- </Project expected result> -->

        <!-- <Project requirements for participants> -->
        <BaseLabel label="Формируемые навыки">
          <BaseTextarea
            v-model="skillsToBeFormed"
            :disabled="disableAll"
            :class="$style['small-textarea']"
            placeholder="Например, знание основ верстки  и дизайна веб-страниц"
            maxlength="100"
          />
        </BaseLabel>
        <!-- </Project requirements for participants> -->

        <!-- <Project idea> -->
        <BaseLabel label="Идея проекта">
          <BaseTextarea
            v-model="projectIdeaRef"
            :disabled="disableAll"
            :class="$style['large-textarea']"
            placeholder="Опишите идею своего проекта"
            maxlength="1200"
          />
        </BaseLabel>
        <!-- </Project idea> -->
      </FormSection>

      <FormSection
        tag="5"
        title="Направления (специальности), участников проекта"
      >
        <!-- <Project specialties> -->
        <TagList show-all :tag-list="specialtyListRef">
          <template #after-list>
            <BaseButton
              case="none"
              variant="tag"
              :disabled="specialtyList.isFetching.value || disableAll"
              @click="() => (showSpecialtyEditModal = true)"
            >
              <template v-if="projectSkills.isFetching.value">
                Специальности загружаются...
              </template>
              <template v-else-if="projectSkills.isError.value">
                Ошибка загрузки специальностей
              </template>
              <template v-else>Добавить специальности +</template>
            </BaseButton>
          </template>
        </TagList>
        <!-- </Project specialties> -->
      </FormSection>

      <FormSection
        tag="6"
        title="Приглашённые направления (специальности), участников проекта"
        divider
      >
        <!-- <Project specialties> -->
        <TagList show-all :tag-list="additionalSpecialtyListRef">
          <template #after-list>
            <BaseButton
              case="none"
              variant="tag"
              :disabled="specialtyList.isFetching.value || disableAll"
              @click="() => (showAdditionalSpecialtyEditModal = true)"
            >
              <template v-if="projectSkills.isFetching.value">
                Специальности загружаются...
              </template>
              <template v-else-if="projectSkills.isError.value">
                Ошибка загрузки специальностей
              </template>
              <template v-else>Добавить специальности +</template>
            </BaseButton>
          </template>
        </TagList>
        <!-- </Project specialties> -->
      </FormSection>

      <FormSection tag="7" title="Навыки, которые необходимы на проекте">
        <!-- <Project skills> -->
        <TagList show-all :tag-list="skillListRef">
          <template #after-list>
            <BaseButton
              case="none"
              variant="tag"
              :disabled="projectSkills.isFetching.value || disableAll"
              @click="() => (showSkillsEditModal = true)"
            >
              <template v-if="projectSkills.isFetching.value">
                Навыки загружаются...
              </template>
              <template v-else-if="projectSkills.isError.value">
                Ошибка загрузки навыков
              </template>
              <template v-else>Добавить навыки +</template>
            </BaseButton>
          </template>
        </TagList>
        <!-- </Project skills> -->
      </FormSection>
    </BasePanel>

    <div :class="$style.actions">
      <BaseButton :disabled="disableAll" color="red" variant="outlined">
        Сбросить и выйти
      </BaseButton>
      <BaseButton :disabled="disableAll" variant="outlined">
        Сохранить черновик
      </BaseButton>
      <BaseButton :disabled="disableAll" @click="createProjectProposal">
        Подать заявку
      </BaseButton>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';
  import { DateTime } from 'luxon';

  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import { useWatchAuthorization } from '@/hooks/useWatchAuthorization';
  import { isSupervisor } from '@/helpers/typeCheck';

  import {
    MemberRole,
    ProjectProposal,
    ProjectProposalState,
    SpecialtyPriority,
  } from '@/models/ProjectProposal';
  import { ProjectTypeName } from '@/models/Project';

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
  import TagList from '@/components/ui/TagList.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import SkillsEditModal, {
    EditedSkill,
  } from '@/components/skill/SkillsEditModal.vue';
  import BaseTooltip from '@/components/ui/BaseTooltip.vue';
  import { useSmallDevice } from '@/helpers/breakpoints';
  import SpecialtyEditModal from '@/components/specialty/SpecialtyEditModal.vue';
  import { SelectedSpecialty } from '@/models/Specialty';
  import { MultiselectObjectItem } from '@/models/VMultiselect';

  import { useAllSupervisors } from '@/queries/useAllSupervisors';
  import { useProjectSkills } from '@/queries/useProjectSkills';
  import { useSpecialties } from '@/queries/useSpecialties';
  import { useUserProjects } from '@/queries/useUserProjects';
  import { useThemeSources } from '@/queries/useThemeSources';
  import { useCreateProjectProposal } from '@/queries/useCreateProjectProposal';
  import { ProjectDifficulty } from '@/models/ProjectDifficulty';

  const enum ProjectDuration {
    SpringSemester = 1,
    FallSemester = 2,
    FullYear = 3,
  }

  useWatchAuthorization();

  const isSmallDevice = useSmallDevice();
  const route = useRoute();
  const authStore = useAuthStore();
  const { profileData } = storeToRefs(authStore);
  const projectId = computed(() => route.params.id);

  const supervisorList = useAllSupervisors();
  const projectSkills = useProjectSkills();
  const specialtyList = useSpecialties();
  const prevProjects = useUserProjects();
  const themeSources = useThemeSources();

  const createProjectProposalMutation = useCreateProjectProposal();

  const disableAll = computed(
    () => createProjectProposalMutation.isLoading.value,
  );

  const showSkillsEditModal = ref<boolean>(false);
  const showSpecialtyEditModal = ref<boolean>(false);
  const showAdditionalSpecialtyEditModal = ref<boolean>(false);

  const isNewProjectRef = ref<boolean>(true);
  const prevProjectIdRef = ref<number | null>(null);
  const projectNameRef = ref<string>('');
  const projectGoalRef = ref<string>('');
  const projectCustomerRef = ref<string>('');
  const projectThemeSourceIdRef = ref<number | null>(null);
  const projectDurationRef = ref<ProjectDuration>(ProjectDuration.FallSemester);
  const projectDifficultyRef = ref<ProjectDifficulty>(ProjectDifficulty.Low);
  const skillsToBeFormed = ref<string>('');
  const projectExpectedResultRef = ref<string>('');
  const projectIdeaRef = ref<string>('');
  const specialtyListRef = ref<SelectedSpecialty<number | string>[]>([]);
  const additionalSpecialtyListRef = ref<SelectedSpecialty<number | string>[]>(
    [],
  );
  const skillListRef = ref<EditedSkill[]>([]);
  const team = ref<TeamMember[]>(initTeam());
  const sharedRoleList: MemberRole[] = [MemberRole.CoMentor];
  const currentUserRoleList: MemberRole[] = [MemberRole.Mentor];

  const projectMentorComputed = computed(() => team.value[0]);
  const projectDepartmentComputed = computed(
    () => projectMentorComputed.value.memberData?.department,
  );
  const prevProjectsMultiselectItems = computed<
    MultiselectObjectItem<number>[]
  >(
    () =>
      prevProjects.data.value?.map((project) => ({
        label: project.title,
        value: project.id,
      })) || [],
  );
  const themeSourcesMultiselectItems = computed<
    MultiselectObjectItem<number>[]
  >(
    () =>
      themeSources.data.value?.map((source) => ({
        label: source.name,
        value: source.id,
      })) || [],
  );
  const currentYear = new Date(Date.now()).getFullYear();

  watch(
    () => isNewProjectRef.value,
    (isNewProject) => {
      if (isNewProject) prevProjectIdRef.value = null;
    },
  );

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

  function createProjectProposal() {
    // тут валидация
    if (!projectDepartmentComputed.value) return;
    if (!projectNameRef.value) return;

    const date = calcProjectDate(projectDurationRef.value);

    const projectProposal: ProjectProposal = {
      title: projectNameRef.value,
      goal: projectGoalRef.value,
      customer: projectCustomerRef.value,
      theme_source_id: projectThemeSourceIdRef.value,
      prev_project_id: prevProjectIdRef.value,
      difficulty: projectDifficultyRef.value,
      department_id: projectDepartmentComputed.value.id,
      supervisors: team.value
        .filter((member) => member.memberData && member.role)
        .map((member) => ({
          supervisor_id: member.memberData!.id,
          role_ids: [member.role!],
        })),
      product_result: projectExpectedResultRef.value,
      specialities: [
        ...additionalSpecialtyListRef.value.map((specialty) => ({
          course: specialty.course,
          specialitiy_id: specialty.specialty_id,
          priority: SpecialtyPriority.Low,
        })),
        ...specialtyListRef.value.map((specialty) => ({
          course: specialty.course,
          specialitiy_id: specialty.specialty_id,
          priority: SpecialtyPriority.High,
        })),
      ],
      skill_ids: skillListRef.value
        .filter((skill) => !skill.isNew)
        .map((skill) => skill.id),
      new_skills: skillListRef.value
        .filter((skill) => skill.isNew)
        .map((skill) => skill.name),
      date_start: date.start,
      date_end: date.end,
      description: projectIdeaRef.value,
      state_id: ProjectProposalState.UnderReview,
      places: 0,
      type_id: ProjectTypeName.Applied,
      study_result: skillsToBeFormed.value,
      additional_inf: '',
      requirements: '',
    };

    createProjectProposalMutation.mutate(projectProposal);
  }

  function calcProjectDate(duration: ProjectDuration): {
    start: string;
    end: string;
  } {
    const currentYear = new Date(Date.now()).getFullYear();

    const springStartDate = DateTime.fromObject({
      year: currentYear + 1,
      month: 2,
      day: 1,
    });
    const springEndDate = springStartDate.plus({ months: 4 });
    const fallStartDate = DateTime.fromObject({
      year: currentYear,
      month: 9,
      day: 1,
    });
    const fallEndDate = fallStartDate.plus({ months: 4 });

    let dateStart = '';
    let dateEnd = '';
    switch (duration) {
      case ProjectDuration.SpringSemester:
        dateStart = springStartDate.toISODate();
        dateEnd = springEndDate.toISODate();
        break;
      case ProjectDuration.FallSemester:
        dateStart = fallStartDate.toISODate();
        dateEnd = fallEndDate.toISODate();
        break;
      case ProjectDuration.FullYear:
        dateStart = fallStartDate.toISODate();
        dateEnd = springEndDate.toISODate();
        break;
    }

    return {
      start: dateStart,
      end: dateEnd,
    };
  }
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

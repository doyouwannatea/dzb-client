<template>
  <SkillsEditModal
    v-if="projectSkills.data.value"
    v-model:is-show="showSkillsEditModal"
    v-model:skill-list="skillListRef"
    :shared-skill-list="projectSkills.data.value"
  />
  <SpecialtyEditModal
    v-if="specialtiesOfMentorDepartmentComputed"
    v-model:is-show="showSpecialtyEditModal"
    v-model:specialty-list="specialtyListRef"
    :shared-specialty-list="specialtiesOfMentorDepartmentComputed"
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
      <h1 :class="[$style.title, 'page-title']">Создание проектной заявки</h1>
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
            :disabled="disableAll || prevProjectsMultiselectItems.length < 1"
          >
            Новый проект
          </BaseRadioButton>
          <BaseRadioButton
            v-model="isNewProjectRef"
            :value="false"
            :disabled="disableAll || prevProjectsMultiselectItems.length < 1"
          >
            Продолжить старый
          </BaseRadioButton>
        </BaseLabel>
        <!-- </Project type> -->

        <!-- <Prev project> -->
        <BaseLabel is="div" label="Выберите проект, который хотите продолжить">
          <VMultiselect
            v-model="prevProjectIdRef"
            class="multiselect"
            :placeholder="
              userProjectProposalList.isFetching.value
                ? 'Ваши проекты загружаются...'
                : userProjectProposalList.isError.value
                ? 'Ошибка загрузки ваших проектов'
                : prevProjectsMultiselectItems.length < 1
                ? 'Ваши старые проекты не найдены'
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
              userProjectProposalList.isFetching.value ||
              prevProjectsMultiselectItems.length < 1 ||
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
            resize="vertical"
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
            resize="vertical"
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
            1 семестр (осень {{ currentYear }} года)
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
            2 семестра ({{ currentYear }} - {{ currentYear + 1 }} год)
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
                projectMentorComputed?.memberData
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
          v-model:team="teamRef"
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
        title="Описание и предполагаемые результаты проекта"
        divider
      >
        <!-- <Project expected result> -->
        <BaseLabel required label="Ожидаемый результат">
          <BaseTextarea
            v-model="projectExpectedResultRef"
            :disabled="disableAll"
            :class="$style['small-textarea']"
            placeholder="Создать платформу (страничку) для рекламы олимпиад"
            resize="vertical"
          />
        </BaseLabel>
        <!-- </Project expected result> -->

        <!-- <Project requirements for participants> -->
        <BaseLabel required label="Формируемые навыки">
          <BaseTextarea
            v-model="skillsToBeFormed"
            :disabled="disableAll"
            :class="$style['small-textarea']"
            placeholder="Например, знание основ верстки  и дизайна веб-страниц"
            resize="vertical"
          />
        </BaseLabel>
        <!-- </Project requirements for participants> -->

        <!-- <Project description> -->
        <BaseLabel required label="Описание проекта">
          <BaseTextarea
            v-model="projectDescriptionRef"
            :disabled="disableAll"
            :class="$style['large-textarea']"
            placeholder="Опишите идею своего проекта"
            resize="vertical"
          />
        </BaseLabel>
        <!-- </Project description> -->
      </FormSection>

      <FormSection
        tag="5"
        title="Направления (специальности), участников проекта"
      >
        <!-- <Project specialties> -->
        <p
          v-if="isNotEditableProposalComputed && specialtyListRef.length === 0"
        >
          <b>Список пуст</b>
        </p>
        <TagList
          v-else-if="
            specialtyList.isFetching.value ||
            specialtiesOfMentorDepartmentComputed.length > 0
          "
          show-all
          :tag-list="specialtyListRef"
        >
          <template #after-list>
            <BaseButton
              v-if="isEditableProposalComputed"
              case="none"
              variant="tag"
              :disabled="
                specialtyList.isFetching.value ||
                !projectDepartmentComputed ||
                disableAll
              "
              @click="() => (showSpecialtyEditModal = true)"
            >
              <template v-if="projectSkills.isFetching.value">
                Специальности загружаются...
              </template>
              <template v-else-if="projectSkills.isError.value">
                Ошибка загрузки специальностей
              </template>
              <template v-else-if="!projectDepartmentComputed">
                Выберите наставника с кафедрой
              </template>
              <template v-else>Редактировать специальности +</template>
            </BaseButton>
          </template>
        </TagList>
        <p v-else>
          Кафедра <b>«{{ projectDepartmentComputed?.name }}»</b> не выпускает
          специальности.
          <br />
          <br />
          Вы можете пригласить любые специальности в пункте
          <b>6</b>, студенты этих направлений самостоятельно смогут подать
          заявку на участие в Вашем проекте.
        </p>
        <!-- </Project specialties> -->
      </FormSection>

      <FormSection
        tag="6"
        title="Приглашённые направления (специальности), участников проекта"
        divider
      >
        <!-- <Project specialties> -->
        <p
          v-if="
            isNotEditableProposalComputed &&
            additionalSpecialtyListRef.length === 0
          "
        >
          <b>Список пуст</b>
        </p>
        <TagList v-else show-all :tag-list="additionalSpecialtyListRef">
          <template #after-list>
            <BaseButton
              v-if="isEditableProposalComputed"
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
              <template v-else>Редактировать специальности +</template>
            </BaseButton>
          </template>
        </TagList>
        <!-- </Project specialties> -->
      </FormSection>

      <FormSection tag="7" title="Навыки, которые необходимы на проекте">
        <!-- <Project skills> -->
        <p v-if="isNotEditableProposalComputed && skillListRef.length === 0">
          <b>Список пуст</b>
        </p>
        <TagList v-else show-all :tag-list="skillListRef">
          <template #after-list>
            <BaseButton
              v-if="isEditableProposalComputed"
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
              <template v-else>Редактировать навыки +</template>
            </BaseButton>
          </template>
        </TagList>
        <!-- </Project skills> -->
      </FormSection>
    </BasePanel>

    <div :class="$style.actions">
      <BaseButton
        v-if="isEditableProposalComputed"
        :disabled="createProjectProposalMutation.isLoading.value"
        color="red"
        variant="outlined"
        @click="onCancel"
      >
        Сбросить и выйти
      </BaseButton>

      <BaseButton
        is="router-link"
        v-if="isNotEditableProposalComputed"
        :to="{ name: RouteNames.PROJECT_PROPOSALS }"
        variant="outlined"
      >
        Вернуться к заявкам
      </BaseButton>

      <BaseButton
        v-if="
          isEditableProposalComputed ||
          currentProjectProposalState === ProjectProposalStateId.Rejected
        "
        :disabled="
          createProjectProposalMutation.isLoading.value ||
          userProjectProposalList.isFetching.value
        "
        :variant="
          currentProjectProposalState === ProjectProposalStateId.Rejected
            ? 'primary'
            : 'outlined'
        "
        @click="onCreateDraft"
      >
        <template v-if="createProjectProposalMutation.isLoading.value">
          Черновик сохраняется...
        </template>
        <template
          v-else-if="
            currentProjectProposalState === ProjectProposalStateId.Rejected
          "
          >Сохранить как черновик</template
        >
        <template v-else>Сохранить черновик</template>
      </BaseButton>

      <BaseButton
        v-if="isEditableProposalComputed"
        :disabled="
          createProjectProposalMutation.isLoading.value ||
          userProjectProposalList.isFetching.value
        "
        @click="onCreateUnderReview"
      >
        <template v-if="createProjectProposalMutation.isLoading.value">
          Заявка отправляется...
        </template>
        <template v-else>Подать заявку</template>
      </BaseButton>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
  // TODO: отрефакторить логику компонента, а то большой слишком
  import { computed, ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRoute, useRouter } from 'vue-router';
  import { DateTime } from 'luxon';

  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import { useWatchAuthorization } from '@/hooks/useWatchAuthorization';
  import { isSupervisor } from '@/helpers/typeCheck';
  import { useModalsStore } from '@/stores/modals/useModalsStore';

  import {
    MemberRole,
    NewProjectProposal,
    CreatedProjectProposal,
    ProjectProposalStateId,
    ProjectProposalTeamMember,
    ProjectProposalSpecialty,
  } from '@/models/ProjectProposal';
  import { ProjectSupervisor, ProjectTypeName } from '@/models/Project';

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
  import {
    SelectedSpecialty,
    SpecialtyGroup,
    SpecialtyPriority,
  } from '@/models/Specialty';
  import { MultiselectObjectItem } from '@/models/VMultiselect';

  import { useAllSupervisors } from '@/queries/useAllSupervisors';
  import { useProjectSkills } from '@/queries/useProjectSkills';
  import { useSpecialties } from '@/queries/useSpecialties';
  import { useThemeSources } from '@/queries/useThemeSources';
  import { useCreateProjectProposal } from '@/queries/useCreateProjectProposal';
  import { ProjectDifficulty } from '@/models/ProjectDifficulty';
  import { RouteNames } from '@/router/types/route-names';
  import { useProjectProposalList } from '@/queries/useProjectProposalList';
  import { specialtyFullName } from '@/helpers/specialty';
  import { TYPE, useToast } from 'vue-toastification';
  import { ProjectStateID } from '@/models/ProjectState';
  import { toProjectCreateRoute } from '@/router/utils/routes';
  import { useUpdateProjectProposal } from '@/queries/useUpdateProjectProposal';
  import { sortByRolePriority } from '@/helpers/project-member-role';

  const enum ProjectDuration {
    SpringSemester = 1,
    FallSemester = 2,
    FullYear = 3,
  }

  useWatchAuthorization();

  const toast = useToast();
  const isSmallDevice = useSmallDevice();
  const router = useRouter();
  const route = useRoute();
  const authStore = useAuthStore();
  const modalsStore = useModalsStore();
  const { profileData } = storeToRefs(authStore);
  const projectId = computed(() => route.params.id);

  const userProjectProposalList = useProjectProposalList();
  const supervisorList = useAllSupervisors();
  const projectSkills = useProjectSkills();
  const specialtyList = useSpecialties();
  const themeSources = useThemeSources();
  const createProjectProposalMutation = useCreateProjectProposal();
  const updateProjectProposalMutation = useUpdateProjectProposal();

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
  const projectDescriptionRef = ref<string>('');
  const specialtyListRef = ref<SelectedSpecialty<number | string>[]>([]);
  const additionalSpecialtyListRef = ref<SelectedSpecialty<number | string>[]>(
    [],
  );
  const skillListRef = ref<EditedSkill[]>([]);
  const teamRef = ref<TeamMember[]>([]);
  const sharedRoleList: MemberRole[] = [MemberRole.CoMentor];
  const currentUserRoleList: MemberRole[] = [MemberRole.Mentor];

  const currentProjectProposalComputed = computed(() =>
    userProjectProposalList.data.value?.find(
      (proposal) => Number(proposal.id) === Number(projectId.value),
    ),
  );
  const currentProjectProposalState = computed<
    ProjectProposalStateId | undefined
  >(() => currentProjectProposalComputed.value?.state.id);

  const isNotEditableProposalComputed = computed(
    () =>
      currentProjectProposalState.value &&
      [
        ProjectProposalStateId.Approved,
        ProjectProposalStateId.UnderReview,
        ProjectProposalStateId.Rejected,
      ].includes(currentProjectProposalState.value),
  );

  const isEditableProposalComputed = computed(
    () =>
      !currentProjectProposalState.value ||
      [ProjectProposalStateId.Draft].includes(
        currentProjectProposalState.value,
      ),
  );

  const disableAll = computed(
    () =>
      createProjectProposalMutation.isLoading.value ||
      userProjectProposalList.isFetching.value ||
      isNotEditableProposalComputed.value,
  );

  const projectMentorComputed = computed<TeamMember | undefined>(() =>
    teamRef.value.find((member) => member.role === MemberRole.Mentor),
  );
  const projectDepartmentComputed = computed(
    () => projectMentorComputed.value?.memberData?.department,
  );
  const specialtiesOfMentorDepartmentComputed = computed(
    () =>
      specialtyList.data.value?.filter(
        (specialty) =>
          specialty.department?.id === projectDepartmentComputed.value?.id,
      ) || [],
  );
  const prevProjectsMultiselectItems = computed<
    MultiselectObjectItem<number>[]
  >(
    () =>
      userProjectProposalList.data.value
        ?.filter(
          (project) =>
            project.state.id === ProjectStateID.ArchivedState ||
            project.state.id === ProjectStateID.ActiveState,
        )
        .map((project) => ({
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
    () => projectDepartmentComputed.value?.id,
    (departmentId, prevDepartmentId) => {
      if (departmentId === prevDepartmentId) return;
      specialtyListRef.value = [];
    },
  );

  watch(
    () => isNewProjectRef.value,
    (isNewProject) => {
      if (isNewProject) prevProjectIdRef.value = null;
    },
  );

  watch(
    () => currentProjectProposalComputed.value,
    (currentProjectProposal) => {
      if (currentProjectProposal) {
        fillFromProjectProposal(currentProjectProposal);
      } else {
        teamRef.value = initTeam();
      }
    },
    { immediate: true, deep: true },
  );

  function initTeam() {
    const userData = profileData?.value;

    if (!userData || !isSupervisor(userData)) return [];

    const { is_student, is_teacher, ...currentUser } = userData;
    return [
      {
        memberData: currentUser,
        isCurrentUser: true,
        role: MemberRole.Mentor,
      },
    ];
  }

  function validateProjectProposal(): string | undefined {
    if (!projectNameRef.value) {
      return 'Введите название проекта';
    }
    if (!projectGoalRef.value) {
      return 'Введите цель проекта';
    }
    if (!projectDepartmentComputed.value) {
      return 'Подразделение наставника проекта не найдено, выберите другого наставника, или обратитесь в службу поддержки';
    }
    if (!projectExpectedResultRef.value) {
      return 'Введите ожидаемый результат проекта';
    }
    if (!skillsToBeFormed.value) {
      return 'Введите формируемые в результате проекта навыки студентов';
    }
    if (!projectDescriptionRef.value) {
      return 'Введите описание проекта';
    }
    if (
      specialtiesOfMentorDepartmentComputed.value.length > 0 &&
      specialtyListRef.value.length === 0
    ) {
      return 'Выберите основные специальности участников проекта';
    }
    if (
      specialtiesOfMentorDepartmentComputed.value.length === 0 &&
      additionalSpecialtyListRef.value.length === 0
    ) {
      return 'Выберите приглашённые специальности участников проекта';
    }

    return undefined;
  }

  function collectProjectProposal(
    projectProposalState: ProjectProposalStateId,
  ): NewProjectProposal {
    const projectDate = calcProjectDate(projectDurationRef.value);

    const supervisors: ProjectProposalTeamMember[] = teamRef.value
      .filter((member) => member.memberData && member.role)
      .map((member) => ({
        supervisor_id: member.memberData!.id,
        role_ids: [member.role!],
      }));

    const specialities: ProjectProposalSpecialty[] = [
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
    ];

    const skillIds: number[] = skillListRef.value
      .filter((skill) => !skill.isNew)
      .map((skill) => skill.id);

    const newSkills: string[] = skillListRef.value
      .filter((skill) => skill.isNew)
      .map((skill) => skill.name);

    return {
      title: projectNameRef.value,
      goal: projectGoalRef.value,
      customer: projectCustomerRef.value,
      theme_source_id: projectThemeSourceIdRef.value ?? null,
      prev_project_id: prevProjectIdRef.value,
      difficulty: projectDifficultyRef.value,
      department_id: projectDepartmentComputed.value!.id,
      supervisors,
      product_result: projectExpectedResultRef.value,
      specialities,
      skill_ids: skillIds,
      new_skills: newSkills,
      date_start: projectDate.start,
      date_end: projectDate.end,
      description: projectDescriptionRef.value,
      state_id: projectProposalState,
      places: 0,
      type_id: ProjectTypeName.Applied,
      study_result: skillsToBeFormed.value,
      additional_inf: 'additional_inf',
      requirements: 'requirements',
    };
  }

  function sendProjectProposal(projectProposalState: ProjectProposalStateId) {
    const isDraft = projectProposalState === ProjectProposalStateId.Draft;
    const isRejectedToDraft =
      isDraft &&
      currentProjectProposalState.value === ProjectProposalStateId.Rejected;
    const errorMessage = validateProjectProposal();
    if (errorMessage) {
      toast(errorMessage);
      return;
    }

    const projectProposal = collectProjectProposal(projectProposalState);
    const id = currentProjectProposalComputed.value?.id;

    if (id) {
      updateProjectProposalMutation.mutate(
        { projectProposal, id },
        {
          onSuccess: isRejectedToDraft
            ? onSuccessUpdateRejectedToDraft
            : isDraft
            ? onSuccessUpdateDraft
            : onSuccessUpdateForReview,
          onError: onErrorSendProposal,
        },
      );
    } else {
      createProjectProposalMutation.mutate(projectProposal, {
        onSuccess: isDraft ? onSuccessCreateDraft : onSuccessCreateForReview,
        onError: onErrorSendProposal,
      });
    }
  }

  function projectDurationFromDate(isoDate: {
    start: string;
    end: string;
  }): ProjectDuration {
    const dateStart = DateTime.fromISO(isoDate.start);
    const dateEnd = DateTime.fromISO(isoDate.end);

    const startMonth = dateStart.month;
    const endMonth = dateEnd.month;

    if (startMonth === 9 && endMonth === 12)
      return ProjectDuration.FallSemester;
    if (startMonth === 2 && endMonth === 5)
      return ProjectDuration.SpringSemester;

    return ProjectDuration.FullYear;
  }

  function calcProjectDate(duration: ProjectDuration): {
    start: string;
    end: string;
  } {
    const currentYear = new Date(Date.now()).getFullYear();

    const fallStartDate = DateTime.fromObject({
      year: currentYear,
      month: 9,
      day: 1,
    });
    const fallEndDate = DateTime.fromObject({
      year: currentYear,
      month: 12,
      day: 30,
    });

    const springStartDate = DateTime.fromObject({
      year: currentYear + 1,
      month: 2,
      day: 1,
    });
    const springEndDate = DateTime.fromObject({
      year: currentYear + 1,
      month: 5,
      day: 30,
    });

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

  function fillFromProjectProposal(projectProposal: CreatedProjectProposal) {
    isNewProjectRef.value = !projectProposal.prevProjectId;
    projectNameRef.value = projectProposal.title;
    projectGoalRef.value = projectProposal.goal;
    projectCustomerRef.value = projectProposal.customer;
    projectThemeSourceIdRef.value = projectProposal.theme_source?.id || null;
    projectDifficultyRef.value = projectProposal.difficulty;
    projectExpectedResultRef.value = projectProposal.product_result;
    skillsToBeFormed.value = projectProposal.study_result;
    projectDescriptionRef.value = projectProposal.description;
    skillListRef.value = projectProposal.skills;
    projectDurationRef.value = projectDurationFromDate({
      start: projectProposal.date_start,
      end: projectProposal.date_end,
    });

    specialtyListRef.value = mapSpecialtyList(
      projectProposal.project_specialities,
      SpecialtyPriority.High,
    );

    additionalSpecialtyListRef.value = mapSpecialtyList(
      projectProposal.project_specialities,
      SpecialtyPriority.Low,
    );

    teamRef.value = mapProjectProposalTeam(
      projectProposal.supervisors,
      sharedRoleList,
      currentUserRoleList,
    );

    function mapSpecialtyList(
      projectSpecialities: SpecialtyGroup[],
      priority: SpecialtyPriority,
    ): SelectedSpecialty<number | string>[] {
      return projectSpecialities
        .filter((specialty) => specialty.priority === priority)
        .map((specialty) => ({
          course: specialty.course,
          id: specialty.id,
          name: specialtyFullName(specialty.speciality.name, specialty.course),
          specialty_id: specialty.speciality.id,
        }));
    }

    function mapProjectProposalTeam(
      supervisors: ProjectSupervisor[],
      sharedRoleList: MemberRole[],
      currentUserRoleList: MemberRole[],
    ): Required<TeamMember>[] {
      const projectProposalTeam: Required<TeamMember>[] = supervisors
        .filter(({ roles }) => {
          return (
            roles.filter((role) =>
              [...sharedRoleList, ...currentUserRoleList].includes(role.id),
            ).length > 0
          );
        })
        .map<Required<TeamMember>>(({ roles, supervisor }) => {
          // фильтруем только нужные роли
          let acceptedRoles = roles
            .map((role) => role.id)
            .filter((role) =>
              [...sharedRoleList, ...currentUserRoleList].includes(role),
            );

          // сортируем роли
          acceptedRoles = sortByRolePriority(
            acceptedRoles.map((role) => ({ role })),
          ).map((role) => role.role);

          return {
            role: acceptedRoles[0],
            isCurrentUser: Boolean(
              acceptedRoles.find((role) => role === MemberRole.Mentor),
            ),
            memberData: supervisor,
          };
        });

      // сортируем команду по ролям
      return sortByRolePriority(projectProposalTeam);
    }
  }

  function clearAllFields() {
    isNewProjectRef.value = false;
    projectNameRef.value = '';
    projectGoalRef.value = '';
    projectCustomerRef.value = '';
    projectThemeSourceIdRef.value = null;
    projectDifficultyRef.value = ProjectDifficulty.Low;
    projectExpectedResultRef.value = '';
    skillsToBeFormed.value = '';
    projectDescriptionRef.value = '';
    specialtyListRef.value = [];
    additionalSpecialtyListRef.value = [];
    skillListRef.value = [];
    projectDurationRef.value = ProjectDuration.FallSemester;
    teamRef.value = initTeam();
  }

  function onCreateDraft() {
    function agree() {
      modalsStore.openConfirmModal();
      sendProjectProposal(ProjectProposalStateId.Draft);
    }

    function disagree() {
      modalsStore.openConfirmModal();
    }

    modalsStore.openConfirmModal(
      'Сохранить черновик заявки?',
      'сохранить черновик',
      'отмена',
      agree,
      disagree,
    );
  }

  function onCreateUnderReview() {
    function agree() {
      modalsStore.openConfirmModal();
      sendProjectProposal(ProjectProposalStateId.UnderReview);
    }

    function disagree() {
      modalsStore.openConfirmModal();
    }

    modalsStore.openConfirmModal(
      'Подать заявку на проект?',
      'подать заявку',
      'отмена',
      agree,
      disagree,
    );
  }

  function onCancel() {
    function agree() {
      modalsStore.openConfirmModal();
      router.push({ name: RouteNames.PROJECT_PROPOSALS });
    }

    function disagree() {
      modalsStore.openConfirmModal();
    }

    modalsStore.openConfirmModal(
      'Последние введенные данные не сохранятся, перейти в личный кабинет?',
      'сбросить и выйти',
      'остаться',
      agree,
      disagree,
    );
  }

  function onSuccessCreateDraft(
    createdProjectProposal: CreatedProjectProposal,
  ) {
    router.push(toProjectCreateRoute(createdProjectProposal.id));

    const title = 'Черновик успешно сохранён, вернуться в личный кабинет?';
    const agreeButtonTitle = 'вернуться в личный кабинет';
    const disagreeButtonTitle = 'продолжить редактирование';

    function agree() {
      modalsStore.openConfirmModal();
      router.push({ name: RouteNames.PROJECT_PROPOSALS });
    }

    function disagree() {
      modalsStore.openConfirmModal();
    }

    modalsStore.openConfirmModal(
      title,
      agreeButtonTitle,
      disagreeButtonTitle,
      agree,
      disagree,
    );
  }

  function onSuccessCreateForReview() {
    clearAllFields();

    const title = 'Заявка успешно отправлена, вернуться в личный кабинет?';
    const agreeButtonTitle = 'вернуться в личный кабинет';
    const disagreeButtonTitle = 'создать новую заявку';

    function agree() {
      modalsStore.openConfirmModal();
      router.push({ name: RouteNames.PROJECT_PROPOSALS });
    }

    function disagree() {
      modalsStore.openConfirmModal();
    }

    modalsStore.openConfirmModal(
      title,
      agreeButtonTitle,
      disagreeButtonTitle,
      agree,
      disagree,
    );
  }

  function onSuccessUpdateDraft() {
    const title = 'Черновик успешно сохранён, вернуться в личный кабинет?';
    const agreeButtonTitle = 'вернуться в личный кабинет';
    const disagreeButtonTitle = 'продолжить редактирование';

    function agree() {
      modalsStore.openConfirmModal();
      router.push({ name: RouteNames.PROJECT_PROPOSALS });
    }

    function disagree() {
      modalsStore.openConfirmModal();
    }

    modalsStore.openConfirmModal(
      title,
      agreeButtonTitle,
      disagreeButtonTitle,
      agree,
      disagree,
    );
  }

  function onSuccessUpdateForReview() {
    const title = 'Заявка успешно отправлена, вернуться в личный кабинет?';
    const agreeButtonTitle = 'вернуться в личный кабинет';
    const disagreeButtonTitle = 'создать новую заявку';

    function agree() {
      modalsStore.openConfirmModal();
      router.push({ name: RouteNames.PROJECT_PROPOSALS });
    }

    function disagree() {
      modalsStore.openConfirmModal();
      router.push(toProjectCreateRoute());
    }

    modalsStore.openConfirmModal(
      title,
      agreeButtonTitle,
      disagreeButtonTitle,
      agree,
      disagree,
    );
  }

  function onSuccessUpdateRejectedToDraft(
    createdProjectProposal: CreatedProjectProposal,
  ) {
    router.push(toProjectCreateRoute(createdProjectProposal.id));
    modalsStore.openAlertModal(
      'Черновик создан',
      'Заявка сохранена как черновик, вы можете отредактировать заявку и отправить её ещё раз',
    );
  }

  function onErrorSendProposal(error: unknown) {
    toast('Ошибка отправки: ' + String(error), { type: TYPE.ERROR });
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

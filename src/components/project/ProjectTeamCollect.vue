<template>
  <ul :class="$style.list">
    <li
      v-for="(member, index) in multiselectTeamList"
      :key="member.memberId || index"
      :class="$style.member"
    >
      <ProjectRoleSelect
        v-model:member="member.memberId"
        v-model:role="member.role"
        :class="$style['member-select']"
        :role-list="
          member.isCurrentUser && multiselectCurrentUserRoleList
            ? multiselectCurrentUserRoleList
            : multiselectRoleList
        "
        :member-list="filterSameSupervisors(member.memberId)"
        :disable-member-select="props.disableAll || member.isCurrentUser"
        :disable-role-select="props.disableAll"
      />
      <DeleteButton
        v-if="!member.isCurrentUser"
        :class="$style['member-delete-button']"
        @click="() => onDeleteMember(member)"
      />
    </li>
  </ul>
  <BaseButton
    v-if="!isMaxTeamMembers"
    :class="$style['add-member-button']"
    case="uppercase"
    variant="outlined"
    @click="onAddMember"
  >
    + добавить роль
  </BaseButton>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import ProjectRoleSelect from './ProjectRoleSelect.vue';
  import { Supervisor } from '@/models/Supervisor';
  import { MultiselectObjectItem } from '@/models/VMultiselect';
  import { MemberRole, MemberRoleText } from '@/models/ProjectApplication';
  import BaseButton from '../ui/BaseButton.vue';
  import DeleteButton from '../ui/DeleteButton.vue';

  export type TeamMember = {
    memberData?: Supervisor;
    role?: MemberRole;
    isCurrentUser?: boolean;
  };

  type MultiselectTeamMember = {
    memberId?: number;
    role?: MemberRole;
    isCurrentUser?: boolean;
  };

  type Props = {
    supervisorList: Supervisor[];
    roleList: MemberRole[];
    currentUserRoleList?: MemberRole[];
    team: TeamMember[];
    maxTeamMembers?: number;
    disableAll?: boolean;
  };
  type Emits = {
    (event: 'update:team', team: TeamMember[]): void;
  };

  const props = withDefaults(defineProps<Props>(), {
    maxTeamMembers: undefined,
    disableAll: false,
    currentUserRoleList: undefined,
  });
  const emit = defineEmits<Emits>();

  const multiselectTeamList = ref<MultiselectTeamMember[]>(
    props.team.map((member) => ({
      memberId: member.memberData?.id,
      role: member.role,
      isCurrentUser: member.isCurrentUser,
    })),
  );

  const multiselectSupervisorList = computed<MultiselectObjectItem<number>[]>(
    () =>
      props.supervisorList.map((supervisor) => ({
        label: supervisor.fio,
        value: supervisor.id,
      })),
  );

  const multiselectRoleList = computed<MultiselectObjectItem<MemberRole>[]>(
    () => memberRoleListToMultiselectObjectList(props.roleList),
  );

  const multiselectCurrentUserRoleList = computed<
    MultiselectObjectItem<MemberRole>[]
  >(() => memberRoleListToMultiselectObjectList(props.currentUserRoleList));

  const isMaxTeamMembers = computed(
    () =>
      typeof props.maxTeamMembers === 'number' &&
      props.team.length >= props.maxTeamMembers,
  );

  // если обновляется multiselectTeamList, преобразовывает multiselectTeamList и обновляет props.team
  watch(
    () => multiselectTeamList.value,
    (teamList) => {
      emit(
        'update:team',
        teamList.map(({ isCurrentUser, memberId, role }) => ({
          isCurrentUser,
          role,
          memberData: props.supervisorList.find(
            (supervisor) => supervisor.id === memberId,
          ),
        })),
      );
    },
    { deep: true },
  );

  // для каждого нового сотрудника фильтрует список сотрудников в выпадающем списке
  // так, чтобы в нём не было других сотрудников, кроме него самого
  function filterSameSupervisors(
    currentMemberId?: number,
  ): MultiselectObjectItem<number>[] {
    return multiselectSupervisorList.value.filter((supervisor) => {
      const supervisorInTeam = Boolean(
        multiselectTeamList.value.find(
          (item) => item.memberId === supervisor.value,
        ),
      );

      const isCurrentUser = supervisor.value === currentMemberId;

      return !supervisorInTeam || isCurrentUser;
    });
  }

  function memberRoleListToMultiselectObjectList(
    roleList: MemberRole[],
  ): MultiselectObjectItem<MemberRole>[] {
    return roleList.map((role) => ({
      value: role,
      label: MemberRoleText[role],
    }));
  }

  function onAddMember() {
    // если есть пустое поле сотрудника
    if (multiselectTeamList.value.find((member) => !member.memberId)) return;

    // если есть maxTeamMembers, и кол-во человек в команде превышает допустимый предел
    if (isMaxTeamMembers.value) return;

    multiselectTeamList.value = [
      ...multiselectTeamList.value,
      { memberId: undefined, role: undefined },
    ];
  }

  function onDeleteMember(deletedMember: MultiselectTeamMember) {
    multiselectTeamList.value = multiselectTeamList.value.filter(
      (member) => member.memberId !== deletedMember.memberId,
    );
  }
</script>

<style module lang="scss">
  .list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: none;
  }

  .member {
    display: flex;
    gap: 0.3125rem;
    align-items: center;
  }

  .member-select {
    flex: 1;
    max-width: 90%;
  }

  .add-member-button {
    margin-top: 0.5rem;
  }

  .member-delete-button {
    width: 3.75rem;
  }
</style>
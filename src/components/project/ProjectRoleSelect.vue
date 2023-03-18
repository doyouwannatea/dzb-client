<template>
  <div class="wrapper">
    <VMultiselect
      v-model="mutableMember"
      class="multiselect"
      placeholder="Выберите сотрудника"
      no-results-text="Сотрудник не найден"
      no-options-text="Сотрудники не найдены"
      :searchable="true"
      :options="props.memberList"
      :disabled="props.disableMemberSelect"
      @change="(payload: unknown) => onMemberChange(payload as Member)"
    />
    <div class="arrow-icon" v-html="arrowIcon"></div>
    <VMultiselect
      v-model="mutableRole"
      class="multiselect"
      placeholder="Выберите роль сотрудника"
      no-results-text="Роль не найдена"
      no-options-text="Роли не найдены"
      :searchable="true"
      :options="props.roleList"
      :disabled="props.disableRoleSelect"
      @change="(payload: unknown) => onRoleChange(payload as Role)"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import VMultiselect from '@vueform/multiselect';
  import { MemberRole } from '@/models/ProjectApplication';
  import arrowIcon from '@/assets/icons/user-role-select-arrow.svg?raw';
  import { MultiselectObjectItem } from '@/models/VMultiselect';

  type Role = MemberRole;
  type Member = number;

  type Props = {
    member?: Member;
    role?: Role;
    memberList: MultiselectObjectItem<Member>[];
    roleList: MultiselectObjectItem<Role>[];
    disableMemberSelect?: boolean;
    disableRoleSelect?: boolean;
  };
  type Emits = {
    (event: 'update:member', member?: Member): void;
    (event: 'update:role', role?: Role): void;
  };

  const props = withDefaults(defineProps<Props>(), {
    member: undefined,
    role: undefined,
    disableMemberSelect: false,
    disableRoleSelect: false,
  });
  const emit = defineEmits<Emits>();
  const mutableMember = ref(props.member);
  const mutableRole = ref(props.role);

  function onMemberChange(member: Member) {
    emit('update:member', member);
  }
  function onRoleChange(role: Role) {
    emit('update:role', role);
  }
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    justify-content: space-between;

    & > *:first-child {
      flex: 4;
    }

    & > *:last-child {
      flex: 3;
    }
  }

  .arrow-icon {
    min-width: 1.5rem;
  }
</style>

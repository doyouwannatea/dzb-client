<template>
  <div class="wrapper">
    <BaseLabel
      is="div"
      :label="props.memberSelectOptions.label"
      :disabled="props.memberSelectOptions.labelDisabled"
    >
      <VMultiselect
        v-model="mutableMember"
        class="multiselect"
        placeholder="Выберите сотрудника"
        no-results-text="Сотрудник не найден"
        no-options-text="Сотрудники не найдены"
        :caret="props.memberList.length > 1"
        :searchable="true"
        :options="props.memberList"
        :disabled="
          props.memberSelectOptions.selectDisabled ||
          props.memberList.length < 2
        "
        @change="(payload: unknown) => onMemberChange(payload as Member)"
      />
    </BaseLabel>
    <div class="arrow-icon" v-html="arrowIcon"></div>
    <BaseLabel
      is="div"
      :label="props.roleSelectOptions.label"
      :disabled="props.roleSelectOptions.labelDisabled"
    >
      <VMultiselect
        v-model="mutableRole"
        class="multiselect"
        placeholder="Выберите роль сотрудника"
        no-results-text="Роль не найдена"
        no-options-text="Роли не найдены"
        :caret="props.roleList.length > 1"
        :searchable="true"
        :options="props.roleList"
        :disabled="
          props.roleSelectOptions.selectDisabled || props.roleList.length < 2
        "
        @change="(payload: unknown) => onRoleChange(payload as Role)"
      />
    </BaseLabel>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import VMultiselect from '@vueform/multiselect';
  import { MemberRole } from '@/models/ProjectApplication';
  import arrowIcon from '@/assets/icons/user-role-select-arrow.svg?raw';
  import { MultiselectObjectItem } from '@/models/VMultiselect';
  import BaseLabel from '../ui/label/BaseLabel.vue';

  export type SelectOptions = {
    labelDisabled?: boolean;
    selectDisabled?: boolean;
    label?: string;
  };

  type Role = MemberRole;
  type Member = number;

  type Props = {
    member?: Member;
    role?: Role;
    memberList: MultiselectObjectItem<Member>[];
    roleList: MultiselectObjectItem<Role>[];
    memberSelectOptions?: SelectOptions;
    roleSelectOptions?: SelectOptions;
  };
  type Emits = {
    (event: 'update:member', member?: Member): void;
    (event: 'update:role', role?: Role): void;
  };

  const props = withDefaults(defineProps<Props>(), {
    member: undefined,
    role: undefined,
    memberSelectOptions: () => ({}),
    roleSelectOptions: () => ({}),
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
    align-items: flex-end;
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
    margin-bottom: 1.3rem;
  }
</style>

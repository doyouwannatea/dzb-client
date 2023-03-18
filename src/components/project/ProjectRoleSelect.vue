<template>
  <div class="wrapper">
    <VMultiselect
      v-model="mutableMember"
      class="multiselect"
      placeholder="Выберите сотрудника"
      no-results-text="Сотрудник не найден"
      :searchable="true"
      :options="props.memberList"
      @change="(payload: unknown) => onMemberChange(payload as Member)"
    />
    <div class="arrow-icon" v-html="arrowIcon"></div>
    <VMultiselect
      v-model="mutableRole"
      class="multiselect"
      placeholder="Выберите роль сотрудника"
      no-results-text="Роль не найдена"
      :searchable="true"
      :options="props.roleList"
      @change="(payload: unknown) => onRoleChange(payload as Role)"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import VMultiselect from '@vueform/multiselect';
  import { Supervisor } from '@/models/Supervisor';
  import arrowIcon from '@/assets/icons/user-role-select-arrow.svg?raw';
  import { MultiselectObjectItem } from '@/models/VMultiselect';

  type Role = number | undefined;
  type Member = Supervisor | undefined;

  type Props = {
    member: Member;
    role: Role;
    memberList: MultiselectObjectItem<Required<Member>>[];
    roleList: MultiselectObjectItem<Required<Role>>[];
  };
  type Emits = {
    (event: 'update:member', member?: Member): void;
    (event: 'update:role', role?: Role): void;
  };

  const props = withDefaults(defineProps<Props>(), {
    member: undefined,
    role: undefined,
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
  }

  .arrow-icon {
    min-width: 1.5rem;
  }
</style>

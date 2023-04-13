<template>
  <BaseModal size="m" :is-show="props.isShow" @close="onCloseModal">
    <!-- HEADER -->
    <template #header>
      <slot name="title">
        <h1>Редактирование специальностей</h1>
      </slot>
      <BaseLabel
        is="div"
        label="Выбранные специальности"
        :class="$style['main-tag-list']"
      >
        <TagList
          v-if="specialtyListRef.length > 0"
          :tag-list="specialtyListRef"
          show-all
          deletable
          @delete="onDeleteSpecialty"
        >
          <template #after-list>
            <BaseButton
              variant="tag-outlined"
              color="red"
              case="lowercase"
              @click="onClear"
            >
              очистить специальности
            </BaseButton>
          </template>
        </TagList>
        <ClickableGroupedListLabel v-else>
          Специальности не выбраны
        </ClickableGroupedListLabel>
      </BaseLabel>
    </template>
    <!-- HEADER -->

    <!-- MAIN CONTENT -->
    <div :class="$style.content">
      <div v-if="!hideDepartmentList" :class="$style.col">
        <p :class="$style['col-title']">Добавить группу специальностей</p>
        <ScrollablePanel>
          <template #header>
            <BaseInput
              v-model="searchSpecialtiesGroupValueRef"
              :icon="searchIconUrl"
              placeholder="Поиск по кафедрам"
            />
            <ClickableGroupedListLabel
              is="div"
              :class="$style['specialty-group-label']"
            >
              кафедры
            </ClickableGroupedListLabel>
          </template>
          <template #default>
            <ClickableGroupedList
              :grouped-list="[
                {
                  id: 1,
                  list: filteredSpecialtiesGroupListComputed,
                },
              ]"
              @item-click="(payload) => onAddGroupOfSpecialties(payload as number, 'department')"
            />
          </template>
        </ScrollablePanel>
      </div>

      <div :class="$style.col">
        <p v-if="!hideDepartmentList" :class="$style['col-title']">
          Добавить отдельные специальности
        </p>
        <ScrollablePanel>
          <template #header>
            <BaseInput
              v-model="searchSpecialtyValueRef"
              :icon="searchIconUrl"
              placeholder="Поиск по специальностям"
            />
          </template>
          <template #default>
            <ClickableGroupedList
              :cols="
                hideDepartmentList ? filteredSpecialtyListComputed.length : 1
              "
              :grouped-list="filteredSpecialtyListComputed"
              @item-click="(payload) => onAddSpecialty(payload as SpecialtyListItem)"
            />
          </template>
        </ScrollablePanel>
      </div>
    </div>
    <!-- MAIN CONTENT -->

    <!-- ACTIONS -->
    <div :class="$style.actions">
      <BaseButton @click="onSave">сохранить и выйти</BaseButton>
    </div>
    <!-- ACTIONS -->
  </BaseModal>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { uniqBy } from 'lodash';
  import searchIconUrl from '@/assets/icons/search.svg?url';
  import {
    SelectedSpecialty,
    Specialty,
    SpecialtyCourse,
    SpecialtyName,
  } from '@/models/Specialty';
  import { Tag } from '@/models/Tag';
  import { stringIncludes } from '@/helpers/string';
  import { specialtyFullName } from '@/helpers/specialty';

  // components
  import BaseModal from '../ui/BaseModal.vue';
  import BaseButton from '../ui/BaseButton.vue';
  import TagList from '../ui/TagList.vue';
  import BaseInput from '../ui/BaseInput.vue';
  import ScrollablePanel from '../ui/ScrollablePanel.vue';
  import ClickableGroupedList, {
    GroupedList,
    ListItem,
  } from '../ui/clickable-grouped-list/ClickableGroupedList.vue';
  import ClickableGroupedListLabel from '../ui/clickable-grouped-list/ClickableGroupedListLabel.vue';
  import BaseLabel from '../ui/label/BaseLabel.vue';

  type SpecialtyListItem = {
    course: SpecialtyCourse;
  } & Pick<Specialty, 'department' | 'institute' | 'id'>;

  type SpecialtyGroupName = keyof Pick<
    SpecialtyListItem,
    'department' | 'institute'
  >;

  type Props = {
    isShow: boolean;
    specialtyList: SelectedSpecialty<number | string>[];
    sharedSpecialtyList: Specialty[];
    requiredСourses?: SpecialtyCourse[];
  };
  type Emits = {
    (event: 'update:isShow', isShow: boolean): void;
    (
      event: 'update:specialtyList',
      specialtyList: SelectedSpecialty<number | string>[],
    ): void;
  };

  const props = withDefaults(defineProps<Props>(), {
    requiredСourses: () => [
      SpecialtyCourse.Third,
      SpecialtyCourse.Fourth,
      SpecialtyCourse.Fifth,
    ],
  });
  const emit = defineEmits<Emits>();

  const searchSpecialtiesGroupValueRef = ref<string>('');
  const searchSpecialtyValueRef = ref<string>('');

  const specialtyListRef = ref<SelectedSpecialty<number | string>[]>([]);

  const departmentListComputed = computed<ListItem<number | string>[]>(() =>
    uniqBy(
      props.sharedSpecialtyList
        .filter((specialty) => specialty.department)
        .map((specialty) => ({
          id: specialty.department!.id,
          label: specialty.department!.name,
          selected: false,
          value: specialty.department!.id,
        })),
      (department) => department.id,
    ),
  );

  const hideDepartmentList = computed(
    () => departmentListComputed.value.length === 0,
  );

  const groupedSpecialtyListComputed = computed<
    GroupedList<SpecialtyListItem>[]
  >(() => {
    const groupedList: GroupedList<SpecialtyListItem>[] =
      props.requiredСourses.map((course) => ({
        id: course,
        list: [],
        groupLabel: SpecialtyName[course],
      }));

    for (const specialty of props.sharedSpecialtyList) {
      for (const course of props.requiredСourses) {
        // специальности включающие в себя «б» не имеют специалитета
        if (specialty.name.includes('б') && course === SpecialtyCourse.Fifth)
          continue;
        const groupIndex = groupedList.findIndex(
          (group) => group.id === course,
        );

        groupedList[groupIndex].list.push({
          id: String(specialty.id) + String(course),
          label: specialtyFullName(specialty.name, course),
          selected: Boolean(
            specialtyListRef.value.find(
              (userSpecialty) =>
                userSpecialty.course === course &&
                userSpecialty.specialty_id === specialty.id,
            ),
          ),
          value: {
            course,
            id: specialty.id,
            department: specialty.department,
            institute: specialty.institute,
          },
        });
      }
    }

    return groupedList;
  });

  const filteredSpecialtiesGroupListComputed = computed<
    ListItem<number | string>[]
  >(() =>
    departmentListComputed.value.filter((department) =>
      stringIncludes(department.label, searchSpecialtiesGroupValueRef.value),
    ),
  );

  const filteredSpecialtyListComputed = computed<
    GroupedList<SpecialtyListItem>[]
  >(() =>
    groupedSpecialtyListComputed.value.map((group) => ({
      ...group,
      list: group.list.filter((specialty) =>
        stringIncludes(specialty.label, searchSpecialtyValueRef.value),
      ),
    })),
  );

  // обнуление данных после закрытия / открытия модального окна
  watch(
    () => props.isShow,
    () => {
      searchSpecialtiesGroupValueRef.value = '';
      searchSpecialtyValueRef.value = '';
      specialtyListRef.value = props.specialtyList;
    },
    { immediate: true },
  );

  function addSpecialty(
    specialtyList: SelectedSpecialty<number | string>[],
    newSpecialty: SpecialtyListItem,
  ): SelectedSpecialty<number | string>[] {
    // поиск группы курса
    const groupIndex = groupedSpecialtyListComputed.value.findIndex(
      (group) => group.id === newSpecialty.course,
    );
    if (groupIndex === -1) return specialtyList;

    // поиск специальности в группе
    const specialty = groupedSpecialtyListComputed.value[groupIndex].list.find(
      (specialty) =>
        specialty.value?.course === newSpecialty.course &&
        specialty.value.id === newSpecialty.id,
    );
    if (!specialty?.value) return specialtyList;

    // если у пользователя уже есть такая специальность, то не добавляем её
    const userHasSpecialty = specialtyList.find(
      (userSpecialty) =>
        userSpecialty.course === specialty.value?.course &&
        userSpecialty.specialty_id === specialty.value.id,
    );
    if (userHasSpecialty) return specialtyList;

    return [
      ...specialtyList,
      {
        id: specialty.id,
        course: specialty.value.course,
        name: specialty.label,
        specialty_id: specialty.value.id,
      },
    ];
  }

  function onDeleteSpecialty(tag: Tag<number | string>) {
    const specialtyIndex = specialtyListRef.value.findIndex(
      (specialty) => specialty.id === tag.id,
    );

    specialtyListRef.value = [
      ...specialtyListRef.value.slice(0, specialtyIndex),
      ...specialtyListRef.value.slice(specialtyIndex + 1),
    ];
  }

  function onAddSpecialty(newSpecialty: SpecialtyListItem) {
    const list = addSpecialty(specialtyListRef.value, newSpecialty);
    specialtyListRef.value = list;
  }

  function onAddGroupOfSpecialties(groupId: number, idOf: SpecialtyGroupName) {
    let specialtyList = specialtyListRef.value;
    for (const group of groupedSpecialtyListComputed.value) {
      for (const specialty of group.list) {
        if (specialty.value?.[idOf]?.id === groupId) {
          specialtyList = addSpecialty(specialtyList, specialty.value);
        }
      }
    }
    specialtyListRef.value = specialtyList;
  }

  function onCloseModal() {
    emit('update:isShow', false);
  }

  function onSave() {
    emit('update:specialtyList', specialtyListRef.value);
    onCloseModal();
  }

  function onClear() {
    specialtyListRef.value = [];
  }
</script>

<style module lang="scss">
  .actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2.75rem;
  }

  .specialty-group-label {
    margin-top: 0.8rem;
  }

  .col-title {
    min-height: 3em;
    margin-bottom: 0.625rem;
    font-size: 1.25rem !important;
  }

  .col {
    flex: 1;
  }

  .content {
    display: flex;
    gap: 0.3125rem;
  }

  .main-tag-list {
    margin-top: 2.5rem;
  }
</style>

<template>
  <BaseModal size="m" :is-show="props.isShow" @close="onCloseModal">
    <!-- HEADER -->
    <template #header>
      <BaseTooltip
        position="bottom"
        message="Написать рекомендации по выбору навыков"
      >
        <h1>Редактирование навыков</h1>
      </BaseTooltip>
      <SkillList
        :class="$style['main-skill-list']"
        :skills="skillListRef"
        show-all
        deletable
        @delete="onDeleteSkill"
      />
    </template>
    <!-- HEADER -->

    <!-- MAIN CONTENT -->
    <div :class="$style.content">
      <div :class="$style.col">
        <p :class="$style['col-title']">Выберите навыки из списка</p>
        <ScrollablePanel>
          <template #header>
            <BaseInput
              v-model="searchValue"
              :icon="searchIconUrl"
              placeholder="Поиск по навыкам"
            />
          </template>
          <template #default>
            <ClickableGroupedList
              :grouped-list="[
                {
                  id: 1,
                  list: filteredSharedSkillList,
                  groupLabel:
                    filteredSharedSkillList.length === 0
                      ? 'Навыки не найдены'
                      : undefined,
                },
              ]"
              @item-click="(payload) => onAddSkillFromList(payload as number)"
            />
          </template>
        </ScrollablePanel>
      </div>

      <div :class="$style.col">
        <p :class="$style['col-title']">
          Добавьте свои навыки, если не нашли их в списке
        </p>
        <ScrollablePanel>
          <template #header>
            <form @submit.prevent="onCreateSkill">
              <BaseLabel label="Название навыка">
                <BaseTextarea
                  v-model="newSkillName"
                  :class="$style.textarea"
                  maxlength="100"
                  placeholder="Например, Теория вероятностей"
                />
              </BaseLabel>

              <BaseButton
                type="submit"
                :class="$style['add-skill-button']"
                variant="outlined"
              >
                Добавить навык
              </BaseButton>
            </form>

            <BaseLabel
              is="div"
              v-if="props.prevAddedSkillList.length > 0"
              label="Ранее добавленные вами навыки:"
            />
          </template>
          <template #default>
            <SkillList
              v-if="props.prevAddedSkillList.length > 0"
              :skills="props.prevAddedSkillList"
              tag-variant="outlined"
              show-all
            />
          </template>
        </ScrollablePanel>
      </div>
    </div>
    <!-- MAIN CONTENT -->

    <!-- ACTIONS -->
    <div :class="$style.actions">
      <BaseButton case="uppercase" @click="onSave">сохранить</BaseButton>
    </div>
    <!-- ACTIONS -->
  </BaseModal>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import searchIconUrl from '@/assets/icons/search.svg?url';
  import { Tag } from '@/models/Project';

  // components
  import BaseModal from '../ui/BaseModal.vue';
  import BaseButton from '../ui/BaseButton.vue';
  import SkillList from './SkillList.vue';
  import BaseInput from '../ui/BaseInput.vue';
  import ScrollablePanel from '../ui/ScrollablePanel.vue';
  import BaseLabel from '../ui/BaseLabel.vue';
  import BaseTextarea from '../ui/BaseTextarea.vue';
  import BaseTooltip from '../ui/BaseTooltip.vue';
  import ClickableGroupedList, {
    ListItem,
  } from '../ui/ClickableGroupedList.vue';
  import { getRandomIntInclusive } from '@/helpers/number';

  type Props = {
    isShow: boolean;
    skillList: Tag[];
    sharedSkillList: Tag[];
    prevAddedSkillList?: Tag[];
  };
  type Emits = {
    (event: 'update:isShow', isShow: boolean): void;
    (event: 'update:skillList', skillList: Tag[]): void;
  };

  const props = withDefaults(defineProps<Props>(), {
    prevAddedSkillList: () => [],
  });
  const emit = defineEmits<Emits>();

  const searchValue = ref<string>('');
  const newSkillName = ref<string>('');

  const skillListRef = ref<Tag[]>([]);
  const sharedSkillListRef = computed<ListItem<number>[]>(() =>
    props.sharedSkillList.map((skill) => ({
      id: skill.id,
      label: skill.name,
      selected: Boolean(
        skillListRef.value.find((userSkill) => userSkill.id === skill.id),
      ),
      value: skill.id,
    })),
  );
  const filteredSharedSkillList = computed(() =>
    sharedSkillListRef.value.filter((skill) =>
      skill.label
        .trim()
        .toLowerCase()
        .includes(searchValue.value.trim().toLowerCase()),
    ),
  );

  // обнуление данных после закрытия / открытия модального окна
  watch(
    () => props.isShow,
    () => {
      searchValue.value = '';
      newSkillName.value = '';
      skillListRef.value = props.skillList;
    },
    { immediate: true },
  );

  function onDeleteSkill(userSkill: Tag) {
    const skillIndex = skillListRef.value.findIndex(
      (skill) => skill.id === userSkill.id,
    );
    skillListRef.value = [
      ...skillListRef.value.slice(0, skillIndex),
      ...skillListRef.value.slice(skillIndex + 1),
    ];
  }

  function onAddSkillFromList(skillId: number) {
    const skillIndex = sharedSkillListRef.value.findIndex(
      (skill) => skill.id === skillId,
    );
    skillListRef.value = [
      ...skillListRef.value,
      props.sharedSkillList[skillIndex],
    ];
  }

  function onCreateSkill() {
    const skillName = newSkillName.value.trim();

    // если пустая строка
    if (skillName === '') return;

    // если у пользователя уже есть такой навык
    const userSkill = skillListRef.value.find(
      (skill) => skill.name.trim().toLowerCase() === skillName.toLowerCase(),
    );

    if (userSkill) return;

    newSkillName.value = '';

    // если в списке навыков уже есть такой навык
    const skillFromList = sharedSkillListRef.value.find(
      (skill) => skill.label.toLowerCase().trim() === skillName.toLowerCase(),
    );
    if (skillFromList) {
      onAddSkillFromList(skillFromList.id);
      return;
    }

    const leftBorder = props.sharedSkillList.length + skillListRef.value.length;
    const rightBorder = leftBorder + 100000;
    skillListRef.value = [
      ...skillListRef.value,
      {
        id: getRandomIntInclusive(leftBorder, rightBorder),
        name: skillName,
        skillCategory_id: -1,
      },
    ];
  }

  function onCloseModal() {
    emit('update:isShow', false);
  }

  function onSave() {
    emit('update:skillList', skillListRef.value);
    onCloseModal();
  }
</script>

<style module lang="scss">
  .actions {
    display: flex;
    justify-content: center;
    margin-top: 2.75rem;
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

  .add-skill-button {
    display: block !important;
    margin-top: 0.75rem;
    margin-bottom: 1.4375rem;
    margin-left: auto;
  }

  .main-skill-list {
    margin-top: 2.5rem;
  }

  .textarea {
    min-height: 8.375rem;
  }
</style>

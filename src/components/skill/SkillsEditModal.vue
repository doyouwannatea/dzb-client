<template>
  <BaseModal size="m" :is-show="props.isShow" @close="onCloseModal">
    <!-- HEADER -->
    <template #header>
      <BaseTooltip
        position-y="bottom"
        :position-x="isSmallDevice ? 'left' : 'right'"
      >
        <template #message>
          <b>Для чего нужны навыки?</b>
          <br />
          Навыки необходимы студентам, так как они помогают лучше понять суть
          проекта и их роль в нем.
          <br />
          <b>Рекомендации:</b>
          <ol>
            <li>
              При добавлении нового навыка важно выбирать короткое название,
              которое можно выразить несколькими словами. Если суть навыка не
              удаётся выразить в 100 символах, его можно разделить на несколько
              более мелких навыков.
            </li>
            <li>
              Перед добавлением своего навыка стоит проверить, нет ли уже
              похожего навыка в списке доступных навыков, чтобы избежать
              дублирования.
            </li>
          </ol>
        </template>
        <template #default>
          <slot name="title">
            <h1>Редактирование навыков</h1>
          </slot>
        </template>
      </BaseTooltip>

      <BaseLabel
        is="div"
        label="Выбранные навыки"
        :class="$style['main-skill-list']"
      >
        <TagList
          v-if="skillListRef.length > 0"
          :tag-list="skillListRef"
          show-all
          deletable
          @delete="onDeleteSkill"
        >
          <template #after-list>
            <BaseButton
              variant="tag-outlined"
              color="red"
              case="lowercase"
              @click="onClear"
            >
              очистить навыки
            </BaseButton>
          </template>
        </TagList>
        <ClickableGroupedListLabel v-else>
          Навыки не выбраны
        </ClickableGroupedListLabel>
      </BaseLabel>
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
            <TagList
              v-if="props.prevAddedSkillList.length > 0"
              :tag-list="props.prevAddedSkillList"
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
      <BaseButton @click="onSave">сохранить и выйти</BaseButton>
    </div>
    <!-- ACTIONS -->
  </BaseModal>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { useSmallDevice } from '@/hooks/useBreakpoints';
  import { stringIncludes, stringsAreEqual } from '@/helpers/string';
  import { Skill } from '@/models/Project';
  import { Tag } from '@/models/Tag';
  import searchIconUrl from '@/assets/icons/search.svg?url';
  import BaseButton from '../ui/BaseButton.vue';
  import BaseInput from '../ui/BaseInput.vue';
  import BaseModal from '../ui/BaseModal.vue';
  import BaseTextarea from '../ui/BaseTextarea.vue';
  import BaseTooltip from '../ui/BaseTooltip.vue';
  import ScrollablePanel from '../ui/ScrollablePanel.vue';
  import TagList from '../ui/TagList.vue';
  import ClickableGroupedList, {
    ListItem,
  } from '../ui/clickable-grouped-list/ClickableGroupedList.vue';
  import ClickableGroupedListLabel from '../ui/clickable-grouped-list/ClickableGroupedListLabel.vue';
  import BaseLabel from '../ui/label/BaseLabel.vue';

  export type EditedSkill = Skill & { isNew?: boolean };

  type Props = {
    isShow: boolean;
    skillList: EditedSkill[];
    sharedSkillList: Skill[];
    prevAddedSkillList?: Skill[];
  };
  type Emits = {
    (event: 'update:isShow', isShow: boolean): void;
    (event: 'update:skillList', skillList: EditedSkill[]): void;
  };

  const props = withDefaults(defineProps<Props>(), {
    prevAddedSkillList: () => [],
  });
  const emit = defineEmits<Emits>();
  const isSmallDevice = useSmallDevice();

  const searchValue = ref<string>('');
  const newSkillName = ref<string>('');

  const skillListRef = ref<EditedSkill[]>([]);
  const sharedSkillListRef = computed<ListItem<number | string>[]>(() =>
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
      stringIncludes(skill.label, searchValue.value),
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

  function onDeleteSkill(userSkill: Tag<number | string>) {
    const skillIndex = skillListRef.value.findIndex(
      (skill) => skill.id === userSkill.id,
    );
    skillListRef.value = [
      ...skillListRef.value.slice(0, skillIndex),
      ...skillListRef.value.slice(skillIndex + 1),
    ];
  }

  function onAddSkillFromList(skillId: number | string) {
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
    const userSkill = skillListRef.value.find((skill) =>
      stringsAreEqual(skill.name, skillName),
    );

    if (userSkill) return;

    newSkillName.value = '';

    // если в списке навыков уже есть такой навык
    const skillFromList = sharedSkillListRef.value.find((skill) =>
      stringsAreEqual(skill.label, skillName),
    );
    if (skillFromList) {
      onAddSkillFromList(skillFromList.id);
      return;
    }

    const id =
      Math.max(
        ...props.sharedSkillList.map((skill) => skill.id),
        ...skillListRef.value.map((skill) => skill.id),
      ) + 1;
    skillListRef.value = [
      ...skillListRef.value,
      {
        id: id,
        name: skillName,
        isNew: true,
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

  function onClear() {
    skillListRef.value = [];
  }
</script>

<style module lang="scss">
  .actions {
    display: flex;
    gap: 1rem;
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

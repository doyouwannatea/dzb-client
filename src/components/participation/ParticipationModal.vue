<template>
  <!-- project participation modal -->
  <BaseModal
    size="m"
    :is-show="modalsStore.participationModal"
    @close="onCloseModal"
  >
    <!-- HEADER -->
    <template #header>
      <h1 class="title">Подача заявки на проект</h1>
      <h2>{{ projectsStore.openedProject?.title }}</h2>
      <h3 v-if="authStore.loading">loading...</h3>
      <h3 v-if="authStore.error">{{ authStore.error }}</h3>
    </template>
    <!-- HEADER -->

    <!-- MAIN CONTENT -->
    <div class="body-grid">
      <!-- fio -->
      <fieldset class="input-group">
        <label class="input-label" for="fio">ФИО</label>
        <BaseInput
          id="fio"
          :value="authStore.profileData?.fio"
          class="input"
          disabled
          :icon="authStore.profileData?.fio ? checkedIconUrl : errorIconUrl"
        />
      </fieldset>
      <!-- fio -->

      <!-- mail -->
      <fieldset class="input-group">
        <label class="input-label" for="mail">E-mail</label>
        <BaseInput
          id="mail"
          :value="authStore.profileData?.email"
          class="input"
          disabled
          :icon="authStore.profileData?.email ? checkedIconUrl : errorIconUrl"
        />
      </fieldset>
      <!-- mail -->

      <!-- study group -->
      <fieldset class="input-group">
        <label class="input-label" for="study-group">Учебная группа</label>
        <BaseInput
          id="study-group"
          :value="authStore.profileData?.training_group"
          class="input"
          disabled
          :icon="
            authStore.profileData?.training_group
              ? checkedIconUrl
              : errorIconUrl
          "
        />
      </fieldset>
      <!-- study group -->

      <!-- phone number -->
      <fieldset class="input-group">
        <label class="input-label" for="phone-number">Номер телефона</label>
        <BaseInput
          id="phone-number"
          :value="authStore.profileData?.phone"
          class="input"
          disabled
          :icon="authStore.profileData?.phone ? checkedIconUrl : errorIconUrl"
        />
      </fieldset>
      <!-- phone number -->
    </div>
    <!-- MAIN CONTENT -->

    <!-- ACTIONS -->
    <template #actions>
      <BaseTooltip :message="priorityTooltipMsg">
        <span class="input-label subtitle">Приоритетность проекта</span>
      </BaseTooltip>
      <div class="actions-grid">
        <div>
          <!-- 1 (HIGH) -->
          <BaseRadioButton
            v-model="priorityValue"
            class="radio-label"
            :value="Priority.High"
            :disabled="highSelected"
          >
            {{ Priority.High }}
            ({{ PriorityText[Priority.High] }} приоритет)
            <template v-if="highSelected">
              <br />
              *уже выбран на другой проект
            </template>
          </BaseRadioButton>
          <!-- 1 (HIGH) -->

          <!-- 2 (MEDIUM) -->
          <BaseRadioButton
            v-model="priorityValue"
            class="radio-label"
            :value="Priority.Medium"
            :disabled="mediumSelected"
          >
            {{ Priority.Medium }}
            ({{ PriorityText[Priority.Medium] }} приоритет)
            <template v-if="mediumSelected">
              <br />
              *уже выбран на другой проект
            </template>
          </BaseRadioButton>
          <!-- 2 (MEDIUM) -->

          <!-- 3 (LOW) -->
          <BaseRadioButton
            v-model="priorityValue"
            class="radio-label"
            :value="Priority.Low"
            :disabled="lowSelected"
          >
            {{ Priority.Low }}
            ({{ PriorityText[Priority.Low] }} приоритет)
            <template v-if="lowSelected">
              <br />
              *уже выбран на другой проект
            </template>
          </BaseRadioButton>
          <!-- 3 (LOW) -->
        </div>
        <BaseButton
          case="uppercase"
          class="participation-btn"
          :disabled="authStore.loading || !priorityValue"
          @click="onCreateParticipation"
        >
          Подать заявку
        </BaseButton>
      </div>
    </template>
    <!-- ACTIONS -->
  </BaseModal>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  import { PriorityText, Priority } from '@/models/Participation';
  import checkedIconUrl from '@/assets/icons/checked.svg?url';
  import errorIconUrl from '@/assets/icons/close-red.png?url';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  // components
  import BaseModal from '../ui/BaseModal.vue';
  import BaseInput from '../ui/BaseInput.vue';
  import BaseTooltip from '../ui/BaseTooltip.vue';
  import BaseRadioButton from '../ui/BaseRadioButton.vue';
  import BaseButton from '../ui/BaseButton.vue';

  const projectsStore = useProjectsStore();
  const authStore = useAuthStore();
  const modalsStore = useModalsStore();

  const priorityValue = ref<Priority>();
  const highSelected = ref(false);
  const mediumSelected = ref(false);
  const lowSelected = ref(false);
  const priorityTooltipMsg =
    'Вы можете подать заявки на 3 проекта сразу, но чтобы мы смогли вас распределить в проект, в который вы хотите попасть с большей вероятностью, вы ставите ему больший приоритет. Вы сможете поменять приоритет проекта в личном кабинете после отправки заявки';

  watch(
    () => authStore.participationList,
    () => {
      if (authStore.participationList) {
        highSelected.value = false;
        mediumSelected.value = false;
        lowSelected.value = false;

        for (const participation of authStore.participationList) {
          switch (participation.priority) {
            case 1:
              highSelected.value = true;
              break;
            case 2:
              mediumSelected.value = true;
              break;
            case 3:
              lowSelected.value = true;
              break;
          }
        }
      }
    },
    { immediate: true, deep: true },
  );

  function onCreateParticipation() {
    if (projectsStore.openedProject && priorityValue.value) {
      authStore.createPatricipation(
        priorityValue.value,
        projectsStore.openedProject.id,
      );
      priorityValue.value = undefined;
    }
  }

  function onCloseModal() {
    modalsStore.participationModal = false;
    priorityValue.value = undefined;
  }
</script>

<style scoped>
  .title {
    margin-bottom: 0.625rem;
  }

  .input-label {
    display: block;
    margin-bottom: 0.625rem;
    font-size: 1.125rem;
    font-weight: 700;
  }

  .input.with-icon {
    background-size: 1.4rem;
  }

  .participation-btn {
    align-self: flex-end;
  }

  .radio-label:not(:last-child) {
    margin-bottom: 1.25rem;
  }

  .subtitle {
    margin: 0;
    font-size: 1.25rem;
  }

  .input-group {
    padding: 0;
    border: none;
  }

  .body-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5625rem 4.375rem;
  }

  .actions-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 18rem;
    margin-top: 0.9375rem;
  }
</style>

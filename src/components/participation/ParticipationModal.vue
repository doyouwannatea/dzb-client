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
      <h3 v-if="participationsStore.loading">загрузка...</h3>
      <h3 v-if="participationsStore.error">{{ participationsStore.error }}</h3>
    </template>
    <!-- HEADER -->

    <!-- MAIN CONTENT -->
    <div v-if="isCandidate(authStore.profileData)" class="body-grid">
      <!-- fio -->
      <fieldset class="input-group">
        <label class="input-label" for="fio">ФИО</label>
        <BaseInput
          id="fio"
          :model-value="authStore.profileData?.fio"
          class="input"
          disabled
          :icon="authStore.profileData?.fio ? checkedIconUrl : undefined"
        />
      </fieldset>
      <!-- fio -->

      <!-- mail -->
      <fieldset class="input-group">
        <label class="input-label" for="mail">E-mail</label>
        <BaseInput
          id="mail"
          :model-value="authStore.profileData?.email"
          class="input"
          disabled
          :icon="authStore.profileData?.email ? checkedIconUrl : undefined"
        />
      </fieldset>
      <!-- mail -->

      <!-- study group -->
      <fieldset class="input-group">
        <label class="input-label" for="study-group">Учебная группа</label>
        <BaseInput
          id="study-group"
          :model-value="authStore.profileData?.training_group"
          class="input"
          disabled
          :icon="
            authStore.profileData?.training_group ? checkedIconUrl : undefined
          "
        />
      </fieldset>
      <!-- study group -->

      <!-- phone number -->
      <fieldset class="input-group">
        <label class="input-label" for="phone-number">Номер телефона</label>
        <BaseInput
          id="phone-number"
          :model-value="authStore.profileData?.phone"
          class="input"
          disabled
          :icon="authStore.profileData?.phone ? checkedIconUrl : undefined"
        />
      </fieldset>
      <!-- phone number -->
    </div>
    <!-- MAIN CONTENT -->

    <!-- ACTIONS -->
    <template #actions>
      <BaseTooltip :message="priorityTooltipMsg">
        <span class="input-label subtitle">
          <span class="required">*</span>
          Приоритетность проекта
        </span>
      </BaseTooltip>
      <div class="actions-grid">
        <div class="priority-fieldset">
          <!-- 1 (HIGH) -->
          <BaseRadioButton
            v-model="priorityValue"
            class="radio-label"
            :value="ParticipationPriority.High"
            :disabled="highSelected"
          >
            {{ ParticipationPriority.High }}
            ({{ ParticipationPriorityText[ParticipationPriority.High] }}
            приоритет)
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
            :value="ParticipationPriority.Medium"
            :disabled="mediumSelected"
          >
            {{ ParticipationPriority.Medium }}
            ({{ ParticipationPriorityText[ParticipationPriority.Medium] }}
            приоритет)
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
            :value="ParticipationPriority.Low"
            :disabled="lowSelected"
          >
            {{ ParticipationPriority.Low }}
            ({{ ParticipationPriorityText[ParticipationPriority.Low] }}
            приоритет)
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
          :disabled="participationsStore.loading || !priorityValue"
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
  import {
    ParticipationPriorityText,
    ParticipationPriority,
  } from '@/models/Participation';
  import checkedIconUrl from '@/assets/icons/checked.svg?url';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import { useParticipationsStore } from '@/stores/participations/useParticipationsStore';
  import { isCandidate } from '@/helpers/typeCheck';
  // components
  import BaseModal from '../ui/BaseModal.vue';
  import BaseInput from '../ui/BaseInput.vue';
  import BaseTooltip from '../ui/BaseTooltip.vue';
  import BaseRadioButton from '../ui/BaseRadioButton.vue';
  import BaseButton from '../ui/BaseButton.vue';

  const projectsStore = useProjectsStore();
  const authStore = useAuthStore();
  const participationsStore = useParticipationsStore();
  const modalsStore = useModalsStore();

  const priorityValue = ref<ParticipationPriority>();
  const highSelected = ref(false);
  const mediumSelected = ref(false);
  const lowSelected = ref(false);
  const priorityTooltipMsg =
    'Вы можете подать заявки на 3 проекта сразу, но чтобы мы смогли вас распределить в проект, в который вы хотите попасть с большей вероятностью, вы ставите ему больший приоритет. Вы сможете поменять приоритет проекта в личном кабинете после отправки заявки';

  watch(() => participationsStore.participationList, initParticipations, {
    immediate: true,
    deep: true,
  });

  watch(() => modalsStore.participationModal, initParticipations);

  function initParticipations() {
    if (participationsStore.participationList) {
      highSelected.value = false;
      mediumSelected.value = false;
      lowSelected.value = false;

      for (const participation of participationsStore.participationList) {
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

      if (!highSelected.value) {
        priorityValue.value = ParticipationPriority.High;
      } else if (!mediumSelected.value) {
        priorityValue.value = ParticipationPriority.Medium;
      } else if (!lowSelected.value) {
        priorityValue.value = ParticipationPriority.Low;
      }
    }
  }

  function onCreateParticipation() {
    if (!priorityValue.value) {
      return;
    }

    if (projectsStore.openedProject) {
      participationsStore.createPatricipation(
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

<style lang="scss" scoped>
  @import '@styles/breakpoints';

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
    grid-row: 2;
    grid-column: 2;
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

    @media (max-width: $tablet) {
      grid-template-columns: 1fr;
    }
  }

  .actions-grid {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: auto 1fr;
    row-gap: 0.5rem;
    column-gap: 18rem;
    margin-top: 0.9375rem;

    @media (max-width: $tablet) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .required {
    font-weight: bold;
    color: var(--red-color-1);
  }

  .priority-fieldset {
    grid-row: span 2;
  }
</style>

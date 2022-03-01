<template>
  <!-- project request modal -->
  <BaseModal size="m" :is-show="props.isShow" @close="emit('close')">
    <!-- HEADER -->
    <template #header>
      <h1 class="title">Подача заявки на проект</h1>
      <h2>Платформа для размещения вузовских олимпиад</h2>
    </template>
    <!-- HEADER -->

    <!-- MAIN CONTENT -->
    <div class="body-grid">
      <!-- fio -->
      <fieldset class="input-group">
        <label class="input-label" for="fio">ФИО</label>
        <input
          value="Иванов Иван Иванович"
          disabled
          class="input"
          type="text"
          name="fio"
        />
      </fieldset>
      <!-- fio -->

      <!-- mail -->
      <fieldset class="input-group">
        <label class="input-label" for="mail">E-mail</label>
        <input
          value="ivanov@yandex.ru"
          disabled
          class="input"
          type="text"
          name="mail"
        />
      </fieldset>
      <!-- mail -->

      <!-- study group -->
      <fieldset class="input-group">
        <label class="input-label" for="study-group">Учебная группа</label>
        <input
          value="ИСТб-20-1"
          disabled
          class="input"
          type="text"
          name="study-group"
        />
      </fieldset>
      <!-- study group -->

      <!-- phone number -->
      <fieldset class="input-group">
        <label class="input-label" for="phone-number">Номер телефона</label>
        <input
          value="+7 (912) 345-67-89"
          disabled
          class="input"
          type="text"
          name="phone-number"
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
          <!-- priority 1 (high) -->
          <label class="radio-label">
            <input class="radio" value="1" type="radio" name="priority" />
            1 (Высший приоритет)
          </label>
          <!-- priority 1 (high) -->

          <!-- priority 2 (medium) -->
          <label class="radio-label" data-disabled="true">
            <input
              class="radio"
              disabled
              value="2"
              type="radio"
              name="priority"
            />
            2 (Средний приоритет) <br />
            *уже выбран на другой проект
          </label>
          <!-- priority 2 (medium) -->

          <!-- priority 3 (low) -->
          <label class="radio-label">
            <input class="radio" value="3" type="radio" name="priority" />
            3 (Низкий приоритет)
          </label>
          <!-- priority 3 (low) -->
        </div>
        <BaseButton class="request-btn">Подать заявку</BaseButton>
      </div>
    </template>
    <!-- ACTIONS -->
  </BaseModal>
</template>

<script setup lang="ts">
  import { withDefaults } from 'vue';
  import BaseModal from './base/BaseModal.vue';
  import BaseButton from './base/BaseButton.vue';
  import BaseTooltip from './base/BaseTooltip.vue';

  type Props = { isShow: boolean };
  type Emits = { (e: 'close'): void };

  const props = withDefaults(defineProps<Props>(), { isShow: false });
  const emit = defineEmits<Emits>();

  const priorityTooltipMsg =
    'Вы можете подать заявки на 3 проекта сразу, но чтобы мы смогли вас распределить в проект, в который вы хотите попасть с большей вероятностью, вы ставите ему больший приоритет.';
</script>

<style scoped>
  .title {
    margin-bottom: 0.625rem;
  }

  .input-label {
    font-size: 1.125rem;
    font-weight: 800;
    display: block;
    margin-bottom: 0.625rem;
  }

  .request-btn {
    align-self: flex-end;
  }

  .radio-label {
    display: flex;
    align-items: center;
    gap: 0.9375rem;
    cursor: pointer;
  }

  .radio-label[data-disabled='true'] {
    cursor: default;
  }

  .radio-label:not(:last-child) {
    margin-bottom: 1.25rem;
  }

  .subtitle {
    font-size: 1.25rem;
    margin: 0;
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

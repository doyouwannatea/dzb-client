<template>
  <form class="form">
    <div class="left-column">
      <p class="title">Остались вопросы? Обнаружили неполадку?</p>
      <p class="form-description">
        Задайте нам свой вопрос или опишите проблему, и мы ответим на указанную
        почту или разместим ответ в разделе <br />
        <RouterLink class="link" :to="{ name: RouteNames.FAQ }">
          “Вопрос-ответ”
        </RouterLink>
      </p>
    </div>

    <div class="right-column">
      <div class="row controls-row">
        <BaseInput
          inputmode="email"
          type="text"
          placeholder="something@example.ru"
          label="E-mail"
        />
        <div>
          <p class="multiselect-label">Ваша деятельность</p>
          <VMultiselect
            class="multiselect"
            placeholder="По специальности"
            :options="['Студент', 'Преподаватель']"
          />
        </div>
      </div>

      <BaseTextarea
        :class="$style.textarea"
        resize="vertical"
        placeholder="Я перевёлся на другую специальность, что будет с моим проектом?"
        label="Ваш вопрос"
      />
      <div class="row policy-row">
        <p class="policy">
          Нажимая кнопку “Отправить”, вы автоматически даёте своё согласие на
          <RouterLink class="link-orange" :to="{ name: RouteNames.HOME }"
            >Обработку персональных данных</RouterLink
          >
          и
          <RouterLink class="link-orange" :to="{ name: RouteNames.HOME }"
            >Политику Конфиденциальности</RouterLink
          >
        </p>
        <BaseButton
          :full-width="isMobileS"
          case="uppercase"
          variant="outlined"
          color="white"
        >
          Отправить
        </BaseButton>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { RouteNames } from '@/router/types/route-names';
  import VMultiselect from '@vueform/multiselect';
  import BaseInput from '@/components/ui/BaseInput.vue';
  import BaseTextarea from '@/components/ui/BaseTextarea.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import { useMobileS } from '@/helpers/breakpoints';

  const isMobileS = useMobileS();
</script>

<style lang="scss" module>
  .textarea {
    min-height: 6.625rem;
  }
</style>

<style lang="scss" scoped>
  @import '@styles/breakpoints.scss';

  .form {
    display: flex;
    justify-content: space-between;
    margin-top: 2.3181rem;
    background-color: var(--accent-color-1);
    border-radius: 0.625rem;
    padding: 1.75rem 2.375rem;
    gap: 2rem;

    @media (max-width: $mobile-s) {
      margin-top: 16px;
      padding: 22px 20px;
      flex-direction: column;
    }
  }
  .left-column {
    max-width: 40.625rem;
    width: 100%;
  }

  .right-column {
    max-width: 36.4694rem;
    width: 100%;
  }

  .row {
    display: flex;
    align-items: center;
  }

  .controls-row {
    margin-bottom: 2.2rem;
    gap: 2.5rem;
    flex-wrap: wrap;

    & > * {
      flex: 1 230px;
    }

    @media (max-width: $mobile-s) {
      margin-bottom: 32px;
      gap: 32px;
    }
  }

  .policy-row {
    margin-top: 1.375rem;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1.5rem;
  }

  .multiselect {
    min-height: 3.213rem;
    align-self: flex-end;

    &:deep(.multiselect-single-label) {
      line-height: 3.213rem;
    }
  }

  .multiselect-label {
    cursor: default;
    margin-bottom: 0.75rem;
    font-weight: 700;
    font-size: 1.125rem;
    color: var(--light-color);
  }

  .title {
    font-size: 2.875rem;
    line-height: 109.8%;
    margin-bottom: 3.2631rem;
    color: var(--light-color);

    @media (max-width: $mobile-s) {
      font-size: 24px;
      margin-bottom: 16px;
      max-width: 80%;
    }
  }

  .form-description {
    font-size: 1.4602rem;
    line-height: 1.875rem;
    max-width: 34.21rem;
    width: 100%;
    color: var(--light-color);

    .link {
      color: inherit;
    }

    @media (max-width: $mobile-s) {
      font-size: 12px;
      line-height: 17px;
    }
  }

  .policy {
    max-width: 20.6919rem;
    font-weight: normal;
    font-size: 10px;
    line-height: 146.8%;
    color: var(--light-color);
  }

  .link-orange {
    color: var(--orange-color-1);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>

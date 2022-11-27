<template>
  <form v-if="false" class="form">
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
  @import '@styles/breakpoints';

  .form {
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    padding: 1.75rem 2.375rem;
    margin-top: 2.3181rem;
    background-color: var(--accent-color-1);
    border-radius: 0.625rem;

    @media (max-width: $mobile-s) {
      flex-direction: column;
      padding: 22px 20px;
      margin-top: 16px;
    }
  }

  .left-column {
    width: 100%;
    max-width: 40.625rem;
  }

  .right-column {
    width: 100%;
    max-width: 36.4694rem;
  }

  .row {
    display: flex;
    align-items: center;
  }

  .controls-row {
    flex-wrap: wrap;
    gap: 2.5rem;
    margin-bottom: 2.2rem;

    & > * {
      flex: 1 230px;
    }

    @media (max-width: $mobile-s) {
      gap: 32px;
      margin-bottom: 32px;
    }
  }

  .policy-row {
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: space-between;
    margin-top: 1.375rem;
  }

  .multiselect {
    align-self: flex-end;
    min-height: 3.213rem;

    &:deep(.multiselect-single-label) {
      line-height: 3.213rem;
    }
  }

  .multiselect-label {
    margin-bottom: 0.75rem;
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--light-color);
    cursor: default;
  }

  .title {
    margin-bottom: 3.2631rem;
    font-size: 2.875rem;
    line-height: 109.8%;
    color: var(--light-color);

    @media (max-width: $mobile-s) {
      max-width: 80%;
      margin-bottom: 16px;
      font-size: 24px;
    }
  }

  .form-description {
    width: 100%;
    max-width: 34.21rem;
    font-size: 1.4602rem;
    line-height: 1.875rem;
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
    font-size: 10px;
    font-weight: normal;
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

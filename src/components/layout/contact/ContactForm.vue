<template>
  <form class="contact-form">
    <div class="contact-form-text">
      <h1>Остались вопросы? Обнаружили неполадку?</h1>
      <p>
        Задайте нам свой вопрос или опишите проблему, и мы ответим на указанную
        почту или разместим ответ в разделе <br />
        <RouterLink class="link" :to="{ name: RouteNames.FAQ }"
          >“Вопрос-ответ”</RouterLink
        >
      </p>
    </div>
    <div class="contact-form-msg">
      <div class="contact-form-msg-block">
        <h2>E-mail</h2>
        <input type="text" placeholder="something@example.ru" />
      </div>
      <div class="contact-form-msg-block">
        <h2>Ваша деятельность</h2>
        <div class="select">
          <select>
            <option value="">Студент</option>
            <option value="">Преподаватель</option>
          </select>
          <i class="fa fa-chevron-down" aria-hidden="true"></i>
        </div>
      </div>
      <div class="contact-form-msg-block">
        <h2>Ваш вопрос</h2>
        <textarea
          placeholder="Я перевёлся на другую специальность, что будет с моим проектом?"
        ></textarea>
      </div>
      <div class="text">
        <p>
          Нажимая кнопку “Отправить”, вы автоматически даёте своё согласие на
          <RouterLink class="link-orange" :to="{ name: RouteNames.HOME }"
            >Обработку персональных данных</RouterLink
          >
          и
          <RouterLink class="link-orange" :to="{ name: RouteNames.HOME }"
            >Политику Конфиденциальности</RouterLink
          >
        </p>
        <button>Отправить</button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { RouteNames } from '@/router/types/route-names';
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints.scss';
  .contact-form {
    display: flex;
    min-height: 25.875rem;
    margin-top: 2.3181rem;
    background-color: var(--accent-color-1);
    color: #ffffff;
    font-weight: 600;
    font-size: 1.125rem;
    border-radius: 0.625rem;
  }
  .contact-form-text {
    max-width: 40.625rem;
    width: 100%;
    padding: 3.4325rem 0 0 1.9225rem;
    margin-right: 7.57rem;
  }
  h1 {
    font-size: 2.875rem;
    line-height: 109.8%;
    margin-bottom: 3.2631rem;
  }
  .contact-form p {
    font-size: 1.4602rem;
    line-height: 1.875rem;
    max-width: 34.21rem;
    width: 100%;
  }
  .link {
    color: #ffffff;
  }
  .contact-form-msg {
    max-width: 36.4694rem;
    width: 100%;
    margin-right: 2.425rem;
  }
  .contact-form-msg-block {
    display: inline-table;
  }
  h2 {
    font-weight: bold;
    line-height: 1.6875rem;
    font-size: 1.125rem;
    min-height: 2.3912rem;
    margin-top: 1.7637rem;
  }
  input {
    border-radius: 0.3125rem;
    border: none;
    max-width: 15.6069rem;
    width: 100%;
    min-height: 3.625rem;
    padding-left: 0.9194rem;
    color: var(--gray-color-2);
    margin-right: 3.2rem;
  }
  input:focus {
    outline: none;
    color: #000000;
  }
  select {
    width: 18.125rem;
    min-height: 3.625rem;
    border-radius: 0.3125rem;
    border: none;
    line-height: 1.4375rem;
    appearance: none;
    padding-left: 0.9194rem;
  }
  select:focus {
    outline: none;
  }
  .fa {
    position: absolute;
    color: #000000;
    right: 0.9375rem;
    top: 1.25rem;
    font-size: 1rem;
  }
  .select {
    position: relative;
  }
  textarea {
    width: 36.4694rem;
    min-height: 6.6875rem;
    border: none;
    border-radius: 0.3125rem;
    line-height: 1.625rem;
    padding: 1rem 0 0 1rem;
    margin-bottom: 1.5625rem;
    resize: vertical;
  }
  textarea:focus {
    outline: none;
  }
  .text {
    display: flex;
  }
  .text p {
    display: inline-table;
    padding-top: 0.375rem;
    max-width: 20.6919rem;
    width: 100%;
    font-weight: normal;
    font-size: 0.625rem;
    line-height: 146.8%;
  }
  button {
    max-width: 12.1875rem;
    width: 100%;
    min-height: 3.25rem;
    background-color: transparent;
    border: 0.125rem solid #ffffff;
    border-radius: 0.3125rem;
    color: #ffffff;
    font-size: 1rem;
    text-transform: uppercase;
    margin-left: 3.5rem;
  }
  .link-orange {
    color: #ffb938;
    text-decoration: none;
  }
  .link-orange:hover {
    text-decoration: underline;
  }
</style>

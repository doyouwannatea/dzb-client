<template>
  <link
    href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
    rel="stylesheet"
  />
  <form class="contact-form">
    <div class="contact-form-text">
      <h1>Остались вопросы? Обнаружили неполадку?</h1>
      <p>
        Задайте нам свой вопрос или опишите проблему, и мы ответим на указанную
        почту или разместим ответ в разделе <br />
        <router-link class="link" to="/faq" exact>“Вопрос-ответ”</router-link>
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
          maxlength="126"
          placeholder="Я перевёлся на другую специальность, что будет с моим проектом?"
        ></textarea>
      </div>
      <p>
        Нажимая кнопку “Отправить”, вы автоматически даёте своё согласие на
        <router-link class="link-orange" to="/" exact
          >Обработку персональных данных</router-link
        >
        и
        <router-link class="link-orange" to="/" exact
          >Политику Конфиденциальности</router-link
        >
      </p>
      <button>Отправить</button>
    </div>
  </form>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  @import '@styles/breakpoints.scss';
  .contact-form {
    height: 25.875rem;
    margin-top: 2.3181rem;
    background-color: #3d68ed;
    color: #ffffff;
    font-weight: 600;
    font-size: 1.125rem;
    border-radius: 0.625rem;
  }
  .contact-form-text {
    display: flexbox;
    float: left;
    width: 40.625rem;
    padding: 3.4325rem 0 0 1.9225rem;
  }
  h1 {
    font-size: 2.875rem;
    line-height: 109.8%;
    margin-bottom: 3.2631rem;
  }
  .contact-form p {
    font-size: 1.4602rem;
    line-height: 1.875rem;
    width: 34.21rem;
  }
  .link {
    color: #ffffff;
  }
  .contact-form-msg {
    display: flexbox;
    float: right;
    width: 36.4694rem;
    margin-right: 2.425rem;
  }
  .contact-form-msg-block {
    display: flexbox;
    float: left;
  }
  h2 {
    font-weight: bold;
    line-height: 1.6875rem;
    font-size: 1.125rem;
    height: 2.3912rem;
    margin-top: 1.7637rem;
  }
  input {
    border-radius: 0.3125rem;
    border: none;
    width: 15.6069rem;
    height: 3.625rem;
    padding-left: 0.9194rem;
    color: #a4a4a4;
    margin-right: 2.5rem;
  }
  input:focus {
    outline: none;
    color: #000000;
  }
  select {
    width: 18.125rem;
    height: 3.625rem;
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
    height: 6.6269rem;
    border-radius: 0.3125rem;
    line-height: 1.625rem;
    padding: 1rem 0 0 1rem;
    margin-bottom: 1.5625rem;
    resize: none;
  }
  textarea:focus {
    outline: none;
  }
  .contact-form-msg p {
    display: flexbox;
    float: left;
    padding-top: 0.375rem;
    width: 20.6919rem;
    font-weight: normal;
    font-size: 0.625rem;
    line-height: 146.8%;
  }
  button {
    display: flexbox;
    float: right;
    width: 12.1875rem;
    height: 3.25rem;
    background-color: transparent;
    border: 0.125rem solid #ffffff;
    border-radius: 0.3125rem;
    color: #ffffff;
    font-size: 1rem;
    text-transform: uppercase;
  }
  .link-orange {
    color: #ffb938;
    text-decoration: none;
  }
  .link-orange:hover {
    text-decoration: underline;
  }
</style>

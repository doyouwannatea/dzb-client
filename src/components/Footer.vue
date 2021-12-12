<template>
  <footer class="footer">
    <Container size="lg" class="container">
      <Logo
        class="logo"
        :logo-icon="logoImage"
        :logo-width="50"
        :logo-height="73"
      ></Logo>

      <nav>
        <ul class="nav-list">
          <li>
            <a class="title nav-link" href="#">Все проекты</a>
          </li>
          <li>
            <a class="title nav-link" href="#">вопрос-ответ</a>
          </li>
          <li>
            <a class="title nav-link" href="#">контакты</a>
          </li>
        </ul>
      </nav>

      <div class="info-block">
        <h3 class="title info-title">Личный кабиент</h3>
        <ul class="info-list">
          <li class="info-item">Мои проекты</li>
          <li class="info-item">Мои заявки</li>
        </ul>
      </div>

      <p class="initials">
        <span class="thin">
          Федеральное Государственное Бюджетное Образовательное Учреждение
          высшего образования
        </span>
        <br />
        <span>
          "Иркутский Национальный Исследовательский Технический Университет"
        </span>
      </p>

      <div class="info-block">
        <h3 class="title info-title">Контакты администратора:</h3>
        <ul class="info-list">
          <li class="info-item">Телефон: +7 (3952) 999-999</li>
          <li class="info-item">E-mail: admin@admin.ru</li>
        </ul>
      </div>

      <div class="info-block">
        <h3 class="title info-title">Контакты организации:</h3>
        <ul class="info-list">
          <li class="info-item">664074, г. Иркутск ул. Лермонтова 83</li>
          <li class="info-item">Телефон: +7 (3952) 405-000</li>
          <li class="info-item">Факс: +7 (3952) 405-100</li>
          <li class="info-item">Справочная: +7 (3952) 405-009</li>
          <li class="info-item">E-mail: info@istu.edu</li>
        </ul>
      </div>
    </Container>
  </footer>
</template>

<script setup lang="ts">
  import Logo from './Logo.vue';
  import Container from '../layout/Container.vue';
  import logoImage from '../assets/logo-lg.svg';
</script>

<style scoped>
  .footer {
    background-color: var(--text-color);
    color: #fff;
    padding-top: 56px;
    padding-bottom: 36px;
  }

  .title {
    line-height: 20px;
    font-weight: 600;
    color: #fff;
  }

  .logo {
    color: #fff;
    grid-column: span 2;
  }

  .initials {
    font-weight: 300;
    font-size: 14px;
    line-height: 155.3%;

    text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
    grid-column: span 2;
  }

  .initials .thin {
    font-weight: 100;
  }

  .container {
  }
  /* .col {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: flex-start;
    row-gap: 40px;
  }
  .col-left {
  } */
  .col-right {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 68px;
    justify-items: center;
  }

  /* Info block */
  .info-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-left: 0;
  }

  .info-item {
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    text-transform: uppercase;
    color: var(--gray-color-2);
  }

  .info-title {
    margin-bottom: 17px;
  }

  /* Nav */
  .nav-list {
    padding-left: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .nav-link {
    display: inline-block;
    width: 100%;
    text-transform: uppercase;
    text-decoration: none;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
  }
</style>

<template>
  <footer class="footer">
    <AppContainer size="lg" class="container">
      <div>
        <RouterLink class="clear-link" :to="{ name: RouteNames.HOME }">
          <AppLogo
            class="logo"
            :logo-icon="logoImage"
            :logo-width="50"
            :logo-height="73"
          />
        </RouterLink>

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
      </div>

      <nav>
        <ul class="nav-list">
          <template
            v-for="link in $router.options.routes"
            :key="link.name || link.path"
          >
            <li v-if="link.meta?.nav">
              <RouterLink class="title link nav-link" :to="{ name: link.name }">
                {{ link.meta.nav }}
              </RouterLink>
            </li>
          </template>
        </ul>
      </nav>

      <section class="info-block">
        <h3 class="title info-title">Личный кабиент</h3>
        <ul class="info-list">
          <li class="info-item">
            <RouterLink class="link" :to="{ name: RouteNames.HOME }">
              Мои проекты
            </RouterLink>
          </li>
          <li class="info-item">
            <RouterLink class="link" :to="{ name: RouteNames.HOME }">
              Мои заявки
            </RouterLink>
          </li>
        </ul>
      </section>

      <div class="divider"></div>

      <section class="info-block">
        <h3 class="title info-title">Контакты администратора:</h3>
        <ul class="info-list">
          <li class="info-item">
            Телефон: <a class="link" href="#">+7 (3952) 999-999</a>
          </li>
          <li class="info-item">
            E-mail: <a class="link" href="#">admin@admin.ru</a>
          </li>
        </ul>
      </section>

      <section class="info-block">
        <h3 class="title info-title">Контакты организации:</h3>
        <ul class="info-list">
          <li class="info-item">664074, г. Иркутск ул. Лермонтова 83</li>
          <li class="info-item">
            Телефон: <a class="link" href="#">+7 (3952) 405-000</a>
          </li>
          <li class="info-item">
            Факс: <a class="link" href="#">+7 (3952) 405-100</a>
          </li>
          <li class="info-item">
            Справочная: <a class="link" href="#">+7 (3952) 405-009</a>
          </li>
          <li class="info-item">
            E-mail: <a class="link" href="#">info@istu.edu</a>
          </li>
        </ul>
      </section>
    </AppContainer>
  </footer>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import AppLogo from '../base/AppLogo.vue';
  import AppContainer from '../base/AppContainer.vue';
  import logoImage from '../../assets/icons/logo-white.svg';
  import { RouteNames } from '@/router/types/route-names';
</script>

<style scoped>
  .footer {
    position: sticky;
    top: 100vh;

    background-color: var(--text-color);
    color: #fff;
    padding-top: 56px;
    padding-bottom: 36px;
    margin-top: 140px;
  }

  .title {
    font-size: 1rem;
    line-height: 20px;
    font-weight: 600;
    color: #fff;
  }

  .logo {
    max-width: 270px;
    color: #fff;
    grid-column: span 2;
  }

  .initials {
    font-weight: 300;
    font-size: 0.88rem;
    line-height: 155.3%;
    text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
    margin-top: 7em;
    max-width: 30em;
  }

  .initials .thin {
    font-weight: 100;
  }

  .container {
    display: grid;
    grid-template-columns: 1fr repeat(5, auto);
    column-gap: 70px;
  }

  .divider {
    background-color: rgba(255, 255, 255, 0.8);
    width: 1px;
    height: 100%;
  }

  /* Info block */
  .info-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 0;
  }

  .info-item {
    font-size: 0.88rem;
    line-height: 18px;
    font-weight: 400;
    text-transform: uppercase;
    color: var(--gray-color-2);
  }

  .info-title {
    margin-bottom: 20px;
  }

  /* Nav */
  .nav-list {
    padding-left: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .nav-link {
    display: inline-block;
    width: 100%;
    text-transform: uppercase;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
  }

  .link {
    text-decoration: none;
    color: inherit;
  }
  .link:hover {
    text-decoration: underline;
  }
</style>

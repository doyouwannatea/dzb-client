<template>
  <footer class="footer">
    <BaseContainer size="lg" class="container">
      <div>
        <RouterLink class="clear-link" :to="{ name: RouteNames.HOME }">
          <AppLogo class="logo" />
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
          <li v-for="link in mainRoutes" :key="link.name">
            <RouterLink class="title link nav-link" :to="{ name: link.name }">
              {{ link.meta.title }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <section v-if="authStore.isAuth" class="info-block">
        <h3 class="title info-title">Личный кабиент</h3>
        <ul class="info-list">
          <li v-for="link in userRoutes" :key="link.name" class="info-item">
            <RouterLink class="link" :to="{ name: link.name }">
              {{ link.meta.title }}
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
    </BaseContainer>
  </footer>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import AppLogo from '../AppLogo.vue';
  import BaseContainer from '../base/BaseContainer.vue';
  import { RouteNames } from '@/router/types/route-names';
  import {
    useMainNavigationRoutes,
    useRoledUserNavigationRoutes,
  } from '@/hooks/useRoutes';
  import { useAuthStore } from '@/stores/auth/useAuthStore';

  const authStore = useAuthStore();
  const mainRoutes = useMainNavigationRoutes();
  const userRoutes = useRoledUserNavigationRoutes();
</script>

<style scoped>
  .footer {
    position: sticky;
    top: 100vh;

    background-color: var(--text-color);
    color: #fff;
    padding-top: 3.5rem;
    padding-bottom: 2.25rem;
    margin-top: 8.75rem;
  }

  .title {
    font-size: 1rem;
    line-height: 1.25rem;
    font-weight: 600;
    color: #fff;
  }

  .logo {
    --width: 4.375rem;
    --height: 4.375rem;
    max-width: 16.875rem;
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
    column-gap: 4.375rem;
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
    gap: 0.625rem;
    padding-left: 0;
  }

  .info-item {
    font-size: 0.88rem;
    line-height: 1.125rem;
    font-weight: 400;
    text-transform: uppercase;
    color: var(--gray-color-2);
  }

  .info-title {
    margin-bottom: 1.25rem;
  }

  /* Nav */
  .nav-list {
    padding-left: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
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

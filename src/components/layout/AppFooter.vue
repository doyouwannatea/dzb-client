<template>
  <footer id="footer" class="footer">
    <BaseContainer class="container" :size="ContainerSize.lg">
      <div>
        <RouterLink class="clear-link" :to="{ name: RouteNames.HOME }">
          <AppLogo class="logo" />
        </RouterLink>

        <a class="initials" href="https://www.istu.edu/" target="_blank">
          <span class="thin">
            Федеральное Государственное Бюджетное Образовательное Учреждение
            высшего образования
          </span>
          <br />
          <span>
            "Иркутский Национальный Исследовательский Технический Университет"
          </span>
        </a>
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

      <section v-if="authStore.profileData" class="info-block">
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
        <h3 class="title info-title">Центр проектного обучения:</h3>
        <ul class="info-list">
          <li class="info-item">Аудитория: A-305</li>
          <li class="info-item">
            Телефон:
            <a class="link" href="tel:+73952405736">+7 (3952) 40-57-36</a>
          </li>
          <li class="info-item">
            E-mail:
            <a class="link" href="mailto:e-project@ex.istu.edu">
              e-project@ex.istu.edu
            </a>
          </li>
        </ul>
        <h3 class="title info-title column-devider">Техническая поддержка:</h3>
        <ul class="info-list">
          <li class="info-item">
            Телефон:
            <a class="link" href="tel:+73952405164">+7 (3952) 40-51-64</a>
          </li>
          <li class="info-item">
            E-mail:
            <a class="link" href="mailto:arshinskyv@istu.edu">
              arshinskyv@istu.edu
            </a>
          </li>
          <li class="info-item">
            Telegram:
            <a class="link" href="https://t.me/vlarsh" target="_blank">
              @vlarsh
            </a>
          </li>
        </ul>
      </section>

      <section class="info-block">
        <h3 class="title info-title">Контакты организации:</h3>
        <ul class="info-list">
          <li class="info-item">664074, г. Иркутск ул. Лермонтова 83</li>
          <li class="info-item">
            Телефон:
            <a class="link" href="tel:+73952405000">+7 (3952) 405-000</a>
          </li>
          <li class="info-item">
            Справочная:
            <a class="link" href="tel:+73952405009">+7 (3952) 405-009</a>
          </li>
          <li class="info-item">
            E-mail:
            <a class="link" href="mailto:info@istu.edu">info@istu.edu</a>
          </li>
        </ul>
      </section>
    </BaseContainer>
  </footer>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { ContainerSize } from '@/models/components/BaseContainer';
  import {
    useMainNavigationRoutes,
    useRoledUserNavigationRoutes,
  } from '@/hooks/useRoutes';
  import { RouteNames } from '@/router/types/route-names';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import AppLogo from '../ui/AppLogo.vue';
  import BaseContainer from '../ui/BaseContainer.vue';

  const authStore = useAuthStore();
  const mainRoutes = useMainNavigationRoutes();
  const userRoutes = useRoledUserNavigationRoutes();
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .footer {
    position: sticky;
    top: 100vh;
    padding-top: 3.5rem;
    padding-bottom: 2.25rem;
    margin-top: 8.75rem;
    color: #fff;
    background-color: var(--text-color);

    @media (max-width: $tablet) {
      margin-top: 2.8125rem;
    }
  }

  .title {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.25rem;
    color: #fff;
  }

  .logo {
    --width: 4.375rem;
    --height: 4.375rem;

    grid-column: span 2;
    max-width: 16.875rem;
    color: #fff;

    @media (max-width: $tablet) {
      --width: 3.375rem;
      --height: 3.375rem;

      line-height: 1.2em;
    }
  }

  .initials {
    display: block;
    max-width: 30em;
    margin-top: 7em;
    font-size: 0.88rem;
    font-weight: 300;
    line-height: 155.3%;
    color: inherit;
    text-decoration: none;
    text-shadow: 1px 2px 4px rgb(0 0 0 / 25%);

    &:hover {
      text-decoration: underline;
    }

    @media (max-width: $tablet) {
      margin-top: 1em;
    }

    .thin {
      font-weight: 100;
    }
  }

  .container {
    display: grid;
    grid-template-columns: 1fr repeat(5, auto);
    column-gap: 4.375rem;

    @media (max-width: $tablet) {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }

  .divider {
    width: 1px;
    height: 100%;
    background-color: rgb(255 255 255 / 80%);

    @media (max-width: $tablet) {
      width: 100%;
      height: 1px;
    }
  }

  .column-devider {
    margin-top: 1.5rem;
  }

  /* Info block */
  .info-list {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    padding-left: 0;
    list-style: none;
  }

  .info-item {
    font-size: 0.88rem;
    font-weight: 400;
    line-height: 1.125rem;
    color: var(--gray-color-2);
    text-transform: uppercase;
  }

  .info-title {
    margin-bottom: 1.25rem;
  }

  /* Nav */
  .nav-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding-left: 0;
    list-style: none;
  }

  .nav-link {
    display: inline-block;
    width: 100%;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    text-transform: uppercase;
  }

  .link {
    color: inherit;
    text-decoration: none;
  }

  .link:hover {
    text-decoration: underline;
  }
</style>

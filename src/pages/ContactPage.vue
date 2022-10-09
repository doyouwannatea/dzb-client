<!-- eslint-disable no-irregular-whitespace -->
<template>
  <PageLayout>
    <header class="header">
      <h1 class="title page-title">Контакты</h1>
    </header>
    <div class="contact-content">
      <h2>Адрес</h2>
      <p>
        664074, г. Иркутск, ул. Лермонтова, 83 <br />
        ИРНИТУ
      </p>
      <div class="contact-content-block">
        <h3>Режим работы</h3>
        <p>
          Пн-Пт с 9:00 до 16:00 <br />
          Перерыв с 12:30 до 13:00
        </p>
      </div>
    </div>
    <div class="contact-content">
      <h2>Телефон</h2>
      <a class="link" href="tel:+73952405164">+7 (3952) 40-51-64</a>
      <div class="contact-content-block">
        <h3>Справочная</h3>
        <a class="link" href="tel:+73952405009">+7 (3952) 405-009</a>
      </div>
      <div class="contact-content-block">
        <h3>Факс</h3>
        <a class="link" href="tel:+73952405100">+7 (3952) 405-100</a>
      </div>
    </div>
    <div class="contact-content">
      <h2>E-mail</h2>
      <div class="contact-content-block">
        <h3>Отдел Проектной деятельности</h3>
        <a class="link" href="mailto:info@istu.edu">info@istu.edu</a>
      </div>
      <div class="contact-content-block">
        <h3>Администратор сайта</h3>
        <a class="link" href="mailto:admin@admin.ru">admin@admin.ru</a>
      </div>
    </div>
    <iframe
      class="map"
      src="https://yandex.ru/map-widget/v1/?um=constructor%3A558543cc285d8850a5c05b2748ad09cfb5e82086d6bcc879e2d182e6044c0e47&amp;source=constructor"
    ></iframe>
    <ContactForm />
  </PageLayout>
</template>

<script setup lang="ts">
  import PageLayout from '@/components/layout/PageLayout.vue';
  import ContactForm from '@/components/layout/contact/ContactForm.vue';
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints.scss';

  .header {
    margin-top: 4.75rem;
    margin-bottom: 6.7325rem;

    @media (max-width: $mobile-s) {
      margin-top: 1.875rem;
    }
  }
  .contact-content {
    margin-right: 4.9375rem;
    display: inline-table;
    width: 100%;
    max-width: 24.1875rem;
  }
  .contact-content h2 {
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1.9375rem;
    color: var(--gray-color-2);
    margin-bottom: 1.7525rem;
  }
  .contact-content p {
    font-weight: normal;
    font-size: 1.25rem;
    line-height: 1.625rem;
    color: var(--text-color);
    margin-bottom: 1.0531rem;
  }
  .link {
    font-weight: normal;
    font-size: 1.25rem;
    line-height: 1.625rem;
    color: var(--text-color);
    margin-bottom: 1.0531rem;
    display: block;
    text-decoration: none;
  }
  .link:hover {
    text-decoration: underline;
  }
  .contact-content-block {
    display: inline-block;
    margin-right: 1.9375rem;
  }
  .contact-content-block h3 {
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.625rem;
    color: var(--text-color);
  }
  .contact-content-block p {
    margin: 0;
  }
  .map {
    width: 100%;
    min-height: 30.275rem;
    margin-top: 1.7794rem;
    border: none;
  }
</style>

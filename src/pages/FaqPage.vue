<template>
  <PageLayout>
    <header class="header">
      <h1 class="title page-title">Вопрос-ответ</h1>
      <p class="page-subtitle subtitle">
        На этой странице размещены частозадаваемые вопросы. Вы всегда можете
        задать свой вопрос нам и мы ответим на него лично или разместим в данном
        разделе.
      </p>
    </header>

    <QuestionAccordion>
      <template #title>Как происходит распределение?</template>
      <template #content>
        В настоящий момент олимпиады проводятся на сайте "Открытые курсы
        ИРНИТУ", базирующемся на платформе MOODLE, данная платформа при всех ее
        достоинствах имеет существенный недостаток в сложности регистрации,
        поэтому необходимо создать страницу с простой регистрацией на
        мероприятия и подключением через api к moodle
      </template>
    </QuestionAccordion>

    <QuestionAccordion>
      <template #title>Как происходит распределение?</template>
      <template #content>
        В настоящий момент олимпиады проводятся на сайте "Открытые курсы
        ИРНИТУ", базирующемся на платформе MOODLE, данная платформа при всех ее
        достоинствах имеет существенный недостаток в сложности регистрации,
        поэтому необходимо создать страницу с простой регистрацией на
        мероприятия и подключением через api к moodle
      </template>
    </QuestionAccordion>

    <QuestionAccordion>
      <template #title>Как происходит распределение?</template>
      <template #content>
        В настоящий момент олимпиады проводятся на сайте "Открытые курсы
        ИРНИТУ", базирующемся на платформе MOODLE, данная платформа при всех ее
        достоинствах имеет существенный недостаток в сложности регистрации,
        поэтому необходимо создать страницу с простой регистрацией на
        мероприятия и подключением через api к moodle
      </template>
    </QuestionAccordion>

    <QuestionAccordion>
      <template #title>Как происходит распределение?</template>
      <template #content>
        В настоящий момент олимпиады проводятся на сайте "Открытые курсы
        ИРНИТУ", базирующемся на платформе MOODLE, данная платформа при всех ее
        достоинствах имеет существенный недостаток в сложности регистрации,
        поэтому необходимо создать страницу с простой регистрацией на
        мероприятия и подключением через api к moodle
      </template>
    </QuestionAccordion>

    <QuestionAccordion>
      <template #title>Как происходит распределение?</template>
      <template #content>
        В настоящий момент олимпиады проводятся на сайте "Открытые курсы
        ИРНИТУ", базирующемся на платформе MOODLE, данная платформа при всех ее
        достоинствах имеет существенный недостаток в сложности регистрации,
        поэтому необходимо создать страницу с простой регистрацией на
        мероприятия и подключением через api к moodle
      </template>
    </QuestionAccordion>
  </PageLayout>
</template>

<script setup lang="ts">
  import PageLayout from '@/components/layout/PageLayout.vue';
  import QuestionAccordion from '../components/ui/accordion/QuestionAccordion.vue';
</script>

<style scoped>
  .header {
    margin-top: 4.75rem;
    margin-bottom: 2.8125rem;
  }

  .subtitle {
    max-width: 50rem;
    margin-top: 0.6875rem;
  }
</style>

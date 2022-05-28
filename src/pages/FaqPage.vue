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

    <!-- ВОПРОСЫ -->
    <QuestionAccordion>
      <template #title>От чего зависит сложность проекта?</template>
      <template #content>
        Сложность устанавливает сам куратор проекта. Сложность может зависеть
        как от необходимой углубленности в указанных навыках проекта, так и в
        самой реализации проекта.
      </template>
    </QuestionAccordion>

    <QuestionAccordion>
      <template #title>Как поменять приоритет/отозвать заявку?</template>
      <template #content>
        Отозвать заявку можно в своем профиле, а после подать новую. В таком
        случае вы будете на последней строчке в списке по указанному приоритету.
      </template>
    </QuestionAccordion>

    <QuestionAccordion>
      <template #title>Могу ли я участвовать в нескольких проектах?</template>
      <template #content>
        Нет. На данный момент можно участвовать лишь в одном проекте, но подать
        заявку на участие вы можете сразу на 3 проекта.
      </template>
    </QuestionAccordion>

    <QuestionAccordion>
      <template #title>Как происходит распределение?</template>
      <template #content>
        Распределение происходит автоматически. Сначала система распределяет по
        проектам тех студентов, которые указали первый приоритет в заявке. Затем
        такая же операция проходит со вторым приоритетом, после с 3-им
        приоритетом. После того, как студенты, подавшие заявки, будут
        распределены, система распределит студентов, которые не подали заявки.
      </template>
    </QuestionAccordion>

    <QuestionAccordion>
      <template #title>Что будет, если я не подам заявку?</template>
      <template #content>
        Система автоматически распределит студентов, которые не подали заявки
        исходя из их специальностей и навыкам по свободным проектам.
      </template>
    </QuestionAccordion>

    <QuestionAccordion>
      <template #title>Что будет, если я не выберу навыки?</template>
      <template #content>
        Все студенты обладают базовыми навыками, взятыми из пройденных курсов по
        вашей специальности.
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

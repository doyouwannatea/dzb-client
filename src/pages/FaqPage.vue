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
        Сложность устанавливает сам наставник проекта. Сложность может зависеть
        как от специфичности требуемых навыков, или степени их владения, так и в
        масштабности проекта или в сложности предметной области.
      </template>
    </QuestionAccordion>

    <QuestionAccordion>
      <template #title>Как поменять приоритет/отозвать заявку?</template>
      <template #content>
        Поменять приоритет или отозвать заявку можно в своем профиле в разделе
        «Мои заявки». В случае отмены заяки вы потеряте место в очереди на
        зачисление.
      </template>
    </QuestionAccordion>

    <QuestionAccordion>
      <template #title>
        Могу ли я участвовать одновременно в нескольких проектах?
      </template>
      <template #content>
        Нет. На данный момент можно участвовать лишь в одном проекте, но подать
        заявку на участие вы можете сразу на 3 проекта, указав их приоритет,
        который будет учтён при распределении на проекты.
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
        Система автоматически распределит студентов по свободным проектам,
        которые не подали заявки исходя из их специальностей и навыков.
      </template>
    </QuestionAccordion>

    <QuestionAccordion>
      <template #title>Что будет, если я не выберу навыки?</template>
      <template #content>
        Все студенты обладают базовыми навыками, взятыми из пройденных курсов по
        вашей специальности.
      </template>
    </QuestionAccordion>

    <QuestionAccordion>
      <template #title>Что такое приоритет?</template>
      <template #content>
        Вы можете подать заявки на 3 проекта сразу, но чтобы мы смогли вас
        распределить в проект, в который вы хотите попасть с большей
        вероятностью, вы ставите ему больший приоритет. Вы сможете поменять
        приоритет проекта в личном кабинете после отправки заявки
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

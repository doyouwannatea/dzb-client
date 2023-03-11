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
      <template #title
        >Что делать, если не получается подать заявку на проект?</template
      >
      <template #content>
        Подать заявку на проект <b>не</b> могут:
        <ul>
          <li>студенты 1-2 курса</li>
          <li>отчислившиеся студенты</li>
          <li>студенты в академическом отпуске</li>
          <li>магистранты</li>
          <li>заочники</li>
        </ul>
        <br />
        Функция подачи заявок для остальных студентов разблокируется в период
        приёма заявок, о начале которого студенты будут уведомлены. Если Вы не
        можете подать заявку на проект по другой причине, свяжитесь с
        <RouterLink :to="{ name: RouteNames.CONTACTS }">
          технической поддержкой </RouterLink
        >.
      </template>
    </QuestionAccordion>

    <QuestionAccordion>
      <template #title
        >Нужно ли подавать заявку на проект если есть автоматически
        сгенерированая заявка?</template
      >
      <template #content>
        Нет, повторно подавать заявку на проект не нужно, но учтите, что
        приоритет у автоматически сгенерированной заявки 4 или 5, что может
        повлиять на Ваше зачисленние в данный проект.
        <br />
        <br />
        Поменять приоритет Вы можете в
        <RouterLink :to="{ name: RouteNames.USER_PARTICIPATIONS }">
          личном кабинете </RouterLink
        >.
      </template>
    </QuestionAccordion>

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
        <RouterLink :to="{ name: RouteNames.USER_PARTICIPATIONS }">
          «Мои заявки» </RouterLink
        >. В случае отмены заяки вы потеряте место в очереди на зачисление.
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
      <template #title>Что такое приоритет?</template>
      <template #content>
        Вы можете подать заявки на 3 проекта сразу, но чтобы мы смогли вас
        распределить в проект, в который вы хотите попасть с большей
        вероятностью, вы ставите ему больший приоритет. Вы сможете поменять
        приоритет проекта в личном кабинете после отправки заявки. Также
        существуют скрытые приоритеты 4 и 5, это автоматически сгенерированные
        заявки для тех, кто не успел подать заявку вовремя или для тех, кто не
        смог пройти ни по одной заявке из первых 3-х приоритетов.
      </template>
    </QuestionAccordion>

    <QuestionAccordion>
      <template #title>
        Будет ли еще возможность выбрать проект после окончания срока приема
        заявок?
      </template>
      <template #content>
        За несколько недель до начала учебного года откроется возможность подать
        заявку или изменить свой выбор.
      </template>
    </QuestionAccordion>

    <QuestionAccordion>
      <template #title>
        Я перевелся в другой институт (то есть учусь сейчас не по тому профилю
        обучения на который поступал в ИРНИТУ изначально) и не вижу списки
        проектов своего нового института, что мне делать?
      </template>
      <template #content>
        Вам необходимо привязать ваш аккаунт на Кампусе ИРНИТУ к новому
        институту, для этого обратитесь в
        <a target="_blank" href="https://int.istu.edu/register/help/">
          службу поддержки Кампуса </a
        >.
      </template>
    </QuestionAccordion>
    <ContactForm />
  </PageLayout>
</template>

<script setup lang="ts">
  import PageLayout from '@/components/layout/PageLayout.vue';
  import QuestionAccordion from '../components/ui/accordion/QuestionAccordion.vue';
  import ContactForm from '@/components/layout/contact/ContactForm.vue';
  import { RouteNames } from '@/router/types/route-names';
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .header {
    margin-top: 4.75rem;
    margin-bottom: 2.8125rem;

    @media (max-width: $tablet) {
      margin-top: 1.875rem;
    }
  }

  .line {
    display: flex;
    flex-direction: row;
  }

  .space-left {
    margin-left: 0.75rem;
  }

  .subtitle {
    max-width: 50rem;
    margin-top: 0.6875rem;
  }
</style>

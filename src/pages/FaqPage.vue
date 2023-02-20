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
        Если вы студент 3-5 курса, не отчислившиеся, не в академическом отпуске,
        не магистранты и не заочники, свяжитесь с технической поддержкой:
        <div class="line">
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.0499 5C15.0267 5.19057 15.9243 5.66826 16.628 6.37194C17.3317 7.07561 17.8094 7.97326 17.9999 8.95M14.0499 1C16.0792 1.22544 17.9715 2.13417 19.4162 3.57701C20.8608 5.01984 21.7719 6.91101 21.9999 8.94M20.9999 16.92V19.92C21.0011 20.1985 20.944 20.4742 20.8324 20.7293C20.7209 20.9845 20.5572 21.2136 20.352 21.4019C20.1468 21.5901 19.9045 21.7335 19.6407 21.8227C19.3769 21.9119 19.0973 21.9451 18.8199 21.92C15.7428 21.5856 12.7869 20.5341 10.1899 18.85C7.77376 17.3147 5.72527 15.2662 4.18993 12.85C2.49991 10.2412 1.44818 7.27099 1.11993 4.18C1.09494 3.90347 1.12781 3.62476 1.21643 3.36162C1.30506 3.09849 1.4475 2.85669 1.6347 2.65162C1.82189 2.44655 2.04974 2.28271 2.30372 2.17052C2.55771 2.05833 2.83227 2.00026 3.10993 2H6.10993C6.59524 1.99522 7.06572 2.16708 7.43369 2.48353C7.80166 2.79999 8.04201 3.23945 8.10993 3.72C8.23656 4.68007 8.47138 5.62273 8.80993 6.53C8.94448 6.88792 8.9736 7.27691 8.89384 7.65088C8.81408 8.02485 8.6288 8.36811 8.35993 8.64L7.08993 9.91C8.51349 12.4135 10.5864 14.4864 13.0899 15.91L14.3599 14.64C14.6318 14.3711 14.9751 14.1858 15.3491 14.1061C15.723 14.0263 16.112 14.0555 16.4699 14.19C17.3772 14.5286 18.3199 14.7634 19.2799 14.89C19.7657 14.9585 20.2093 15.2032 20.5265 15.5775C20.8436 15.9518 21.0121 16.4296 20.9999 16.92Z"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <a class="link space-left" href="tel:+73952405164"
            >+7 (3952) 40-51-64</a
          >
        </div>
        <div class="line">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22 6L12 13L2 6"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <a class="link space-left" href="mailto:arshinskyv@istu.edu"
            >arshinskyv@istu.edu</a
          >
        </div>
        <div class="line">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 2L11 13"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22 2L15 22L11 13L2 9L22 2Z"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <a class="link space-left" href="https://t.me/vlarsh" target="_blank"
            >@vlarsh</a
          >
        </div>
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
        повлиять на ваше зачисленние в данный проект. Вы можете поменять
        приоритет в Личном кабинете, во вкладке Мои заявки, нажав кнопку
        "Редактирование заявки" и перенеся проект выше по приоритету.
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
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .header {
    margin-top: 4.75rem;
    margin-bottom: 2.8125rem;

    @media (max-width: $mobile-s) {
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

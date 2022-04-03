<template>
  <!-- project request modal -->
  <BaseModal size="m" :is-show="props.isShow" @close="emit('close')">
    <!-- HEADER -->
    <template #header>
      <h1>Отзыв об участии в проекте</h1>
      <h2>Платформа для размещения вузовских олимпиад</h2>
    </template>
    <!-- HEADER -->

    <!-- MAIN CONTENT -->
    <div class="author">
      <div class="avatar"><img :src="userMockUrl" alt="user" /></div>
      <div>
        <div class="name">Лукьянов Н.Д.</div>
        <div class="position">кандидат технических наук, доцент</div>
      </div>
    </div>

    <p class="feedback">
      Студент-практикант Ф.И.О. в период с 29.06.2015 г. по 12.07.2015 г.
      проходил учебно-ознакомительную практику в магазине ООО «Центральное»,
      расположенном по адресу: г. Южно-Сахалинск, ул. Ленина 218 в качестве
      помощника руководителя. <br />
      <br />
      В течение всего периода практики, Ф.И.О. внимательно и ответственно
      относился к выполняемой работе. Изучал методы управления и основные методы
      мотивации персонала, должностные обязанности персонала, пробовал проводить
      анализ хозяйственной деятельности организации за последние три года,
      ознакомился с порядком ведения различных распорядительных документов,
      учетной документации, изучал организационную структуру предприятия,
      участвовал в различной повседневной работе. <br />
      <br />
      Всю порученную работу выполнял добросовестно и в срок. Стремился
      приобретать новые знания, чтобы быть ещё более полезным на месте практики.
      Неоднократно оказывал помощь сотрудникам организации. Руководство
      организации оценивают работу Ф.И.О. на «отлично». <br />
      <br />
      Замечаний по прохождению практики к Ф.И.О. нет.
    </p>
    <!-- MAIN CONTENT -->
  </BaseModal>
</template>

<script setup lang="ts">
  import { withDefaults } from 'vue';
  import userMockUrl from '@/assets/images/user-mock.png';
  import BaseModal from './base/BaseModal.vue';

  type Props = { isShow: boolean };
  type Emits = { (e: 'close'): void };

  const props = withDefaults(defineProps<Props>(), { isShow: false });
  const emit = defineEmits<Emits>();
</script>

<style scoped>
  .author {
    display: flex;
    align-items: center;
    gap: 1.125rem;
    margin-bottom: 1.875rem;
  }
  .name {
    font-weight: 800;
    font-size: 1.5rem;
    line-height: 151.8%;
    color: var(--accent-color-1);
  }

  .position {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1.375rem;
    color: var(--gray-color-2);
  }
</style>

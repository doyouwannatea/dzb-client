<template>
  <BaseStub :title="title" :subtitle="subtitle">
    <template #button>
      <BaseButton
        is="router-link"
        case="uppercase"
        :to="{ name: RouteNames.HOME }"
      >
        {{ btn }}
      </BaseButton>
    </template>
  </BaseStub>
</template>

<script setup lang="ts">
  import { RouteNames } from '@/router/types/route-names';
  import BaseStub from './base/BaseStub.vue';
  import BaseButton from './base/BaseButton.vue';

  const title = 'Ни одной заявки :(';
  const subtitle =
    'Вы пока не выбрали ни одного проекта для прохождения проектной деятельности. Успейте выбрать хотя бы один проект до начала распределения';
  const btn = 'к списку проектов';
</script>

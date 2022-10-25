<template #button>
  <PageLayout>
    <div class="row">
      <div class="column" style="margin-right: 20%">
        <img class="img" src="@/assets/icons/404.svg?url" />
      </div>
      <div class="column">
        <text class="bigText"> 404 </text>
        <text class="mediumText"> Страница не найдена </text>
        <text class="smallText">
          Возможно, она была перемещена, или вы, просто, неверно указали адрес
          страницы.
        </text>
        <BaseButton
          is="router-link"
          case="uppercase"
          :to="{ name: RouteNames.HOME }"
        >
          {{ btn }}
        </BaseButton>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
  import { RouteNames } from '@/router/types/route-names';
  // components
  import PageLayout from '@/components/layout/PageLayout.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';

  const btn = 'вернуться на главную';
</script>

<style scoped>
  .row {
    position: absolute;
    top: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    transform: translate(25%, -80%);
  }

  .column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 474.5px;
  }

  .bigText {
    font-size: 96px;
    font-style: normal;
    font-weight: 800;
    line-height: 123px;
    color: var(--accent-color-1);
  }

  .mediumText {
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    color: var(--accent-color-1);
  }

  .smallText {
    padding-top: 5%;
    padding-bottom: 7.5%;
    font-size: 18px;
    font-style: normal;
    font-weight: normal;
    line-height: 150%;
    color: var(--gray-color-2);
  }
</style>

<template>
  <article class="card">
    <header class="header container">
      <h2 class="title">
        Платформа для размещения вузовских олимпиад lorem ipsum dolor sit amet,
        consectetur adipiscing elit
      </h2>
      <Badge class="status">новый</Badge>
      <div class="subtitle">Лукьянов Н.Д.</div>
    </header>
    <div class="divider"></div>
    <div class="body container">
      <ul class="list">
        <li>
          <b>Цель:</b> Создать платформу (страничку) для рекламы олимпиад.
        </li>
        <li>
          <b>Требования к студентам:</b> Знание основ верстки и дизайна
          веб-страниц.
        </li>
        <li><b>Сроки реализации:</b> 29.01.21 – 1.06.21</li>
        <li><b>Тип проекта:</b> Проектное обучение</li>
      </ul>
      <div class="info">
        <div class="team-counter">
          <span class="icon team-icon"></span>
          <span>0/13</span>
        </div>
        <div class="difficulty">
          <span class="icon star-icon"></span>
          <span>легко</span>
        </div>
      </div>
    </div>
    <footer class="footer container">
      <ul class="tag-list">
        <li><Tag>JavaScript</Tag></li>
        <li><Tag>Web</Tag></li>
        <li><Tag>Конференция</Tag></li>
        <li><Tag>Конференция</Tag></li>
        <li><Tag>Конференция</Tag></li>
        <li class="tag-btn">
          <Button variant="inline-link">+6 тегов</Button>
        </li>
      </ul>

      <div class="actions">
        <Button variant="outlined">Подать заявку</Button>
        <Button>Подробнее</Button>
      </div>
    </footer>
  </article>
</template>

<script setup lang="ts">
  import Badge from './Badge.vue';
  import Button from '../controls/Button.vue';
  import Tag from './Tag.vue';
</script>

<style scoped>
  .card {
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.18);
    border-radius: 10px;
    border-left: 20px solid var(--accent-color-1);
    padding-top: 22px;
    padding-bottom: 22px;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 54px;
  }

  .header {
    padding-bottom: 20px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 13px;
  }

  .tag-list {
    list-style: none;
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag-btn {
    display: flex;
    align-items: center;
  }

  .actions {
    display: flex;
    gap: 12px;
    align-self: flex-end;
  }

  .info {
    display: flex;
    justify-content: flex-end;
    font-size: 18px;
    line-height: 23px;
    gap: 22px;
    margin-top: 10px;
  }

  .team-counter,
  .difficulty {
    display: flex;
    align-items: center;
    gap: 9px;
  }

  .difficulty {
    color: var(--text-color);
  }

  .team-counter {
    color: var(--accent-color-1);
  }

  .icon {
    width: 24px;
    height: 24px;
    background: center / contain no-repeat;
  }

  .team-icon {
    background-image: url('../assets/team.svg');
  }

  .star-icon {
    background-image: url('../assets/star.svg');
  }

  .container {
    padding-left: 20px;
    padding-right: 20px;
  }

  .divider {
    width: 100%;
    height: 2px;
    background-color: var(--gray-color-1);
  }

  .title {
    font-weight: 600;
    font-size: 24px;
    line-height: 31px;
    color: #4f5569;
    max-width: 705px;
  }

  .subtitle {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #4f5569;
  }

  .status {
    align-self: baseline;
    justify-self: flex-end;
  }

  .body {
    padding-top: 37px;
    padding-bottom: 26px;
  }

  .list {
    padding-left: 0;
  }

  .list > li {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: var(--text-color);
    list-style: none;
  }
  .list > li:not(:last-child) {
    margin-bottom: 17px;
  }
</style>

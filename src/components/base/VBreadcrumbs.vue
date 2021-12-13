<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs-item">
      <a class="breadcrumbs-link" href="#">Все проекты</a>
    </li>
    <li class="breadcrumbs-item">
      Платформа для размещения вузовских олимпиад
    </li>
  </ul>
</template>

<style scoped>
  .breadcrumbs {
    padding-left: 0;
    list-style: none;
    display: flex;
  }
  .breadcrumbs-item {
    font-family: 'Montserrat';
    font-size: 14px;
    font-weight: 400;
    line-height: normal;

    color: #7b7b7b;
  }
  .breadcrumbs-item:not(:last-child)::after {
    content: '/';
    margin-left: 6px;
    margin-right: 6px;
    color: var(--text-color);
  }
  .breadcrumbs-link {
    color: var(--text-color);
    text-decoration: none;
  }
  .breadcrumbs-link:hover {
    text-decoration: underline;
  }
</style>

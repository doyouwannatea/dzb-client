<template>
  <input
    class="input search-input"
    type="text"
    name="search"
    placeholder="Введите название проекта для поиска..."
  />
</template>

<style scoped>
  .search-input {
    max-width: 694px;
    height: 57px;
    padding-left: 17px;
    padding-right: 68px;
    background: url('../assets/search.svg') calc(100% - 17px) center / 34px
      no-repeat #ffffff;
    line-height: 23px;
    font-weight: 400;
  }
</style>

<template>
  <input
    class="search-input"
    type="text"
    name="search"
    placeholder="Введите название проекта для поиска..."
  />
</template>

<style scoped>
  .search-input {
    width: 100%;
    max-width: 694px;
    height: 57px;
    padding-left: 17px;
    padding-right: 68px;
    background: url('../assets/search.svg') calc(100% - 17px) center / 34px
      no-repeat;
    background-color: #ffffff;
    border: 1px solid var(--gray-color-1);
    border-radius: 5px;

    font-size: 18px;
    line-height: 23px;
    font-weight: 400;
  }

  .search-input::placeholder {
    color: var(--gray-color-2);
  }
</style>

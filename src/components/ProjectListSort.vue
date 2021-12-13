<template>
  <fieldset class="sort">
    <label for="project-sort">Сортировка: </label>
    <select id="project-sort" class="sort-input" name="project-sort">
      <option class="option" selected value="По сроку">По сроку</option>
      <option class="option" value="По сложности">По сложности</option>
      <option class="option" value="По кол-ву свободных мест">
        По кол-ву свободных мест
      </option>
    </select>
  </fieldset>
</template>

<style scoped>
  .sort {
    border: 0;
    padding: 0;
  }
  .sort-input {
    display: inline-block;
    width: 200px;
    padding: 0.2rem;
    border: 0;
    background-color: transparent;

    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: 'Mont';
    font-style: normal;
    font-weight: 400;
    color: #485ea4;
    font-size: 18px;
    line-height: 23px;
  }

  .sort-input:focus {
    outline: none;
  }
  .sort-input:focus-visible {
    outline: 1px solid black;
  }

  .option {
    color: var(--text-color);
  }
</style>

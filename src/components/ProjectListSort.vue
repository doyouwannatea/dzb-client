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
    width: 150px;
    padding: 0.2rem;
    padding-right: 1.5em;
    border: 0;
    background-color: transparent;

    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: 'Mont';
    font-style: normal;
    font-weight: 400;
    color: #485ea4;
    font-size: 1.125rem;
    line-height: 1.4375rem;

    appearance: none;
    background: url(../assets/icons/arrow.svg) right / contain no-repeat;
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

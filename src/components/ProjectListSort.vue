<template>
  <!-- UNDER DEV  -->
  <fieldset v-if="false" class="sort">
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
    padding: 0;
    border: 0;
  }
  .sort-input {
    display: inline-block;
    width: 150px;
    padding: 0.2rem;
    padding-right: 1.5em;
    font-family: 'Mont', Arial, Helvetica, sans-serif;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.4375rem;
    color: #485ea4;
    text-overflow: ellipsis;

    white-space: nowrap;
    background: url(../assets/icons/arrow.svg) right / contain no-repeat;
    background-color: transparent;
    border: 0;

    appearance: none;
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

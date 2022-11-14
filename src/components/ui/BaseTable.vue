<template>
  <BasePanel class="panel">
    <table>
      <tr>
        <slot
          v-for="(header, index) in $props.headers"
          v-bind="{ header, index }"
          :key="header"
          name="header"
        >
          <th>{{ header }}</th>
        </slot>
      </tr>
      <slot
        v-for="({ data: row, key }, rowIndex) in rows"
        v-bind="{ row, key, index: rowIndex }"
        :key="key || rowIndex"
        name="row"
      >
        <tr>
          <td v-for="(column, columnIndex) in row" :key="columnIndex">
            {{ column }}
          </td>
        </tr>
      </slot>
    </table>
  </BasePanel>
</template>

<script setup lang="ts">
  import BasePanel from '@/components/ui/BasePanel.vue';

  export type ColumnData = string | number;
  export type RowData = { key?: string; data: ColumnData[] };

  interface Props {
    headers: string[];
    rows: RowData[];
  }

  defineProps<Props>();
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints.scss';

  table {
    width: 100%;
    font-size: 1.25rem;
    color: #737373;
    text-align: left;
    border-collapse: collapse;

    &:deep(th) {
      font-weight: 800;
      color: var(--text-color);
    }

    &:deep(td),
    &:deep(th) {
      padding-top: 1.4375rem;
      padding-bottom: 1.4375rem;
      border-bottom: 1px solid #e5f1ea;

      @media (max-width: $mobile-s) {
        padding-right: 0.8rem;
        padding-left: 0.8rem;
        white-space: nowrap;
      }
    }

    &:deep(th:first-child),
    &:deep(td:first-child) {
      padding-right: 0.625rem;
      padding-left: 0.625rem;
      text-align: center;
    }

    &:deep(tr:last-child > td) {
      border-bottom: none;
    }
  }

  .panel {
    padding-top: 0;
    padding-right: 0;
    padding-left: 0;

    @media (max-width: $mobile-s) {
      overflow-x: scroll;
    }
  }
</style>

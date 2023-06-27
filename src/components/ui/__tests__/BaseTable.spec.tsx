import { mount } from '@vue/test-utils';
import { getTestId } from '@/helpers/tests';
import BaseTable, { RowData } from '../BaseTable.vue';

const initialHeaders: string[] = ['Номер', 'Имя', 'Фамилия', 'Группа'];

const initialRows: RowData[] = [
  { data: ['1', 'Венедикт', 'Зуев', 'ИСТб-19-1'], key: '1' },
  { data: ['2', 'Петров', 'Кирилл', 'ИСТб-19-1'], key: '2' },
  { data: ['3', 'Никифоров', 'Артём', 'ИСТб-19-1'], key: '3' },
];

describe('BaseTable.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = mount(BaseTable);
    const table = wrapper.find('table');
    expect(table.exists()).toBeTruthy();
  });

  describe(':props', () => {
    it('правильно отображаются все переданные ячейки', async () => {
      const wrapper = mount(BaseTable, {
        props: {
          headers: initialHeaders,
          rows: initialRows,
        },
      });

      const header = wrapper.find(getTestId('header'));
      const thList = header.findAll('th');

      expect(thList).toHaveLength(initialHeaders.length);
      expect(thList.map((th) => th.text())).toEqual(initialHeaders);

      const rowList = wrapper.findAll(getTestId('row'));
      expect(rowList).toHaveLength(initialRows.length);
      rowList.forEach((row, index) => {
        const tdList = row.findAll('td');
        expect(tdList.map((td) => td.text())).toEqual(initialRows[index].data);
      });
    });
  });
});

import { ProjectListResponse } from '@/api/ProjectApi/IProjectApi';
import { Type } from '../Project';
import { State, StateID } from '../ProjectState';
import { participationList } from './participation';
import { skills } from './project-skills';

const recruitingState: State = {
  state: 'идёт набор',
  id: StateID.RecruitingState,
};
const activeState: State = {
  state: 'активный',
  id: StateID.ActiveState,
};
const extraState: State = {
  state: 'добор',
  id: StateID.ExtraState,
};
const archivedState: State = {
  state: 'в архиве',
  id: StateID.ArchivedState,
};

export const states: State[] = [
  recruitingState,
  activeState,
  extraState,
  archivedState,
];

export const types: Type[] = [
  {
    id: 2,
    type: 'Проектное обучение',
  },
  {
    id: 3,
    type: 'Научная деятельность',
  },
];

export const projectListResponse: ProjectListResponse = {
  projectCount: 6,
  data: [
    {
      id: 10,
      title: 'Какой то первый проект',
      places: 12,
      goal: 'Помощь студентам при выборе тем ВКР и руководителей на основе исторического архива',
      idea: 'Реализовать веб-приложение позволяющее преподавателям заносить в базу данных темы и рефераты защищенных ВКР за предыдущие годы, а также указывать свои области интересов. Предусмотреть возможность просмотра студентами тем и рефератов ВКР с возможностью наложения фильтров по преподавателям и специальностям',
      difficulty: 1,
      date_start: '2020-09-01',
      date_end: '2020-12-20',
      requirements:
        'Умения: проектирование БД, разработка информационной архитектуры и макетов экранов\r\nТехнологии: PHP, СУБД MySQL, JQ, HTML5+CSS, Bootstrap',
      customer: 'Институт ИТиАД',
      product_result:
        'разработка модели данных, функциональных моделей для всех типов пользователей (администратор, преподаватель, студент), макеты интерфейсов пользователей, реализация БД. Прототип систем (выбор средств реализации, фрагменты серверной части и черновая верстка веб-страниц)',
      additional_inf:
        'Предусмотреть кабинет администратора и кабинет руководителя ВКР',
      study_result: 'учебный результат',
      updated_at: '2020-11-21 09:43:22',
      created_at: '1',
      skills: [skills[0], skills[1], skills[2]],
      type: {
        id: 1,
        type: 'Прикладной',
      },
      supervisor: {
        fio: 'Аршинский Вадим Леонидович',
        email: 'some-email@gmail.com',
        id: 1,
        position: 'руководитель',
      },
      state: activeState,
      description: 'описание',
      participations: participationList,
      participant_feedback: null,
    },
    {
      id: 11,
      title: 'Проект №2 👆',
      places: 12,
      goal: 'Помощь студентам при выборе тем ВКР и руководителей на основе исторического архива',
      idea: 'Реализовать веб-приложение позволяющее преподавателям заносить в базу данных темы и рефераты защищенных ВКР за предыдущие годы, а также указывать свои области интересов. Предусмотреть возможность просмотра студентами тем и рефератов ВКР с возможностью наложения фильтров по преподавателям и специальностям',
      difficulty: 1,
      date_start: '2020-09-01',
      date_end: '2020-12-20',
      requirements:
        'Умения: проектирование БД, разработка информационной архитектуры и макетов экранов\r\nТехнологии: PHP, СУБД MySQL, JQ, HTML5+CSS, Bootstrap',
      customer: 'Институт ИТиАД',
      product_result:
        'разработка модели данных, функциональных моделей для всех типов пользователей (администратор, преподаватель, студент), макеты интерфейсов пользователей, реализация БД. Прототип систем (выбор средств реализации, фрагменты серверной части и черновая верстка веб-страниц)',
      additional_inf:
        'Предусмотреть кабинет администратора и кабинет руководителя ВКР',
      study_result: 'учебный результат',
      updated_at: '2020-11-21 09:43:22',
      created_at: '1',
      skills: [skills[0], skills[1], skills[2]],
      type: {
        id: 1,
        type: 'Прикладной',
      },
      supervisor: {
        fio: 'Аршинский Вадим Леонидович',
        email: 'some-email@gmail.com',
        id: 1,
        position: 'руководитель',
      },
      state: activeState,
      description: 'описание',
      participations: participationList,
      participant_feedback: null,
    },
    {
      id: 12,
      title: 'Ну и третий проект 👌',
      places: 12,
      goal: 'Помощь студентам при выборе тем ВКР и руководителей на основе исторического архива',
      idea: 'Реализовать веб-приложение позволяющее преподавателям заносить в базу данных темы и рефераты защищенных ВКР за предыдущие годы, а также указывать свои области интересов. Предусмотреть возможность просмотра студентами тем и рефератов ВКР с возможностью наложения фильтров по преподавателям и специальностям',
      difficulty: 1,
      date_start: '2020-09-01',
      date_end: '2020-12-20',
      requirements:
        'Умения: проектирование БД, разработка информационной архитектуры и макетов экранов\r\nТехнологии: PHP, СУБД MySQL, JQ, HTML5+CSS, Bootstrap',
      customer: 'Институт ИТиАД',
      product_result:
        'разработка модели данных, функциональных моделей для всех типов пользователей (администратор, преподаватель, студент), макеты интерфейсов пользователей, реализация БД. Прототип систем (выбор средств реализации, фрагменты серверной части и черновая верстка веб-страниц)',
      additional_inf:
        'Предусмотреть кабинет администратора и кабинет руководителя ВКР',
      study_result: 'учебный результат',
      updated_at: '2020-11-21 09:43:22',
      created_at: '1',
      skills: [skills[0], skills[1], skills[2]],
      type: {
        id: 1,
        type: 'Прикладной',
      },
      supervisor: {
        fio: 'Аршинский Вадим Леонидович',
        email: 'some-email@gmail.com',
        id: 1,
        position: 'руководитель',
      },
      state: activeState,
      description: 'описание',
      participations: participationList,
      participant_feedback: null,
    },
  ],
};

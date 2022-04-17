import { ProjectListResponse } from '@/api/ProjectApi/IProjectApi';
import { State, Skill, Type } from '../Project';

const recruitingState: State = {
  state: 'идёт набор',
  id: 1,
  created_at: '',
  updated_at: '',
};
const activeState: State = {
  state: 'активный',
  id: 2,
  created_at: '',
  updated_at: '',
};
const extraState: State = {
  state: 'добор',
  id: 3,
  created_at: '',
  updated_at: '',
};
const archivedState: State = {
  state: 'в архиве',
  id: 4,
  created_at: '',
  updated_at: '',
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
    created_at: '',
    updated_at: '',
  },
  {
    id: 3,
    type: 'Научная деятельность',
    created_at: '',
    updated_at: '',
  },
];

export const skills: Skill[] = [
  {
    id: 1,
    skill: 'Web',
    created_at: '',
    updated_at: '',
    pivot: {
      project_id: 1,
      skill_id: 1,
    },
  },
  {
    id: 2,
    skill: 'Mobile',
    created_at: '',
    updated_at: '',
    pivot: {
      project_id: 1,
      skill_id: 1,
    },
  },
  {
    id: 3,
    skill: 'Конференция',
    created_at: '',
    updated_at: '',
    pivot: {
      project_id: 1,
      skill_id: 1,
    },
  },
  {
    id: 4,
    skill: 'Обучение',
    created_at: '',
    updated_at: '',
    pivot: {
      project_id: 1,
      skill_id: 1,
    },
  },
  {
    id: 5,
    skill: 'Коммерческий',
    created_at: '',
    updated_at: '',
    pivot: {
      project_id: 1,
      skill_id: 1,
    },
  },
  {
    id: 6,
    skill: 'Долгосрочный',
    created_at: '',
    updated_at: '',
    pivot: {
      project_id: 1,
      skill_id: 1,
    },
  },
  {
    id: 7,
    skill: 'Неординарный',
    created_at: '',
    updated_at: '',
    pivot: {
      project_id: 1,
      skill_id: 1,
    },
  },
];

export const projectListResponse: ProjectListResponse = {
  projectCount: 6,
  data: [
    {
      id: 10,
      title: 'Помощь в доработке ВКР',
      places: 12,
      goal: 'Помощь студентам при выборе тем ВКР и руководителей на основе исторического архива',
      idea: 'Реализовать веб-приложение позволяющее преподавателям заносить в базу данных темы и рефераты защищенных ВКР за предыдущие годы, а также указывать свои области интересов. Предусмотреть возможность просмотра студентами тем и рефератов ВКР с возможностью наложения фильтров по преподавателям и специальностям',
      difficulty: 1,
      date_start: '2020-09-01',
      date_end: '2020-12-20',
      requirements:
        'Умения: проектирование БД, разработка информационной архитектуры и макетов экранов\r\nТехнологии: PHP, СУБД MySQL, JQ, HTML5+CSS, Bootstrap',
      customer: 'Институт ИТиАД',
      expected_result:
        'разработка модели данных, функциональных моделей для всех типов пользователей (администратор, преподаватель, студент), макеты интерфейсов пользователей, реализация БД. Прототип систем (выбор средств реализации, фрагменты серверной части и черновая верстка веб-страниц)',
      additional_inf:
        'Предусмотреть кабинет администратора и кабинет руководителя ВКР',
      result: null,
      updated_at: '2020-11-21 09:43:22',
      created_at: '1',
      skills: [skills[0], skills[1], skills[2]],
      type: {
        id: 1,
        type: 'Прикладной',
        created_at: '',
        updated_at: '',
      },
      supervisor: {
        fio: 'Аршинский Вадим Леонидович',
        api_token: null,
        created_at: '',
        updated_at: '',
        email: 'some-email@gmail.com',
        id: 1,
        position: 'руководитель',
      },
      state: activeState,
    },
    {
      id: 11,
      title: 'Архив ВКР (1 этап)',
      places: 7,
      goal: 'Помощь студентам при выборе тем ВКР и руководителей на основе исторического архива',
      idea: 'Реализовать веб-приложение позволяющее преподавателям заносить в базу данных темы и рефераты защищенных ВКР за предыдущие годы, а также указывать свои области интересов. Предусмотреть возможность просмотра студентами тем и рефератов ВКР с возможностью наложения фильтров по преподавателям и специальностям',
      difficulty: 2,
      date_start: '2020-09-01',
      date_end: '2020-12-20',
      requirements:
        'Умения: проектирование БД, разработка информационной архитектуры и макетов экранов\r\nТехнологии: PHP, СУБД MySQL, JQ, HTML5+CSS, Bootstrap',
      customer: 'Институт ИТиАД',
      expected_result:
        'разработка модели данных, функциональных моделей для всех типов пользователей (администратор, преподаватель, студент), макеты интерфейсов пользователей, реализация БД. Прототип систем (выбор средств реализации, фрагменты серверной части и черновая верстка веб-страниц)',
      additional_inf:
        'Предусмотреть кабинет администратора и кабинет руководителя ВКР',
      result: null,
      updated_at: '2020-11-21 09:43:22',
      created_at: '1',
      skills: [skills[0], skills[1], skills[3]],
      type: {
        id: 1,
        type: 'Прикладной',
        created_at: '',
        updated_at: '',
      },
      supervisor: {
        fio: 'Аршинский Вадим Леонидович',
        api_token: null,
        created_at: '',
        updated_at: '',
        email: 'some-email@gmail.com',
        id: 1,
        position: 'руководитель',
      },
      state: extraState,
    },
    {
      id: 13,
      title: 'Реализовать базу данных для проекта "Архив ВКР (1 этап)"',
      places: 4,
      goal: 'Помощь студентам при выборе тем ВКР и руководителей на основе исторического архива',
      idea: 'Реализовать веб-приложение позволяющее преподавателям заносить в базу данных темы и рефераты защищенных ВКР за предыдущие годы, а также указывать свои области интересов. Предусмотреть возможность просмотра студентами тем и рефератов ВКР с возможностью наложения фильтров по преподавателям и специальностям',
      difficulty: 3,
      date_start: '2020-09-01',
      date_end: '2020-12-20',
      requirements:
        'Умения: проектирование БД, разработка информационной архитектуры и макетов экранов\r\nТехнологии: PHP, СУБД MySQL, JQ, HTML5+CSS, Bootstrap',
      customer: 'Институт ИТиАД',
      expected_result:
        'разработка модели данных, функциональных моделей для всех типов пользователей (администратор, преподаватель, студент), макеты интерфейсов пользователей, реализация БД. Прототип систем (выбор средств реализации, фрагменты серверной части и черновая верстка веб-страниц)',
      additional_inf:
        'Предусмотреть кабинет администратора и кабинет руководителя ВКР',
      result: null,
      updated_at: '2020-11-21 09:43:22',
      created_at: '1',
      skills: [skills[5], skills[4]],
      type: {
        id: 1,
        type: 'Прикладной',
        created_at: '',
        updated_at: '',
      },
      supervisor: {
        fio: 'Аршинский Вадим Леонидович',
        api_token: null,
        created_at: '',
        updated_at: '',
        email: 'some-email@gmail.com',
        id: 1,
        position: 'руководитель',
      },
      state: recruitingState,
    },
    {
      id: 16,
      title: 'Архив ВКР (1 этап)',
      places: 3,
      goal: 'Помощь студентам при выборе тем ВКР и руководителей на основе исторического архива',
      idea: 'Реализовать веб-приложение позволяющее преподавателям заносить в базу данных темы и рефераты защищенных ВКР за предыдущие годы, а также указывать свои области интересов. Предусмотреть возможность просмотра студентами тем и рефератов ВКР с возможностью наложения фильтров по преподавателям и специальностям',
      difficulty: 1,
      date_start: '2020-09-01',
      date_end: '2020-12-20',
      requirements:
        'Умения: проектирование БД, разработка информационной архитектуры и макетов экранов\r\nТехнологии: PHP, СУБД MySQL, JQ, HTML5+CSS, Bootstrap',
      customer: 'Институт ИТиАД',
      expected_result:
        'разработка модели данных, функциональных моделей для всех типов пользователей (администратор, преподаватель, студент), макеты интерфейсов пользователей, реализация БД. Прототип систем (выбор средств реализации, фрагменты серверной части и черновая верстка веб-страниц)',
      additional_inf:
        'Предусмотреть кабинет администратора и кабинет руководителя ВКР',
      result:
        'Выполнено проектирование данных, разработаны функциональные моделей для всех типов пользователей (администратор, преподаватель, студент), макеты интерфейсов пользователей, выполнена реализация БД. Реализованный прототип отображает список ВКР из БД.',
      updated_at: '2020-11-21 09:43:22',
      created_at: '1',
      skills: [skills[6]],
      type: {
        id: 1,
        type: 'Прикладной',
        created_at: '',
        updated_at: '',
      },
      supervisor: {
        fio: 'Аршинский Вадим Леонидович',
        api_token: null,
        created_at: '',
        updated_at: '',
        email: 'some-email@gmail.com',
        id: 1,
        position: 'руководитель',
      },
      state: archivedState,
      participant_feedback: `
Студент-практикант Ф.И.О. в период с 29.06.2015 г. по 12.07.2015 г.
проходил учебно-ознакомительную практику в магазине ООО «Центральное»,
расположенном по адресу: г. Южно-Сахалинск, ул. Ленина 218 в качестве
помощника руководителя. 

В течение всего периода практики, Ф.И.О. внимательно и ответственно
относился к выполняемой работе. Изучал методы управления и основные методы
мотивации персонала, должностные обязанности персонала, пробовал проводить
анализ хозяйственной деятельности организации за последние три года,
ознакомился с порядком ведения различных распорядительных документов,
учетной документации, изучал организационную структуру предприятия,
участвовал в различной повседневной работе. 

Всю порученную работу выполнял добросовестно и в срок. Стремился
приобретать новые знания, чтобы быть ещё более полезным на месте практики.
Неоднократно оказывал помощь сотрудникам организации. Руководство
организации оценивают работу Ф.И.О. на «отлично». 

Замечаний по прохождению практики к Ф.И.О. нет.
      `,
    },
    {
      id: 17,
      title: 'Архив ВКР (1 этап)',
      places: 3,
      goal: 'Помощь студентам при выборе тем ВКР и руководителей на основе исторического архива',
      idea: 'Реализовать веб-приложение позволяющее преподавателям заносить в базу данных темы и рефераты защищенных ВКР за предыдущие годы, а также указывать свои области интересов. Предусмотреть возможность просмотра студентами тем и рефератов ВКР с возможностью наложения фильтров по преподавателям и специальностям',
      difficulty: 1,
      date_start: '2020-09-01',
      date_end: '2020-12-20',
      requirements:
        'Умения: проектирование БД, разработка информационной архитектуры и макетов экранов\r\nТехнологии: PHP, СУБД MySQL, JQ, HTML5+CSS, Bootstrap',
      customer: 'Институт ИТиАД',
      expected_result:
        'разработка модели данных, функциональных моделей для всех типов пользователей (администратор, преподаватель, студент), макеты интерфейсов пользователей, реализация БД. Прототип систем (выбор средств реализации, фрагменты серверной части и черновая верстка веб-страниц)',
      additional_inf:
        'Предусмотреть кабинет администратора и кабинет руководителя ВКР',
      result: null,
      updated_at: '2020-11-21 09:43:22',
      created_at: '1',
      skills: skills,
      type: {
        id: 1,
        type: 'Прикладной',
        created_at: '',
        updated_at: '',
      },
      supervisor: {
        fio: 'Аршинский Вадим Леонидович',
        api_token: null,
        created_at: '',
        updated_at: '',
        email: 'some-email@gmail.com',
        id: 1,
        position: 'руководитель',
      },
      state: activeState,
    },
    {
      id: 19,
      title: 'Архив ВКР (1 этап)',
      places: 3,
      goal: 'Помощь студентам при выборе тем ВКР и руководителей на основе исторического архива',
      idea: 'Реализовать веб-приложение позволяющее преподавателям заносить в базу данных темы и рефераты защищенных ВКР за предыдущие годы, а также указывать свои области интересов. Предусмотреть возможность просмотра студентами тем и рефератов ВКР с возможностью наложения фильтров по преподавателям и специальностям',
      difficulty: 1,
      date_start: '2020-09-01',
      date_end: '2020-12-20',
      requirements:
        'Умения: проектирование БД, разработка информационной архитектуры и макетов экранов\r\nТехнологии: PHP, СУБД MySQL, JQ, HTML5+CSS, Bootstrap',
      customer: 'Институт ИТиАД',
      expected_result:
        'разработка модели данных, функциональных моделей для всех типов пользователей (администратор, преподаватель, студент), макеты интерфейсов пользователей, реализация БД. Прототип систем (выбор средств реализации, фрагменты серверной части и черновая верстка веб-страниц)',
      additional_inf:
        'Предусмотреть кабинет администратора и кабинет руководителя ВКР',
      result: null,
      updated_at: '2020-11-21 09:43:22',
      created_at: '1',
      skills: [skills[6], skills[5], skills[2]],
      type: {
        id: 1,
        type: 'Прикладной',
        created_at: '',
        updated_at: '',
      },
      supervisor: {
        fio: 'Аршинский Вадим Леонидович',
        api_token: null,
        created_at: '',
        updated_at: '',
        email: 'some-email@gmail.com',
        id: 1,
        position: 'руководитель',
      },
      state: activeState,
    },
  ],
};

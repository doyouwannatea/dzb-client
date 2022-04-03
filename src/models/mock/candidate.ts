import { Candidate } from '../Candidate';

export const candidate: Candidate = {
  id: 2,
  fio: 'Малыгина Елена',
  about: 'Информация обо мне',
  email: 'example.example@.com',
  phone: '+7 777 777 77 77',
  numz: '11111111',
  course: 3,
  training_group: 'АСУб-19-1',
  skills: [
    {
      id: 2,
      skill: 'CSS',
      created_at: '',
      updated_at: '',
      pivot: {
        project_id: 1,
        skill_id: 1,
      },
    },
  ],
  api_token: 'api_token test token',
};

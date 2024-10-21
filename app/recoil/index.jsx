  import { atom } from 'recoil';

  export const userState = atom({
    key: 'userState',
    default: {
      email: '',
      password: '',
      imageUri: '',
      name: '',
      userId: '',
      userIdFilter: '',
      text: '',
      tags: [],
    },
  });

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
      text: 'よろしくお願いします！よろしくお願いします！よろしくお願いします！よろしくお願いします！よろしくお願いします！',
      tagList: [
        { id: 0, name: 'ポケモンGO', imgUrl: require(`../../assets/images/tagsIconA.png`), selected: false },
        { id: 1, name: '原神', imgUrl: require(`../../assets/images/tagsIconB.png`), selected: false },
        { id: 2, name: 'スターレイル', imgUrl: require(`../../assets/images/tagsIconC.png`), selected: false },
        { id: 3, name: 'ゼンレスゾーンゼロ', imgUrl: require(`../../assets/images/tagsIconD.png`), selected: false },
        { id: 4, name: 'サマナーズウォー', imgUrl: require(`../../assets/images/tagsIconE.png`), selected: false },
      ],
    },
  });

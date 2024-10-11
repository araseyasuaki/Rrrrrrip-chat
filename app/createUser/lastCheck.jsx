import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ImgPick from '../compData/imgPick';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil';

const LastCheck = () => {

  const  userData = useRecoilValue(userState);

  return (
    <View style={s.container}>

      <Text style={s.mainTitle}>最終確認</Text>
      <Text style={s.mainText}>もう一度入力したプロフィールを確認しよう！</Text>

      <ImgPick/>

      <Text>{userData.name}</Text>
      <Text>{userData.userId}</Text>
      <Text>{userData.text}</Text>

    </View>
  );
};

const s = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
  },
  mainText: {
    fontSize: 14,
    width: '100%',
    marginBottom: 50,
  },
});

export default LastCheck;
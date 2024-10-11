import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ImgPick from '../compData/imgPick';

const Icon = () => {

  return (
    <View style={s.container}>

      <Text style={s.mainTitle}>アイコンを選ぼう</Text>
      <Text style={s.mainText}>自分の顔となる写真を選ぼう</Text>

      <ImgPick/>

    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
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

export default Icon;

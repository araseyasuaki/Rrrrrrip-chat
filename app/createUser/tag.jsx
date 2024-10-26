import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil'; // userStateのパスを修正
import TagChoice from '../compData/tagChoice';

const Tag = () => {

  return (
    <View style={s.container}>
      <Text style={s.mainTitle}>好きなタブを選ぶ</Text>
      <Text style={s.mainText}>好きなジャンルのタグを選んでみんなに共有して親交を深めよう！</Text>

      <TagChoice/>

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
    marginBottom: 30,
  },
});

export default Tag;

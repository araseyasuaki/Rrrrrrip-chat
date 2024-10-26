import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import ProfileForm from '../compData/profileForm'

const UserData = () => {

  return (
    <View style={s.container}>

      <Text style={s.mainTitle}>プロフィール情報を入力</Text>
      <Text style={s.mainText}>他のユーザーから見える情報です。アピールできることを書き込もう！</Text>

      <ProfileForm/>

    </View>
  );
};

const s = StyleSheet.create({
  container: {
    width: '100%',
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainText: {
    fontSize: 14,
    marginBottom: 30,
  },
});

export default UserData;

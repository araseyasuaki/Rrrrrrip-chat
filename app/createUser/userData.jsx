import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import ProfileForm from '../compData/profileForm'

const UserData = () => {

  return (
    <View style={s.container}>

      <ProfileForm/>

    </View>
  );
};

const s = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
});

export default UserData;

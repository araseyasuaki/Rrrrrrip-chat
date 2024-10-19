import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil';

const LastCheck = () => {
  const userData = useRecoilValue(userState);

  return (
    <View style={styles.container}>
        <Text style={styles.mainTitle}>最終確認</Text>
        <Text style={styles.mainText}>最後にもう一度入力したプロフィールが間違っていないかを確認しよう！</Text>

        <View style={styles.profileContainer}>
          <Image
            style={styles.iconImg}
            source={userData.imageUri ? { uri: userData.imageUri } : require('../../assets/images/iconImg.png')}
          />
          <Text style={styles.profileText}>名前: {userData.name}</Text>
          <Text style={styles.profileText}>ユーザーID: {userData.userId}</Text>
          <Text style={styles.profileText}>自己紹介: {userData.text}</Text>
          {/* ダミーテキストで確認用 */}
          <Text style={styles.profileText}>名前: {userData.name}</Text>
          <Text style={styles.profileText}>ユーザーID: {userData.userId}</Text>
          <Text style={styles.profileText}>自己紹介: {userData.text}</Text>
          <Text style={styles.profileText}>名前: {userData.name}</Text>
          <Text style={styles.profileText}>ユーザーID: {userData.userId}</Text>
          <Text style={styles.profileText}>自己紹介: {userData.text}</Text>
          <Text style={styles.profileText}>名前: {userData.name}</Text>
          <Text style={styles.profileText}>ユーザーID: {userData.userId}</Text>
          <Text style={styles.profileText}>自己紹介: {userData.text}</Text>
          <Text style={styles.profileText}>名前: {userData.name}</Text>
          <Text style={styles.profileText}>ユーザーID: {userData.userId}</Text>
          <Text style={styles.profileText}>自己紹介: {userData.text}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 114,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainText: {
    fontSize: 16,
    marginBottom: 50,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconImg: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 50,
  },
  profileText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default LastCheck;

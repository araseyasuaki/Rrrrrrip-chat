import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil';
import { getAuth } from '../firebase'

const LastCheck = () => {
  const userData = useRecoilValue(userState);
  const tags = userData.tagList.filter(tag => tag.selected);
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(userData)

  return (
    <View style={s.container}>
      <Text style={s.mainTitle}>最終確認</Text>
      <Text style={s.mainText}>最後にもう一度入力したプロフィールが間違っていないかを確認しよう！</Text>

      <Image style={s.iconImg} source={{ uri: userData.imageUri }} />

      <View style={s.nameContainer}>
        <Text style={s.profileName}>{userData.name}</Text>
        <View style={s.decBer} />
        <Text style={s.profileId}>{userData.userId}</Text>
      </View>

      <View style={s.textContainer}>
        <Text>{userData.text}</Text>
      </View>

      <View style={s.tagsBox}>
        {tags.map(tag => (
          <View key={tag.id} style={s.tagsContainer}>
            <Image source={tag.imgUrl} style={s.tagImage} />
            <Text style={s.tagText}>{tag.name}</Text>
          </View>
        ))}
      </View>
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
    marginBottom: 30,
    width: '100%',
  },
  iconImg: {
    width: '45%',
    maxWidth: 200,
    aspectRatio: 1,
    borderRadius: 100,
  },
  nameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  profileName: {
    fontSize: 16,
  },
  decBer: {
    width: '100%',
    height: 1,
    backgroundColor: '#000',
    marginVertical: 3,
  },
  profileId: {
    fontSize: 14,
  },
  textContainer: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    padding: 13.5,
    marginTop: 16,
  },
  tagsBox: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 11,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#000',
    margin: 5,
  },
  tagImage: {
    width: 20,
    height: 20,
  },
  tagText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 6,
  },
});

export default LastCheck;

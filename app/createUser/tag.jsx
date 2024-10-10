import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil'; // userStateのパスを修正

const Tag = () => {
  const [userData, setUserData] = useRecoilState(userState);
  const [tags, setTags] = useState({
    ポケモンGO: false,
    原神: false,
    スターレイル: false,
    ゼンレスゾーンゼロ: false,
    サマナーズウォー: false,
  });

  const handleTagToggle = (tag) => {
    const newTags = { ...tags, [tag]: !tags[tag] };
    setTags(newTags);
    setUserData(prev => ({ ...prev, tags: newTags }));
  };

  return (
    <View style={s.container}>

      <Text style={s.mainTitle}>好きなタブを選ぶ</Text>
      <Text style={s.mainText}>好きなジャンルのタグを選んでみんなに共有して親交を深めよう！</Text>

      <View style={s.tags}>

        <Text style={s.tagsTitle}>ゲーム</Text>
        <View style={s.underline} />

        <View style={s.tagsContainer}>
          {Object.keys(tags).map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[s.tagButton, tags[tag] && s.selectedTag]}
              onPress={() => handleTagToggle(tag)}
            >
              <View style={s.tagContent}>
                <Image style={s.tagIcon} source={require('../../assets/images/tagsIcon.png')}/>
                <Text style={s.tagButtonText}>{tag}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </View>

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
    width: '80%',
  },
  mainText: {
    fontSize: 14,
    width: '80%',
    marginBottom: 50,
  },
  tags: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tagsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
  },
  underline: {
    width: '100%',
    height: 2,
    backgroundColor: '#000',
    marginVertical: 1.5,
    borderRadius: 0.75,
  },
  tagsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tagButton: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
  },
  tagContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  selectedTag: {
    backgroundColor: '#000',
  },
  tagButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Tag;
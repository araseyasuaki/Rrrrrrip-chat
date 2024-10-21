
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil'; // userStateのパスを修正

const TagChoice = () => {
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

    // 選択されているタグ（trueになっているもの）だけを配列に変換
    const selectedTags = Object.keys(newTags).filter((key) => newTags[key]);

    // userDataのtagsフィールドを配列として更新
    setUserData(prev => ({ ...prev, tags: selectedTags }));
  };

  return (
    <View style={s.container}>

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
                <Image style={s.tagIcon} source={require('../../assets/images/tagsIcon.png')} />
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
    width: '100%',
  },
  tags: {
    width: '100%',
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
    marginBottom: 10,
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

export default TagChoice;
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../recoil';
import * as ImagePicker from 'expo-image-picker';

const ImgPick = () => {
  const userData = useRecoilValue(userState);
  const [userImg, setUserImg] = useRecoilState(userState);

  const pickImage = async () => {

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // 画像が選ばれたときに動作
    if (!pickerResult.canceled) {
      // setUserImgの中身を取得してimageUriを更新
      setUserImg(prev => ({ ...prev, imageUri: pickerResult.assets[0].uri }));
    }
  };

  return (
    <View style={s.iconContainer}>

      <Image style={s.iconImg} source={userData.imageUri ? { uri: userData.imageUri } : require('../../assets/images/iconImg.png')}/>

      <TouchableOpacity style={s.imgPulsBtn} onPress={pickImage}>
        <Image style={s.imgPulsImg} source={require('../../assets/images/imgPulsBtn.png')}/>
      </TouchableOpacity>

    </View>
  );
};

const s = StyleSheet.create({
  iconContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImg: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
  imgPulsBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '30%',
    height: '30%',
  },
  imgPulsImg: {
    width: '100%',
    height: '100%',
  },
});

export default ImgPick;

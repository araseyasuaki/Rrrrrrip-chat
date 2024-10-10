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
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImg: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  imgPulsBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  imgPulsImg: {
    width: 55,
    height: 55,
  },
});

export default ImgPick;

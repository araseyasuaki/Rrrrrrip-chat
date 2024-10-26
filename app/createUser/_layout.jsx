import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { userState } from '../recoil';
import UserData from './userData';
import Icon from './icon';
import Tag from './tag';
import LastCheck from './lastCheck';
import { useRouter } from 'expo-router';

const Layout = () => {
  const router = useRouter();
  const [progressState, setProgressState] = useState(0);
  const [btn, setBtn] = useState(false);
  const userData = useRecoilValue(userState);

  const handlePress = () => {
    if (progressState === 0) {
      router.push('/login');
    } else {
      setProgressState(prevState => prevState - 1);
    }
  };

  const handleNextPress = () => {
    if (progressState < 3) {
      setProgressState(prevState => prevState + 1);
    } else {
      router.push('/home');
    }
  };

  // progressStateが変更されるたびにボタンの状態を更新
  useEffect(() => {
    if(progressState === 0) {
      setBtn(!!userData.imageUri);
    } else if(progressState === 1) {
      setBtn(!!userData.name && !!userData.userId && !!userData.text);
    } else if(progressState === 2) {
      setBtn(userData.tagList.some(tag => tag.selected));
    }
  }, [progressState, userData]);

  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity style={s.arrowBtn} onPress={handlePress}>
          <Image source={require('../../assets/images/arrowLeft.png')} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>プロフィール設定</Text>
      </View>

      <View style={s.headerBg}/>

      <View style={s.headerProgress}>
        <View style={[s.firstBar, (progressState >= 1) && s.activeBar]} />
        <View style={[s.secondBar, (progressState >= 1) && s.activeBar]} />
        <View style={[s.thirdBar, (progressState >= 2) && s.activeBar]} />
        <View style={[s.lastBar, (progressState === 3) && s.activeBar]} />
      </View>

      <ScrollView style={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.contentWidthBox}>
          <View style={s.contentWidth}>
            {progressState === 0 && <Icon/>}
            {progressState === 1 && <UserData/>}
            {progressState === 2 && <Tag/>}
            {progressState === 3 && <LastCheck/>}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={[s.button, !btn && s.disabledButton]} onPress={handleNextPress}
      // disabled={!btn}
      ////// フォームの入力チェック
      >
        <Text style={s.buttonText}>次</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <Layout />
    </RecoilRoot>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C995E0',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
  },
  headerBg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 64,
    backgroundColor: '#C995E0',
    opacity: .7,
    zIndex: -10,
  },
  arrowBtn: {
    position: 'absolute',
    alignContent: 'center',
    left: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerProgress: {
    position: 'absolute',
    zIndex: -10,
    flexDirection: 'row',
    width: '100%',
    top: 58,
    height: 4,
  },
  firstBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#000',
    margin: 2,
    borderRadius: 2,
    marginLeft: 20,
  },
  secondBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#fff',
    margin: 2,
    borderRadius: 2,
  },
  thirdBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#fff',
    margin: 2,
    borderRadius: 2,
  },
  lastBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#fff',
    margin: 2,
    borderRadius: 2,
    marginRight: 20,
  },
  activeBar: {
    backgroundColor: '#000',
  },
  content: {
    width: '100%',
    paddingTop: 110,
    zIndex: -20,
  },
  contentWidthBox: {
    width: '100%',
    paddingBottom: 114,
    alignItems: 'center'
  },
  contentWidth: {
    width: '80%',
    maxWidth: 600,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    width: 300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: .3,
  },
});

export default App;
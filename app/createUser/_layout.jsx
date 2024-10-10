import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
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
      setBtn(!!userData.tags);
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

      <View style={s.headerProgress}>
        <View style={[s.firstBar, (progressState >= 1) && s.activeBar]} />
        <View style={[s.secondBar, (progressState >= 1) && s.activeBar]} />
        <View style={[s.thirdBar, (progressState >= 2) && s.activeBar]} />
        <View style={[s.lastBar, (progressState === 3) && s.activeBar]} />
      </View>

      <View style={s.content}>
        {progressState === 0 && <Icon />}
        {progressState === 1 && <UserData />}
        {progressState === 2 && <Tag />}
        {progressState === 3 && <LastCheck />}
      </View>

      <TouchableOpacity style={[s.button, !btn && s.disabledButton]} onPress={handleNextPress}
      disabled={!btn}
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
    alignItems: 'center',
    marginTop: 100,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
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

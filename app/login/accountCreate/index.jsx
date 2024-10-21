import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Image, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth, db, getDoc, doc } from '../../firebase.js';
import Toast from 'react-native-toast-message';
import CustomToast from '../../customToastConfig/index.jsx';
import { useRecoilState, RecoilRoot } from 'recoil';
import { userState } from '../../recoil/index.jsx';

const AccountCreate = () => {
  const [userData, setUserData] = useRecoilState(userState)
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const dismissKeyboard = () => {
    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }
  };

  const passwoedAlert = () => {
    Toast.show({
      type: 'error',
      text1: 'パスワードエラー',
      text2: 'パスワードは8文字以上必要です。',
      position: 'top',
      visibilityTime: 2500,
    });
    return;
  }

  const createAlert = () => {
    Toast.show({
      type: 'error',
      text1: 'アカウント作成エラー',
      text2: 'メールアドレスがすでに使われている。もしくは、アカウントが存在しません。',
      position: 'top',
      visibilityTime: 2500,
    });
  }

  const accountCreate = async () => {
    setLoading(false);
    try {
      if (password.length < 8) {
        passwoedAlert()
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
          router.push('/createUser');
      }
    } catch (error) {
      createAlert();
      console.error('エラーが発生しました', error);
    } finally {
      setLoading(true);
    }
  };

  const emailBtn = (email) => {
    setUserData({ ...userData, email });
  };

  const passwordBtn = (password) => {
    setUserData({ ...userData, password });
  };

  const arrowBtn = () => {
    router.push('/login');
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={s.container}>
        <Toast config={CustomToast}/>

        <TouchableOpacity style={s.arrowBtn} onPress={arrowBtn}>
          <Image source={require('../../../assets/images/arrowLeft.png')} />
        </TouchableOpacity>

        <Text style={s.title}>新規作成</Text>

        <View style={s.emailContainer}>
          <Text style={s.formText}>メールアドレス</Text>
          <TextInput
            style={s.input}
            value={userData.email}
            onChangeText={emailBtn}
            placeholder="メールを入力"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={s.passwordContainer}>
          <Text style={s.formText}>パスワード</Text>
          <View style={s.passwordForm}>
            <TextInput
              style={[s.input, s.passwordInput]}
              value={userData.password}
              onChangeText={passwordBtn}
              placeholder="パスワードを入力"
              secureTextEntry={!showPassword}
              maxLength={16}
            />
            <TouchableOpacity
              style={s.showButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <View>
                {showPassword ? (
                  <Image style={s.img} source={require('../../../assets/images/eyeOpen.png')}/>
                ) : (
                  <Image style={s.img} source={require('../../../assets/images/eyeClose.png')}/>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <Text style={s.textLength}>{`${userData.password.length}/16`}</Text>
        </View>

        {loading ? (
          <TouchableOpacity style={s.button} onPress={accountCreate}>
            <Text style={s.buttonText}>新規作成</Text>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator style={s.loading} size="large" color="#000000" />
        )}

      </View>
    </TouchableWithoutFeedback>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <AccountCreate/>
    </RecoilRoot>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C995E0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  arrowBtn: {
    position: 'absolute',
    top: 14,
    left: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  emailContainer: {
    width: 300,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
  },
  titleCreate: {
    color: '#fff',
  },
  formText: {
    width: '100%',
    fontSize: 14,
    fontWeight: 'bold',
  },
  passwordForm: {
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 13.5,
    marginVertical: 5,
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  passwordInput: {
    width: 300,
  },
  showButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -11.25 }],
  },
  img: {
    textAlign: 'center',
  },
  textLength: {
    width: '100%',
    textAlign: 'right',
    color: '#fff',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    width: 300,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loading: {
    marginTop: 20,
    paddingVertical: 4,
  },
});

export default App;
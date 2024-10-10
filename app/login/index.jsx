import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth, db, getDoc, doc } from '../firebase.js';
import Toast from 'react-native-toast-message';
import CustomToast from '../customToastConfig.jsx';

const Login = () => {
  const [signSwitch, setSignSwitch] = useState(true); // ログインと新規作成の切り替え
  const [email, setEmail] = useState(''); // メールアドレスの入力欄
  const [password, setPassword] = useState(''); // パスワードの入力欄
  const [showPassword, setShowPassword] = useState(false); // パスワードの表示/非表示の切り替え
  const [loading, setLoading] = useState(true); // ログインのローディングの切り替え
  const router = useRouter();// URLのパスを変更

  // ログインのエラーメッセージのコンポーネント
  const loginAlert = () => {
    Toast.show({
      type: 'error',
      text1: 'ログインエラー',
      text2: 'メールアドレスまたはパスワードが間違っています。',
      position: 'top',
      visibilityTime: 2500,
    });
  };
  // パスワードのエラーメッセージのコンポーネント
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
  // 新規作成のエラーメッセージのコンポーネント
  const createAlert = () => {
    Toast.show({
      type: 'error',
      text1: 'アカウント作成エラー',
      text2: 'メールアドレスがすでに使われている。もしくは、アカウントが存在しません。',
      position: 'top',
      visibilityTime: 2500,
    });
  }

  // ログイン・新規登録切り替え
  const signBtn = () => {
    setSignSwitch(!signSwitch);
    setEmail('');
    setPassword('');
  };

  // ログイン処理
  const login = async () => {

    // ローディングアニメーション開始
    setLoading(false);

    try {
      if (signSwitch) {
        // ログインの処理
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
          loginAlert(); // ログインのエラーメッセージのコンポーネントの呼び出し
          console.error('ログイン中にエラーが発生しました:', error);
          return;
        }
      } else {
        // 新規作成の処理
        try {
              // パスワードが8文字以下だったらエラーメッセージを出す
          if (password.length < 8) {
            passwoedAlert() // パスワードのエラーメッセージのコンポーネント呼び出し
            return;
          }
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
          createAlert(); // 新規作成のエラーメッセージのコンポーネントの呼び出し
          return;
        }
      }

      // ユーザー情報取得
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const userDocRef = doc(db, 'users', uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          router.push('/home');
        } else {
          router.push('/createUser');
        }
      }
    } catch (error) {
      console.error('エラーが発生しました', error);
    } finally {
      setLoading(true); // ローディングアニメーション終了
    }
  };

  return (
    <View style={s.container}>
      <Toast config={CustomToast}/>

      <Text style={[s.title, signSwitch ? {} : s.titleCreate]}>{signSwitch ? 'ログイン' : '新規作成'}</Text>

      <View style={s.emailContainer}>
        <Text style={s.formText}>メールアドレス</Text>
        <TextInput
          style={s.input}
          value={email}
          onChangeText={setEmail}
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
            value={password}
            onChangeText={setPassword}
            placeholder="パスワードを入力"
            secureTextEntry={!showPassword}  // パスワード表示/非表示の切り替え
            maxLength={16}
          />
          <TouchableOpacity
            style={s.showButton}
            onPress={() => setShowPassword(!showPassword)}  // パスワード表示/非表示を切り替える
          >
            <View>{showPassword ?
              <Image style={s.img} source={require('../../assets/images/eyeOpen.png')}/> :
              <Image style={s.img} source={require('../../assets/images/eyeClose.png')}/>}
            </View>
          </TouchableOpacity>
        </View>
        <Text style={s.textLength}>{`${password.length}/16`}</Text>
      </View>

      {loading ? (
        <TouchableOpacity style={[s.button, signSwitch ? {} : s.buttonCreate]} onPress={login}>
          <Text style={[s.buttonText, signSwitch ? {} : s.buttonTextCreate]}>{signSwitch ? 'ログイン' : '新規作成'}</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator style={s.loading} size="large" color="#000000" />
      )}

      <TouchableOpacity style={s.link} onPress={signBtn}>
        <Text style={s.linkText}>{signSwitch ? '新規登録' : 'ログイン'}はこちら</Text>
      </TouchableOpacity>
    </View>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  titleCreate: {
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: 13.5,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  img: {
    textAlign: 'center',
  },
  emailContainer: {
    width: '80%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
  },
  formText: {
    width: '100%',
    fontSize: 14,
    fontWeight: 'bold,'
  },
  passwordForm: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  passwordInput: {
    flex: 1,
  },
  showButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: '-50%' }],
  },
  textLength: {
    width: '100%',
    textAlign: 'right',
    color: '#fff',
    fontSize: 14,
  },
  loading: {
    marginTop: 20,
    paddingVertical: 4,
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
  },
  buttonCreate: {
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextCreate: {
    color: '#000',
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    fontSize: 14,
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default Login;
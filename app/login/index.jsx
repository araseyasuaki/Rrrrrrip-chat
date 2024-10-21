import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Login = () => {

  const router = useRouter();

  const signInBtn = () => {
    router.push('/login/signIn');
  }

  const accountCreateBtn = () => {
    router.push('/login/accountCreate');
  }

  return (
    <View style={s.container}>

      <Image style={s.loginBg} source={require('../../assets/images/loginBg.png')}/>

      <TouchableOpacity style={[s.button, {marginTop: 50,}]} onPress={signInBtn}>
        <Text style={s.buttonText}>ログイン</Text>
      </TouchableOpacity>

      <View style={s.decContainer}>
        <Text style={s.decText}>または</Text>
        <View style={s.decBer}/>
      </View>

      <TouchableOpacity style={s.button} onPress={accountCreateBtn}>
        <Text style={s.buttonText}>アカウントを作成</Text>
      </TouchableOpacity>

    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C995E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBg: {
    width: '100%',
  },
  button: {
    backgroundColor:'#000',
    padding:10,
    borderRadius: 25,
    alignItems: 'center',
    width: 300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  decContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 25,
  },
  decText: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#C995E0',
    paddingHorizontal: 30,
  },
  decBer: {
    position: 'absolute',
    width: 280,
    height: 1,
    backgroundColor: '#fff',
    zIndex: -10,
    top: 8.5,
  },
})

export default Login
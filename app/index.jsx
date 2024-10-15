import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Index = () => {

  const router = useRouter();

  const linkBtn = () => {
    router.push('/login');
  }

  return (
    <TouchableOpacity onPress={linkBtn} style={s.link}>
      <View style={s.container}>
        <Image style={s.logoImgTop} source={require('../assets/images/ticketTop.png')} />
        <Image style={s.logoImgBottom} source={require('../assets/images/ticketBottom.png')} />
        <Text style={s.text}>Rrrrrrip</Text>
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  link: {
    flex: 1, // 画面全体にリンクを広げる
    backgroundColor: '#C995E0',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImgTop: {
    width: 57,
    height: 109,
    transform: [{ rotate: '15deg' }],
    left: 4.5,
    top: -5,
  },
  logoImgBottom: {
    width: 57,
    height: 42,
    left: -10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Index;
import { View, StyleSheet, Text, Image } from 'react-native';
import { Link } from 'expo-router';

const Index = () => {
  return (
    <Link style={s.link} href='/login'>
      <View style={s.container}>
        <Image style={s.upper} source={require('../assets/images/ticketUpper.png')} />
        <Image source={require('../assets/images/ticketBottom.png')} />
        <Text style={s.text}>Rrrrrrip</Text>
      </View>
    </Link>
  );
}

const s = StyleSheet.create({
  link: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C995E0',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upper: {
    transform: [{ rotate: '15deg' }],
    left: 13.5,
    top: -5,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Index;

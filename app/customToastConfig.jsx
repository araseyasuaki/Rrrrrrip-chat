import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomToast = {
  error: ({ text1, text2 }) => (
    <View style={styles.container}>
      <Text style={styles.text1}>{text1}</Text>
      <Text style={styles.text2}>{text2}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    position: 'absolute',
    top: 0,
  },
  text1: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text2: {
    color: '#fff',
    fontSize: 14,
  },
});

export default CustomToast;

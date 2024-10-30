import React, { useState, useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView, } from 'react-native-gesture-handler';
import { StyleSheet, Text } from 'react-native';

//　＊
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

const maxTranslateX = 150;
const disappearThreshold = 100;

const cardData = [
  { color: '#319F43', text: '旅行' },
  { color: '#C995E0', text: 'ゲーム' },
  { color: '#E9446A', text: 'ペット' },
  { color: '#FFD700', text: '勉強' },
  { color: '#1E90FF', text: 'エンジニア' },
  { color: '#FF69B4', text: 'デザイン' },
  { color: '#32CD32', text: 'ラーメン' },
  { color: '#8A2BE2', text: 'ダイエット' },
  { color: '#FF4500', text: '宗教' },
];

// シャッフル関数
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default function App() {
  // シャッフルされたカードデータを保持。
  const [shuffledData, setShuffledData] = useState([]);
  // カードの総数。
  const cardCount = cardData.length;
  // cardDataの数分配列にtrueを入れてカードの表示を管理
  const [isVisible, setIsVisible] = useState(Array(cardCount).fill(true));
  // 各カードの横方向の位置を管理します
  const translations = Array.from({ length: cardCount }, () => useSharedValue(0));
  // 各カードの回転角度を管理します
  const rotations = Array.from({ length: cardCount }, () => useSharedValue(0));
  // ドラッグ操作の開始時に、各カードの前の位置を保持します
  const prevTranslations = Array.from({ length: cardCount }, () => useSharedValue(0));
  // 透明度を管理
  const opacities = Array.from({ length: cardCount }, () => useSharedValue(1));

  useEffect(() => {
    // マウント時にシャッフル関数を使ってshuffledDataにシャッフルしたデータの配列を入れている
    setShuffledData(shuffleArray([...cardData]));
  }, []);

  const createPanGesture = (index) =>
    Gesture.Pan()
      .minDistance(1)
      .onStart(() => {
        prevTranslations[index].value = translations[index].value;
      })
      .onUpdate((event) => {
        translations[index].value = clamp(
          prevTranslations[index].value + event.translationX,
          -maxTranslateX,
          maxTranslateX
        );
        rotations[index].value = clamp(translations[index].value / 10, -15, 15);

        if (Math.abs(translations[index].value) > disappearThreshold) {
          opacities[index].value = Math.max(
            0,
            1 - (Math.abs(translations[index].value) - disappearThreshold) / (maxTranslateX - disappearThreshold)
          );
        } else {
          opacities[index].value = 1;
        }
      })
      .onEnd(() => {
        if (Math.abs(translations[index].value) >= disappearThreshold) {
          setIsVisible((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
          });
        } else {
          translations[index].value = withSpring(0, { damping: 20, stiffness: 100 });
          rotations[index].value = withSpring(0, { damping: 20, stiffness: 100 });
          opacities[index].value = withSpring(1, { damping: 20, stiffness: 100 });
        }
      })
      .runOnJS(true);

  return (
    <GestureHandlerRootView style={styles.container}>
      {Array.from({ length: cardCount }).map((_, index) => {
        const animatedStyles = useAnimatedStyle(() => ({
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: [
            { translateX: translations[index].value },
            { rotate: `${rotations[index].value}deg` },
            { translateX: -120 },
            { translateY: -200 },
          ],
          opacity: opacities[index].value,
          backgroundColor: shuffledData[index]?.color,
          width: 240,
          height: 400,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }));

        return (
          isVisible[index] && (
            <GestureDetector key={index} gesture={createPanGesture(index)}>
              <Animated.View style={animatedStyles}>
                <Text style={styles.text}>{shuffledData[index]?.text}</Text>
              </Animated.View>
            </GestureDetector>
          )
        );
      })}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});


import React, { useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

const maxTranslateX = 150; // 最大移動距離
const disappearThreshold = 90; // 消える閾値

const cardData = [
  { color: '#319F43' },
  { color: '#C995E0' },
  { color: '#E9446A' },
  { color: '#FFD700' },
  { color: '#1E90FF' },
  { color: '#FF69B4' },
  { color: '#32CD32' },
  { color: '#8A2BE2' },
  { color: '#FF4500' },
  { color: '#DAA520' },
  { color: '#B22222' },
  { color: '#FF6347' },
  { color: '#4682B4' },
  { color: '#2E8B57' },
  { color: '#A0522D' },
  { color: '#FF8C00' },
  { color: '#9932CC' },
  { color: '#00CED1' },
  { color: '#FF1493' },
  { color: '#ADFF2F' },
  { color: '#FFDAB9' },
];

export default function App() {
  const cardCount = cardData.length; // カードの枚数を配列から取得
  const [isVisible, setIsVisible] = useState(Array(cardCount).fill(true));
  const translations = Array.from({ length: cardCount }, () => useSharedValue(0));
  const rotations = Array.from({ length: cardCount }, () => useSharedValue(0));
  const prevTranslations = Array.from({ length: cardCount }, () => useSharedValue(0));
  const opacities = Array.from({ length: cardCount }, () => useSharedValue(1));

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
          opacities[index].value = Math.max(0, 1 - (Math.abs(translations[index].value) - disappearThreshold) / (maxTranslateX - disappearThreshold));
        } else {
          opacities[index].value = 1;
        }
      })
      .onEnd(() => {
        if (Math.abs(translations[index].value) >= disappearThreshold) {
          console.log(`Card ${index} has disappeared after moving to the right!`);
          setIsVisible((prev) => {
            const newState = [...prev];
            newState[index] = false; // 70px超えたら即座に非表示
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
          position: 'absolute', // カードを絶対位置にする
          top: '50%', // 上から50%に配置
          left: '50%', // 左から50%に配置
          transform: [
            { translateX: translations[index].value },
            { rotate: `${rotations[index].value}deg` },
            { translateX: -120 }, // 幅の半分を引いて中央揃え
            { translateY: -200 }, // 高さの半分を引いて中央揃え
          ],
          opacity: opacities[index].value,
          backgroundColor: cardData[index].color,
          width: 240,
          height: 400,
          borderRadius: 20,
        }));

        return (
          isVisible[index] && (
            <GestureDetector key={index} gesture={createPanGesture(index)}>
              <Animated.View style={animatedStyles}>
                {/* カードの内容をここに追加できます */}
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
});

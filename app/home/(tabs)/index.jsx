// import React, { useState, useEffect } from 'react';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring, } from 'react-native-reanimated';
// import { Gesture, GestureDetector, GestureHandlerRootView, } from 'react-native-gesture-handler';
// import { StyleSheet, Text, View } from 'react-native';

// //　＊
// function clamp(val, min, max) {
//   return Math.min(Math.max(val, min), max);
// }

// const maxTranslateX = 150;
// const disappearThreshold = 100;

// const cardData = [
//   { color: '#319F43', text: '旅行' },
//   { color: '#C995E0', text: 'ゲーム' },
//   { color: '#E9446A', text: 'ペット' },
//   { color: '#FFD700', text: '勉強' },
//   { color: '#1E90FF', text: 'エンジニア' },
//   { color: '#FF69B4', text: 'デザイン' },
//   { color: '#32CD32', text: 'ラーメン' },
//   { color: '#8A2BE2', text: 'ダイエット' },
//   { color: '#FF4500', text: '宗教' },
// ];

// // シャッフル関数
// const shuffleArray = (array) => {
//   const shuffledArray = [...array];
//   for (let i = shuffledArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//   }
//   return shuffledArray;
// };

// export default function App() {
//   // シャッフルされたカードデータを保持。
//   const [shuffledData, setShuffledData] = useState([]);
//   // カードの総数。
//   const cardCount = cardData.length;
//   // cardDataの数分配列にtrueを入れてカードの表示を管理
//   const [isVisible, setIsVisible] = useState(Array(cardCount).fill(true));
//   // 各カードの横方向の位置を管理します
//   const translations = Array.from({ length: cardCount }, () => useSharedValue(0));
//   // 各カードの回転角度を管理します
//   const rotations = Array.from({ length: cardCount }, () => useSharedValue(0));
//   // ドラッグ操作の開始時に、各カードの前の位置を保持します
//   const prevTranslations = Array.from({ length: cardCount }, () => useSharedValue(0));
//   // 透明度を管理
//   const opacities = Array.from({ length: cardCount }, () => useSharedValue(1));

//   useEffect(() => {
//     // マウント時にシャッフル関数を使ってshuffledDataにシャッフルしたデータの配列を入れている
//     setShuffledData(shuffleArray([...cardData]));
//   }, []);

//   const createPanGesture = (index) =>
//     // スワイプ中の動作を検出
//     Gesture.Pan()
//       // スワイプを開始するために必要な最小距離
//       .minDistance(1)
//       // スワイプを開始したときに実行
//       .onStart(() => {
//         prevTranslations[index].value = translations[index].value;
//       })
//       // スワイプ中の更新処理
//       .onUpdate((event) => {
//         translations[index].value = clamp(
//           // event.translationXで移動距離をprevTranslations[index].valueに渡している
//           prevTranslations[index].value + event.translationX,
//           // 移動距離の制限
//           -150,
//           150,
//         );
//         // 回転の制限
//         rotations[index].value = clamp(translations[index].value / 10, -15, 15);
//         // 不透明度の計算
//         // Math.absは絶対値を返す関数-5は5
//         // 100px以上動かした時に処理を行う
//         if (Math.abs(translations[index].value) > disappearThreshold) {
//           // 透明度に入れる値を決める
//           // Math.max大きい方の数字を入れる
//           opacities[index].value = Math.max(
//             //　0で最低保証
//             0,
//             //　カードの移動距離によって透明度を計算
//             1 - (Math.abs(translations[index].value) - disappearThreshold) / (maxTranslateX - disappearThreshold)
//           );
//         } else {
//           // 移動が100px以下なら透明度は1
//           opacities[index].value = 1;
//         }
//       })
//       // スワイプが終わったときの処理
//       .onEnd(() => {
//         // 100px以上でスプレッド構文を使ってカードを消す
//         if (Math.abs(translations[index].value) >= disappearThreshold) {
//           setIsVisible((prev) => {
//             const newState = [...prev];
//             newState[index] = false;
//             return newState;
//           });
//         // 100px未満で元の位置に戻す
//         } else {
//           translations[index].value = withSpring(0, { damping: 20, stiffness: 100 });
//           rotations[index].value = withSpring(0, { damping: 20, stiffness: 100 });
//           opacities[index].value = withSpring(1, { damping: 20, stiffness: 100 });
//         }
//       })
//       // よくわからん
//       .runOnJS(true);

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       {Array.from({ length: cardCount }).map((_, index) => {
//         const animatedStyles = useAnimatedStyle(() => ({
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: [
//             { translateX: translations[index].value },
//             { rotate: `${rotations[index].value}deg` },
//             { translateX: -120 },
//             { translateY: -200 },
//           ],
//           opacity: opacities[index].value,
//           backgroundColor: 'shuffledData[index]?.color',
//           width: 240,
//           height: 400,
//           borderRadius: 20,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }));

//         return (
//           isVisible[index] && (
//             <GestureDetector key={index} gesture={createPanGesture(index)}>
//               <Animated.View style={animatedStyles}>
//                   <Text style={styles.text}>{shuffledData[index]?.text}</Text>
//               </Animated.View>
//             </GestureDetector>
//           )
//         );
//       })}
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 24,
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

















// import React, { useState, useEffect } from 'react';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring, } from 'react-native-reanimated';
// import { Gesture, GestureDetector, GestureHandlerRootView, } from 'react-native-gesture-handler';
// import { StyleSheet, Text, View } from 'react-native';

// //　＊
// function clamp(val, min, max) {
//   return Math.min(Math.max(val, min), max);
// }

// const maxTranslateX = 150;
// const disappearThreshold = 100;

// const cardData = [
//   { color: '#319F43', text: '旅行' },
//   { color: '#C995E0', text: 'ゲーム' },
//   { color: '#E9446A', text: 'ペット' },
//   { color: '#FFD700', text: '勉強' },
//   { color: '#1E90FF', text: 'エンジニア' },
//   { color: '#FF69B4', text: 'デザイン' },
//   { color: '#32CD32', text: 'ラーメン' },
//   { color: '#8A2BE2', text: 'ダイエット' },
//   { color: '#FF4500', text: '宗教' },
// ];

// // シャッフル関数
// const shuffleArray = (array) => {
//   const shuffledArray = [...array];
//   for (let i = shuffledArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//   }
//   return shuffledArray;
// };

// export default function App() {
//   // シャッフルされたカードデータを保持。
//   const [shuffledData, setShuffledData] = useState([]);
//   // カードの総数。
//   const cardCount = cardData.length;
//   // cardDataの数分配列にtrueを入れてカードの表示を管理
//   const [isVisible, setIsVisible] = useState(Array(cardCount).fill(true));
//   // 各カードの横方向の位置を管理します
//   const translations = Array.from({ length: cardCount }, () => useSharedValue(0));
//   // 各カードの回転角度を管理します
//   const rotations = Array.from({ length: cardCount }, () => useSharedValue(0));
//   // ドラッグ操作の開始時に、各カードの前の位置を保持します
//   const prevTranslations = Array.from({ length: cardCount }, () => useSharedValue(0));
//   // 透明度を管理
//   const opacities = Array.from({ length: cardCount }, () => useSharedValue(1));

//   useEffect(() => {
//     // マウント時にシャッフル関数を使ってshuffledDataにシャッフルしたデータの配列を入れている
//     setShuffledData(shuffleArray([...cardData]));
//   }, []);

//   const createPanGesture = (index) =>
//     Gesture.Pan()
//       .minDistance(1)
//       .onStart(() => {
//         prevTranslations[index].value = translations[index].value;
//       })
//       .onUpdate((event) => {
//         translations[index].value = clamp(
//           prevTranslations[index].value + event.translationX,
//           -maxTranslateX,
//           maxTranslateX
//         );
//         rotations[index].value = clamp(translations[index].value / 10, -15, 15);

//         if (Math.abs(translations[index].value) > disappearThreshold) {
//           opacities[index].value = Math.max(
//             0,
//             1 - (Math.abs(translations[index].value) - disappearThreshold) / (maxTranslateX - disappearThreshold)
//           );
//         } else {
//           opacities[index].value = 1;
//         }
//       })
//       .onEnd(() => {
//         if (Math.abs(translations[index].value) >= disappearThreshold) {
//           setIsVisible((prev) => {
//             const newState = [...prev];
//             newState[index] = false;
//             return newState;
//           });
//         } else {
//           translations[index].value = withSpring(0, { damping: 20, stiffness: 100 });
//           rotations[index].value = withSpring(0, { damping: 20, stiffness: 100 });
//           opacities[index].value = withSpring(1, { damping: 20, stiffness: 100 });
//         }
//       })
//       .runOnJS(true);

//   return (
//     <GestureHandlerRootView style={s.container}>
//       {Array.from({ length: cardCount }).map((_, index) => {
//         const animatedStyles = useAnimatedStyle(() => ({
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: [
//             { translateX: translations[index].value },
//             { rotate: `${rotations[index].value}deg` },
//             { translateX: -120 },
//             { translateY: -200 },
//           ],
//           opacity: opacities[index].value,
//           // backgroundColor: shuffledData[index]?.color,
//           // width: 240,
//           // height: 400,
//           // borderRadius: 20,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }));

//         return (
//           isVisible[index] && (
//           <GestureDetector gesture={createPanGesture(index)}>
//             <Animated.View style={animatedStyles}>

//             <GestureDetector gesture={createPanGesture(index)}>
//             <Animated.View style={animatedStyles}>
//             <View style={[s.cardTop, { backgroundColor: shuffledData[index]?.color }]}></View>
//             </Animated.View>
//             </GestureDetector>

//             <View style={[s.cardBottom, { backgroundColor: '#000'}]}></View>
//             </Animated.View>
//             </GestureDetector>
//           )
//         );
//       })}
//     </GestureHandlerRootView>
//   );
// }

// const s = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 24,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   cardTop: {
//     width: 240,
//     height: 300,
//   },
//   cardBottom: {
//     width: 240,
//     height: 100,
//   },
// });
















// import React, { useState, useEffect } from 'react';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
// import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
// import { StyleSheet, Text, View } from 'react-native';

// // clamp関数
// function clamp(val, min, max) {
//   return Math.min(Math.max(val, min), max);
// }

// const maxTranslateX = 150; // 最大移動量
// const disappearThreshold = 100; // 消えるための閾値

// const cardData = [
//   { color: '#319F43', text: '旅行' },
//   { color: '#C995E0', text: 'ゲーム' },
//   { color: '#E9446A', text: 'ペット' },
//   { color: '#FFD700', text: '勉強' },
//   { color: '#1E90FF', text: 'エンジニア' },
//   { color: '#FF69B4', text: 'デザイン' },
//   { color: '#32CD32', text: 'ラーメン' },
//   { color: '#8A2BE2', text: 'ダイエット' },
//   { color: '#FF4500', text: '宗教' },
// ];

// // シャッフル関数
// const shuffleArray = (array) => {
//   const shuffledArray = [...array];
//   for (let i = shuffledArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//   }
//   return shuffledArray;
// };

// export default function App() {
//   const [shuffledData, setShuffledData] = useState([]);
//   const cardCount = cardData.length;
//   const [isVisible, setIsVisible] = useState(Array(cardCount).fill(true));
//   const translations = Array.from({ length: cardCount }, () => useSharedValue(0));
//   const prevTranslations = Array.from({ length: cardCount }, () => useSharedValue(0));
//   const opacities = Array.from({ length: cardCount }, () => useSharedValue(1));

//   useEffect(() => {
//     setShuffledData(shuffleArray([...cardData]));
//   }, []);

//   const createPanGesture = (index) =>
//     Gesture.Pan()
//       .minDistance(1)
//       .onStart(() => {
//         prevTranslations[index].value = translations[index].value;
//       })
//       .onUpdate((event) => {
//         translations[index].value = clamp(
//           prevTranslations[index].value + event.translationX,
//           -maxTranslateX,
//           maxTranslateX
//         );

//         if (Math.abs(translations[index].value) > disappearThreshold) {
//           opacities[index].value = Math.max(
//             0,
//             1 - (Math.abs(translations[index].value) - disappearThreshold) / (maxTranslateX - disappearThreshold)
//           );
//         } else {
//           opacities[index].value = 1;
//         }
//       })
//       .onEnd(() => {
//         if (Math.abs(translations[index].value) >= disappearThreshold) {
//           setIsVisible((prev) => {
//             const newState = [...prev];
//             newState[index] = false;
//             return newState;
//           });
//         } else {
//           translations[index].value = withSpring(0, { damping: 20, stiffness: 100 });
//           opacities[index].value = withSpring(1, { damping: 20, stiffness: 100 });
//         }
//       })
//       .runOnJS(true);

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       {Array.from({ length: cardCount }).map((_, index) => {
//         // 上部部分のスタイル
//         const upperAnimatedStyle = useAnimatedStyle(() => ({
//           position: 'absolute',
//           top: 100 + index * 10, // 上部のY位置を調整
//           left: '50%',
//           transform: [
//             { translateX: translations[index].value },
//             { translateX: -120 }, // カードの中心を調整
//             { translateY: -200 }, // 上部部分の位置を調整
//           ],
//           opacity: opacities[index].value,
//           backgroundColor: shuffledData[index]?.color,
//           width: 240,
//           height: 200, // 上部の高さ
//           borderTopLeftRadius: 20,
//           borderTopRightRadius: 20,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }));

//         // 下部部分のスタイル
//         const lowerStyle = {
//           position: 'absolute',
//           top: 100 + index * 10 + 200, // 下部のY位置を調整
//           left: '50%',
//           transform: [{ translateX: -120 }, { translateY: -200 }], // 下部部分の位置を調整
//           backgroundColor: shuffledData[index]?.color,
//           width: 240,
//           height: 200, // 下部の高さ
//           borderBottomLeftRadius: 20,
//           borderBottomRightRadius: 20,
//           justifyContent: 'center',
//           alignItems: 'center',
//         };

//         return (
//           isVisible[index] && (
//             <View key={index}>
//               <GestureDetector gesture={createPanGesture(index)}>
//                 <Animated.View style={upperAnimatedStyle}>
//                   <Text style={styles.text}>{shuffledData[index]?.text}</Text>
//                 </Animated.View>
//               </GestureDetector>
//               <View style={lowerStyle}>
//                 <Text style={styles.text}>{shuffledData[index]?.text}</Text>
//               </View>
//             </View>
//           )
//         );
//       })}
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-start', // 上部に配置
//   },
//   text: {
//     fontSize: 24,
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });





















// import React, { useState } from 'react';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
// import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
// import { StyleSheet, View, Text } from 'react-native';

// // clamp関数
// function clamp(val, min, max) {
//   return Math.min(Math.max(val, min), max);
// }

// const maxTranslateX = 150;
// const disappearThreshold = 100;

// export default function App() {
//   const [isVisible, setIsVisible] = useState(true);
//   const translation = useSharedValue(0);
//   const prevTranslation = useSharedValue(0);

//   const createPanGesture = () =>
//     Gesture.Pan()
//       .minDistance(1)
//       .onStart(() => {
//         prevTranslation.value = translation.value;
//       })
//       .onUpdate((event) => {
//         translation.value = clamp(
//           prevTranslation.value + event.translationX,
//           -maxTranslateX,
//           maxTranslateX
//         );
//       })
//       .onEnd(() => {
//         if (Math.abs(translation.value) >= disappearThreshold) {
//           setIsVisible(false);
//         } else {
//           translation.value = withSpring(0, { damping: 20, stiffness: 100 });
//         }
//       })
//       .runOnJS(true);

//   const animatedStyles = useAnimatedStyle(() => ({
//     position: 'absolute',
//     // カードを画面の中央に配置
//     top: '50%',
//     left: '50%',
//     transform: [
//       { translateX: translation.value },
//       { translateY: -150 }, // カードの高さの半分で調整
//       { translateX: -120 }, // カードの幅の半分で調整
//     ],
//   }));

//   return (
//     <GestureHandlerRootView style={s.container}>
//       {isVisible && (
//         <GestureDetector gesture={createPanGesture()}>
//           <Animated.View style={animatedStyles}>
//             <View style={[s.cardTop, { backgroundColor: '#319F43' }]}>
//               <Text style={s.text}>旅行</Text>
//             </View>
//             <View style={[s.cardBottom, { backgroundColor: '#000' }]} />
//           </Animated.View>
//         </GestureDetector>
//       )}
//     </GestureHandlerRootView>
//   );
// }

// const s = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cardTop: {
//     width: 240,
//     height: 300,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cardBottom: {
//     width: 240,
//     height: 100,
//   },
//   text: {
//     fontSize: 24,
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });













// import React, { useState } from 'react';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
// import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
// import { StyleSheet, View, Text } from 'react-native';

// // clamp関数
// function clamp(val, min, max) {
//   return Math.min(Math.max(val, min), max);
// }

// const maxTranslateX = 150; // 最大スワイプ距離
// const disappearThreshold = 100; // 消える閾値

// export default function App() {
//   const [isVisible, setIsVisible] = useState(true);
//   const translation = useSharedValue(0);
//   const prevTranslation = useSharedValue(0);

//   const createPanGesture = () =>
//     Gesture.Pan()
//       .minDistance(1)
//       .onStart(() => {
//         prevTranslation.value = translation.value; // 現在の位置を保持
//       })
//       .onUpdate((event) => {
//         // 右方向のスワイプのみ許可
//         if (event.translationX > 0) {
//           translation.value = clamp(
//             prevTranslation.value + event.translationX,
//             0, // 0に制限して左スワイプを防ぐ
//             maxTranslateX
//           );
//         }
//       })
//       .onEnd(() => {
//         // スワイプが閾値を超えた場合、カードを消す
//         if (translation.value >= disappearThreshold) {
//           setIsVisible(false);
//         } else {
//           // スワイプが閾値に達しなかった場合、元の位置に戻す
//           translation.value = withSpring(0, { damping: 20, stiffness: 100 });
//         }
//       })
//       .runOnJS(true);

//   const animatedStyles = useAnimatedStyle(() => ({
//     position: 'absolute',
//     // カードを画面の中央に配置
//     top: '50%',
//     left: '50%',
//     transform: [
//       { translateX: translation.value },
//       { translateY: -150 }, // カードの高さの半分で調整
//       { translateX: -120 }, // カードの幅の半分で調整
//     ],
//   }));

//   return (
//     <GestureHandlerRootView style={s.container}>
//       {isVisible && (
//         <>
//           <GestureDetector gesture={createPanGesture()}>
//             <Animated.View style={animatedStyles}>
//               <View style={[s.cardTop, { backgroundColor: '#319F43' }]}>
//                 <Text style={s.text}>旅行</Text>
//               </View>
//             </Animated.View>
//           </GestureDetector>
//           <View style={[s.cardBottom, { backgroundColor: '#000' }]} />
//         </>
//       )}
//     </GestureHandlerRootView>
//   );
// }

// const s = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cardTop: {
//     width: 240,
//     height: 300,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cardBottom: {
//     width: 240,
//     height: 100,
//   },
//   text: {
//     fontSize: 24,
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });























import React, { useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View, Text } from 'react-native';


function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

const maxTranslateX = 150;
const disappearThreshold = 100;

export default function App() {
  const [isVisible, setIsVisible] = useState(true);
  const translation = useSharedValue(0);
  const prevTranslation = useSharedValue(0);

  const createPanGesture = () =>
    Gesture.Pan()
      .minDistance(1)
      .onStart(() => {
        prevTranslation.value = translation.value;
      })
      .onUpdate((event) => {
        if (event.translationX < 0) {
          translation.value = clamp(
            prevTranslation.value + event.translationX,
            -maxTranslateX,
            maxTranslateX
          );
        } else {
          translation.value = clamp(
            prevTranslation.value + event.translationX,
            0,
            maxTranslateX
          );
        }
      })
      .onEnd(() => {
        if (Math.abs(translation.value) >= disappearThreshold) {
          setIsVisible(false);
        } else {
          translation.value = withSpring(0, { damping: 20, stiffness: 100 });
        }
      })
      .runOnJS(true);

  const animatedStylesTop = useAnimatedStyle(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: translation.value },
      { translateY: -150 },
      { translateX: -120 },
    ],
  }));

// 下部カードのアニメーションスタイルを修正
const animatedStylesBottom = useAnimatedStyle(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: [
    { translateX: translation.value < 0 ? translation.value : 0 }, // 左スワイプの時だけ移動
    { translateY: 150 }, // 下部カードの位置調整
    { translateX: -120 }, // カードの幅の半分で調整
  ],
}));

  return (
    <GestureHandlerRootView style={s.container}>
      {isVisible && (
        <>
          <GestureDetector gesture={createPanGesture()}>
            <Animated.View style={animatedStylesTop}>
              <View style={[s.cardTop, { backgroundColor: '#319F43' }]}>
                <Text style={s.text}>旅行</Text>
              </View>
            </Animated.View>
          </GestureDetector>
          <Animated.View style={animatedStylesBottom}>
            <View style={[s.cardBottom, { backgroundColor: '#000' }]} />
          </Animated.View>
        </>
      )}
    </GestureHandlerRootView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTop: {
    width: 240,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBottom: {
    width: 240,
    height: 100,
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, Image, CheckBox, StyleSheet } from 'react-native';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';
// import { auth, db, storage } from '../firebase';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import * as ImagePicker from 'expo-image-picker';

// const Profile = () => {
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false); // 編集モードのトグル
//   const [userData, setUserData] = useState(null);
//   const [imageUri, setImageUri] = useState(null); // 新しい画像のURI
//   const [newTags, setNewTags] = useState({
//     travel: false,
//     food: false,
//     sports: false,
//     anime: false,
//     games: false,
//   });

//   const uid = auth.currentUser?.uid;

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (uid) {
//         const docRef = doc(db, "users", uid);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setUserData(data);

//           // Firestoreから取得したタグ情報を反映する
//           const selectedTags = data.tag || [];
//           const updatedTags = { ...newTags };
//           selectedTags.forEach(tag => {
//             updatedTags[tag] = true;
//           });
//           setNewTags(updatedTags);
//         } else {
//           console.log("ユーザーデータが存在しません。");
//         }
//       }
//       setLoading(false); // ローディング終了
//     };

//     fetchUserData();
//   }, [uid]);

//   // 画像を選択する関数
//   const pickImage = async () => {
//     let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (result.granted === false) {
//       alert("画像の選択にはアクセス権限が必要です。");
//       return;
//     }

//     let pickerResult = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!pickerResult.canceled) {
//       setImageUri(pickerResult.assets[0].uri); // 新しい画像をセット
//     }
//   };

//   // 画像をFirebaseストレージにアップロードする関数
//   const uploadImage = async () => {
//     if (!imageUri) return userData.imageUrl; // 新しい画像がなければ元の画像URLを返す

//     const response = await fetch(imageUri);
//     const blob = await response.blob();
//     const storageRef = ref(storage, `userIcons/${uid}`);
//     await uploadBytes(storageRef, blob);

//     return await getDownloadURL(storageRef); // 新しい画像のURLを返す
//   };

//   const saveUserData = async () => {
//     const selectedTags = Object.keys(newTags).filter(tag => newTags[tag]);
//     const updatedImageUrl = await uploadImage(); // 画像をアップロード

//     const updatedData = {
//       ...userData,
//       tag: selectedTags,
//       imageUrl: updatedImageUrl,
//     };

//     try {
//       const docRef = doc(db, "users", uid);
//       await updateDoc(docRef, updatedData);
//       alert("ユーザーデータが更新されました！");
//       setUserData(updatedData);
//       setEditMode(false); // 編集モードを終了
//     } catch (error) {
//       console.error("データ更新中にエラーが発生しました: ", error);
//     }
//   };

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   if (!userData) {
//     return <Text>No user data available</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       {editMode ? (
//         <>
//           <TextInput
//             style={styles.input}
//             value={userData.name}
//             onChangeText={(text) => setUserData({ ...userData, name: text })}
//           />
//           <TextInput
//             style={styles.input}
//             value={userData.userText}
//             onChangeText={(text) => setUserData({ ...userData, userText: text })}
//           />
//           <Text>タグを選んでください:</Text>
//           {Object.keys(newTags).map((tag) => (
//             <View key={tag} style={styles.checkboxContainer}>
//               <CheckBox
//                 value={newTags[tag]}
//                 onValueChange={(newValue) => setNewTags({ ...newTags, [tag]: newValue })}
//               />
//               <Text>{tag}</Text>
//             </View>
//           ))}
//           <Text>現在のアイコン:</Text>
//           <Image
//             source={{ uri: imageUri || userData.imageUrl }} // 新しい画像があればそれを表示
//             style={styles.image}
//           />
//           <Button title="アイコンを変更" onPress={pickImage} />
//           <Button title="保存" onPress={saveUserData} />
//           <Button title="キャンセル" onPress={() => setEditMode(false)} />
//         </>
//       ) : (
//         <>
//           <Image source={{ uri: userData.imageUrl }} style={styles.image} />
//           <Text>ユーザー名: {userData.name}</Text>
//           <Text>自己紹介文: {userData.userText}</Text>
//           <Text>タグ: {userData.tag.join(', ')}</Text>
//           <Button title="編集" onPress={() => setEditMode(true)} />
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   image: {
//     width: 100,
//     height: 100,
//     marginVertical: 10,
//   },
// });

// export default Profile;



// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, Image, CheckBox, StyleSheet } from 'react-native';

// const index = () => {
//   return (
//     <View>aaa</View>
//   )
// }

// export default index
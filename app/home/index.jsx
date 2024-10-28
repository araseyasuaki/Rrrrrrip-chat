// import React, { useEffect, useState } from 'react';
// import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import { db, doc, getDoc, getAuth } from '../firebase'; // firebase設定をインポート

// const UserImageDisplay = () => {
//   const [imageUri, setImageUri] = useState(null);
//   const [loading, setLoading] = useState(true); // ローディング状態を追加
//   const [error, setError] = useState(null); // エラーメッセージを追加
//   const auth = getAuth();
//   const user = auth.currentUser;

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userDocRef = doc(db, 'users', user.uid); // 現在のユーザーのUIDを使用
//         const userDoc = await getDoc(userDocRef);

//         if (userDoc.exists()) {
//           const data = userDoc.data();
//           setImageUri(data.imgUrl); // 画像URLを設定
//         } else {
//           setError('ユーザーが見つかりません'); // ユーザーが存在しない場合のエラー処理
//         }
//       } catch (err) {
//         console.error(err);
//         setError('データの取得に失敗しました'); // エラーハンドリング
//       } finally {
//         setLoading(false); // ローディング状態を更新
//       }
//     };

//     fetchUserData(); // データ取得を実行
//   }, [user.uid]); // ユーザーのUIDに依存

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" /> {/* ローディングインジケーター */}
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {error ? (
//         <Text>{error}</Text> // エラーメッセージを表示
//       ) : imageUri ? (
//         <Image source={{ uri: imageUri }} style={styles.image} />
//       ) : (
//         <Text>画像が見つかりません</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//   },
// });

// export default UserImageDisplay;




import React from 'react'
import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';

const index = () => {
  return (
    <View><Text>キタコレ</Text></View>
  )
}

export default index
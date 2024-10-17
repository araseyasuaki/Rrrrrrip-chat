import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../recoil';
import { db, getDocs, collection, query, where } from "../firebase";

const UserData = () => {
  const userData = useRecoilValue(userState);
  const [userTextData, setUserTextData] = useRecoilState(userState);
  const [inputHeight, setInputHeight] = useState(0);

  const dismissKeyboard = () => {
    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }
  };

  const nameData = (name) => {
    setUserTextData(prev => ({ ...prev, name }));
  };

  const userIdData = (userId) => {
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;
    if (alphanumericRegex.test(userId)) {
      setUserTextData(prev => ({ ...prev, userIdFilter: userId }));
    }
  };

  const textData = (text) => {
    setUserTextData(prev => ({ ...prev, text: text }));
  };

  useEffect(() => {
    const fetchUserIdsAndCompare = async () => {
      try {
        const userIds = [];
        const usersData = await getDocs(collection(db, "users"));
        usersData.forEach((doc) => {
          const data = doc.data();
          if (data.userId) {
            userIds.push(data.userId);
          }
        });

        // userIdFilterがuserIdsに含まれているかを確認
        if(!userIds.includes(userData.userIdFilter)) {
          setUserTextData(prev => ({ ...prev, userId: userData.userIdFilter }));
        } else {
          setUserTextData(prev => ({ ...prev, userId: '' }));
        }
      } catch (error) {
        console.error("Error fetching user IDs: ", error);
      }
    };

    if (userData.userIdFilter) {
      fetchUserIdsAndCompare();
    }
  }, [userData.userIdFilter]);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={s.container}>

        <View style={s.formContainer}>
          <Text style={s.formText}>名前</Text>
          <TextInput
            style={s.input}
            placeholder='名前を入力'
            value={userData.name}
            onChangeText={nameData}
            maxLength={16}
          />
          <Text style={s.textLength}>{`${userData.name.length}/16`}</Text>
        </View>

        <View style={s.formContainer}>
          <Text style={s.formText}>ユーザーID</Text>
          <TextInput
            style={s.input}
            placeholder='ユーザーIDを入力'
            value={userData.userIdFilter}
            onChangeText={userIdData}
            maxLength={8}
          />
          <View style={s.formAlertContainer}>
            <Text style={s.formAlert}>＊アルファベット・半角の数字のみ使用可能です！</Text>
            <Text style={s.textLength}>{`${userData.userIdFilter.length}/8`}</Text>
          </View>
        </View>

        <View style={s.formContainer}>
          <Text style={s.formText}>自己紹介文</Text>
          <TextInput
            style={[s.input, { height: Math.max(97, inputHeight), borderRadius: 10,}]}
            textAlignVertical='top'
            multiline={true}
            placeholder='自己紹介文を入力'
            value={userData.text}
            onChangeText={textData}
            maxLength={300}
            onContentSizeChange={(event) => setInputHeight(event.nativeEvent.contentSize.height)}
          />
          <Text style={s.textLength}>{`${userData.text.length}/300`}</Text>
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
};

const s = StyleSheet.create({
  container: {
    width: '100%',
  },
  formContainer: {
    width: '100%',
  },
  formText: {
    width: '100%',
    fontSize: 14,
    fontWeight: 'bold,'
  },
  input: {
    width: '100%',
    padding: 13.5,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  formAlertContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 21,
  },
  textLength: {
    textAlign: 'right',
    fontSize: 14,
  },
});

export default UserData;

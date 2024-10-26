import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil';
import { db, getDocs, collection } from "../firebase";

const ProfileForm = () => {
  const [userData, setUserData] = useRecoilState(userState);
  const [inputHeight, setInputHeight] = useState(0);
  const [passwordFormAlert, setPasswordFormAlert] = useState('');

  const dismissKeyboard = () => {
    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }
  };

  const nameBtn = (name) => {
    setUserData(prev => ({ ...prev, name: name }));
  };

  const userIdBtn = (userIdFilter) => {
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;
    if (alphanumericRegex.test(userIdFilter)) {
      setUserData(prev => ({ ...prev, userIdFilter: userIdFilter }));
      setPasswordFormAlert('');
    } else {
      setPasswordFormAlert('＊アルファベット・半角の数字のみ使用可能です！');
    }
  };

  useEffect(() => {
    const checkDuplicateUserId = async () => {
      if (userData.userIdFilter) {
        try {
          const usersData = await getDocs(collection(db, "users"));
          const userIds = usersData.docs.map(doc => doc.data().userId).filter(Boolean);

          if (userIds.includes(userData.userIdFilter)) {
            setPasswordFormAlert("ユーザーIDが重複しています。");
          } else {
            setPasswordFormAlert('');
            setUserData(prev => ({ ...prev, userId: userData.userIdFilter }));
          }
        } catch (error) {
          console.error("Error fetching user IDs: ", error);
          setPasswordFormAlert("ユーザーIDの取得中にエラーが発生しました。");
        }
      } else {
        setPasswordFormAlert('');
      }
    };

    checkDuplicateUserId();
  }, [userData.userIdFilter]);

  const textBtn = (text) => {
    setUserData(prev => ({ ...prev, text: text }));
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={s.container}>
        <View style={s.formContainer}>
          <Text style={s.formText}>名前</Text>
          <TextInput
            style={s.input}
            placeholder='名前を入力'
            value={userData.name}
            onChangeText={nameBtn}
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
            onChangeText={userIdBtn}
            maxLength={8}
          />
          <View style={s.formAlertContainer}>
            <Text style={s.formAlert}>
              {passwordFormAlert}
            </Text>
            <Text style={s.textLength}>{`${userData.userIdFilter.length}/8`}</Text>
          </View>
        </View>

        <View style={s.formContainer}>
          <Text style={s.formText}>自己紹介文</Text>
          <TextInput
            style={[s.input, { height: Math.max(97, inputHeight), borderRadius: 10 }]}
            textAlignVertical='top'
            multiline={true}
            scrollEnabled={false}
            placeholder='自己紹介文を入力'
            value={userData.text}
            onChangeText={textBtn}
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
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 10,
  },
  formText: {
    width: '100%',
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 13.5,
    marginVertical: 5,
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  formAlertContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formAlert: {
    fontSize: 12,
    color: '#FF0000',
  },
  textLength: {
    textAlign: 'right',
    fontSize: 12,
    paddingLeft: 10,
  },
});

export default ProfileForm;

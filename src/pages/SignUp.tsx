import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import DismissKeyboardView from '../components/DismissKeyboardView';
import {RootStackParamList} from '../../AppInner';
import axios, {AxiosError} from 'axios';
import {ActivityIndicator} from 'react-native';
import Config from 'react-native-config';
type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const {width} = Dimensions.get('window');

function SignUp({navigation}: SignUpScreenProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const emailRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback(text => {
    setEmail(text.trim());
  }, []);
  const onChangeName = useCallback(text => {
    setName(text.trim());
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);
  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    console.log(email, name, password);
    console.log('API URL:', Config.API_URL);

    try {
      setLoading(true);
      const response = await axios.post(`${Config.API_URL}/user`, {
        email,
        name,
        password,
      });
      setLoading(false);
      console.log(response.data);
      Alert.alert('알림', '회원가입 되었습니다.');
      navigation.navigate('SignIn');
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response;
        if (errorResponse && errorResponse.data) {
          Alert.alert(
            '알림',
            errorResponse.data.message || '회원가입 중 오류가 발생했습니다.',
          );
        } else {
          Alert.alert('알림', '네트워크 오류가 발생했습니다.');
        }
      } else {
        console.error(error);
        Alert.alert('알림', '알 수 없는 오류가 발생했습니다.');
      }
    }
  }, [loading, email, name, password]);

  const canGoNext = email && name && password;
  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <Image
          source={require('../assets/smallbeans.png')} // 로고 이미지 경로를 적절히 수정하세요
          style={styles.logo}
        />
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>이메일</Text>
          <TextInput
            style={[
              styles.textInput,
              focusedInput === 'email' && styles.focusedTextInput,
            ]}
            onChangeText={onChangeEmail}
            placeholder="이메일을 입력해주세요"
            placeholderTextColor="#666"
            textContentType="emailAddress"
            value={email}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={emailRef}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
            onSubmitEditing={() => nameRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>이름</Text>
          <TextInput
            style={[
              styles.textInput,
              focusedInput === 'name' && styles.focusedTextInput,
            ]}
            placeholder="이름을 입력해주세요."
            placeholderTextColor="#666"
            onChangeText={onChangeName}
            value={name}
            textContentType="name"
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={nameRef}
            onFocus={() => setFocusedInput('name')}
            onBlur={() => setFocusedInput(null)}
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={[
              styles.textInput,
              focusedInput === 'password' && styles.focusedTextInput,
            ]}
            placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
            placeholderTextColor="#666"
            onChangeText={onChangePassword}
            value={password}
            keyboardType={
              Platform.OS === 'android' ? 'default' : 'ascii-capable'
            }
            textContentType="password"
            secureTextEntry
            returnKeyType="send"
            clearButtonMode="while-editing"
            ref={passwordRef}
            onFocus={() => setFocusedInput('password')}
            onBlur={() => setFocusedInput(null)}
            onSubmitEditing={onSubmit}
          />
        </View>
        <View style={styles.buttonZone}>
          <Pressable
            style={
              canGoNext
                ? [styles.loginButton, styles.loginButtonActive]
                : styles.loginButton
            }
            disabled={!canGoNext || loading}
            onPress={onSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.loginButtonText}>회원가입</Text>
            )}
          </Pressable>
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: width - 40,
    height: 100,
    marginBottom: 0,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  focusedTextInput: {
    borderColor: '#04ca5b',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  buttonZone: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonActive: {
    backgroundColor: '#04ca5b',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUp;

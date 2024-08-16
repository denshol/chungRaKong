import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {RootStackParamList} from '../../AppInner';
import {useAppDispatch} from '../store';
import {setUser} from '../slices/user';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const {width} = Dimensions.get('window');

const SignIn = ({navigation}: SignInScreenProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback(text => {
    setEmail(text.trim());
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
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    try {
      setLoading(true);
      const response = await axios.post(`${Config.API_URL}/login`, {
        email,
        password,
      });
      console.log(response.data);
      Alert.alert('알림', '로그인 되었습니다.');
      dispatch(
        setUser({
          name: response.data.data.name,
          email: response.data.data.email,
          accessToken: response.data.data.accessToken,
          refreshToken: response.data.data.refreshToken,
        }),
      );
      await EncryptedStorage.setItem(
        'refreshToken',
        response.data.data.refreshToken,
      );
      await EncryptedStorage.setItem(
        'accessToken',
        response.data.data.accessToken,
      );
      navigation.navigate('Home');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, dispatch, email, password, navigation]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const toFindID = useCallback(() => {
    navigation.navigate('FindID');
  }, [navigation]);

  const toFindPassword = useCallback(() => {
    navigation.navigate('FindPassword');
  }, [navigation]);

  const canGoNext = email && password;

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <Image source={require('../assets/bigbeans.png')} style={styles.logo} />
        <View
          style={[
            styles.inputWrapper,
            focusedInput === 'email' && styles.focusedInputWrapper,
          ]}>
          <Icon
            name="mail-outline"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={[
              styles.textInput,
              focusedInput === 'email' && styles.focusedTextInput,
            ]}
            onChangeText={onChangeEmail}
            placeholder="이메일을 입력해주세요"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            autoComplete="email"
            textContentType="emailAddress"
            value={email}
            returnKeyType="next"
            clearButtonMode="while-editing"
            ref={emailRef}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View
          style={[
            styles.inputWrapper,
            focusedInput === 'password' && styles.focusedInputWrapper,
          ]}>
          <Icon
            name="lock-closed-outline"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={[
              styles.textInput,
              focusedInput === 'password' && styles.focusedTextInput,
            ]}
            placeholder="비밀번호를 입력해주세요"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            onChangeText={onChangePassword}
            value={password}
            autoComplete="password"
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
            style={[styles.loginButton, canGoNext && styles.loginButtonActive]}
            disabled={!canGoNext || loading}
            onPress={onSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.loginButtonText}>로그인</Text>
            )}
          </Pressable>
          <View style={styles.horizontalButtons}>
            <Pressable onPress={toFindID} style={styles.findButton}>
              <Text style={styles.findButtonText}>아이디 찾기</Text>
            </Pressable>
            <Text style={styles.separator}>|</Text>
            <Pressable onPress={toFindPassword} style={styles.findButton}>
              <Text style={styles.findButtonText}>비밀번호 찾기</Text>
            </Pressable>
            <Text style={styles.separator}>|</Text>
            <Pressable onPress={toSignUp} style={styles.signUpButton}>
              <Text style={styles.signUpButtonText}>회원가입하기</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  focusedInputWrapper: {
    borderColor: '#04ca5b',
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  focusedTextInput: {
    borderColor: '#04ca5b',
  },
  buttonZone: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
  },
  loginButtonActive: {
    backgroundColor: '#04ca5b',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  horizontalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  findButton: {
    paddingHorizontal: 5,
  },
  findButtonText: {
    color: '#666',
    fontSize: 16,
  },
  separator: {
    color: '#666',
    fontSize: 16,
    paddingHorizontal: 5,
  },
  signUpButton: {
    paddingHorizontal: 5,
  },
  signUpButtonText: {
    color: '#04ca5b',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignIn;

import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '@env';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});


const BoardCreate = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // 화면에 포커스될 때마다 입력값 초기화
  useFocusEffect(
    useCallback(() => {
      setTitle('');
      setContent('');
      setSubmitting(false);

      return () => {
        // 화면을 벗어날 때 cleanup
        setTitle('');
        setContent('');
        setSubmitting(false);
      };
    }, []),
  );

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('알림', '제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      setSubmitting(true);
      const response = await api.post('/posts', {
        title: title.trim(),
        content: content.trim(),
        author: '익명',
      });

      // 성공 시 바로 Board로 이동
      navigation.navigate('Board', {refresh: true});

      Alert.alert('성공', '게시글이 작성되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            // Board 화면에서 자동으로 새로고침되도록 함
            setTimeout(() => {
              navigation.navigate('BoardDetail', {id: response.data._id});
            }, 100);
          },
        },
      ]);
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      Alert.alert('오류', '게시글 작성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  // ... 나머지 코드는 동일
  return (
    <View style={styles.container}>
      <ScrollView style={styles.form}>
        <TextInput
          style={styles.titleInput}
          placeholder="제목을 입력하세요"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
          editable={!submitting}
        />
        <TextInput
          style={styles.contentInput}
          placeholder="내용을 입력하세요"
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          editable={!submitting}
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
          disabled={submitting}>
          <Text style={styles.buttonText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
          disabled={submitting}>
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={[styles.buttonText, styles.submitButtonText]}>
              등록
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    flex: 1,
    padding: 15,
  },
  titleInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    marginBottom: 20,
  },
  contentInput: {
    fontSize: 16,
    height: 300,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f1f3f5',
  },
  submitButton: {
    backgroundColor: '#04ca5b',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  submitButtonText: {
    color: '#fff',
  },
});

export default BoardCreate;

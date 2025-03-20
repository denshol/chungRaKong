// src/pages/board/BoardDetail.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {API_BASE_URL} from '@env';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

const BoardDetail = ({route, navigation}) => {
  const {id} = route.params;
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error('게시글 조회 실패:', error);
      Alert.alert('오류', '게시글을 불러오는데 실패했습니다.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) {
      Alert.alert('알림', '댓글 내용을 입력해주세요.');
      return;
    }

    try {
      await api.post(`/posts/${id}/comments`, {
        content: comment,
        author: '익명', // 로그인 기능 구현 시 실제 사용자 정보로 변경
      });
      setComment('');
      fetchPost(); // 댓글 목록 새로고침
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      Alert.alert('오류', '댓글 작성에 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#04ca5b" />
      </View>
    );
  }

  if (!post) return null;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{post.title}</Text>
          <View style={styles.meta}>
            <Text style={styles.author}>{post.author}</Text>
            <Text style={styles.date}>
              {new Date(post.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <Text style={styles.postContent}>{post.content}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Icon name="eye-outline" size={16} color="#666" />
            <Text style={styles.statText}>{post.views}</Text>
          </View>
          <View style={styles.stat}>
            <Icon name="chatbubble-outline" size={16} color="#666" />
            <Text style={styles.statText}>{post.comments?.length || 0}</Text>
          </View>
        </View>

        <View style={styles.commentsHeader}>
          <Text style={styles.commentsTitle}>
            댓글 {post.comments?.length || 0}
          </Text>
        </View>

        {post.comments?.map((comment, index) => (
          <View key={index} style={styles.commentItem}>
            <View style={styles.commentHeader}>
              <Text style={styles.commentAuthor}>{comment.author}</Text>
              <Text style={styles.commentDate}>
                {new Date(comment.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <Text style={styles.commentContent}>{comment.content}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.commentInput}>
        <TextInput
          style={styles.input}
          value={comment}
          onChangeText={setComment}
          placeholder="댓글을 입력하세요"
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleComment}>
          <Icon name="send" size={24} color="#04ca5b" />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  author: {
    color: '#666',
  },
  date: {
    color: '#666',
  },
  postContent: {
    padding: 15,
    fontSize: 16,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    marginLeft: 4,
    color: '#666',
  },
  commentsHeader: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  commentItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  commentAuthor: {
    fontWeight: '600',
  },
  commentDate: {
    color: '#666',
    fontSize: 12,
  },
  commentContent: {
    color: '#333',
  },
  commentInput: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f3f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
  },
});

export default BoardDetail;

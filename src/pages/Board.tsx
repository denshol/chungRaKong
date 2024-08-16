// Board.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const Board = ({route}) => {
  const {title} = route.params;
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);

  useEffect(() => {
    // 여기서 서버로부터 게시글 목록을 가져오는 API 호출을 할 수 있습니다.
    // 예시로 더미 데이터를 사용합니다.
    setPosts([
      {id: 1, title: '첫 번째 글', content: '내용입니다.', author: '작성자1'},
      {id: 2, title: '두 번째 글', content: '내용입니다.', author: '작성자2'},
    ]);
  }, []);

  const handleCreatePost = () => {
    setCurrentPost(null);
    setPostTitle('');
    setPostContent('');
    setAttachedFile(null);
    setModalVisible(true);
  };

  const handleEditPost = post => {
    setCurrentPost(post);
    setPostTitle(post.title);
    setPostContent(post.content);
    setAttachedFile(null);
    setModalVisible(true);
  };

  const handleDeletePost = postId => {
    Alert.alert(
      '게시글 삭제',
      '정말로 이 게시글을 삭제하시겠습니까?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '삭제',
          onPress: () => {
            // 여기서 서버에 삭제 요청을 보내고, 성공 시 로컬 상태를 업데이트합니다.
            setPosts(posts.filter(post => post.id !== postId));
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleSubmitPost = () => {
    if (currentPost) {
      // 게시글 수정 로직
      setPosts(
        posts.map(post =>
          post.id === currentPost.id
            ? {...post, title: postTitle, content: postContent}
            : post,
        ),
      );
    } else {
      // 새 게시글 작성 로직
      const newPost = {
        id: posts.length + 1,
        title: postTitle,
        content: postContent,
        author: '현재 사용자', // 실제로는 로그인된 사용자 정보를 사용해야 합니다.
      };
      setPosts([...posts, newPost]);
    }
    setModalVisible(false);
  };

  const handleFileUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setAttachedFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // 사용자가 파일 선택을 취소한 경우
      } else {
        throw err;
      }
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.postItem}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postAuthor}>{item.author}</Text>
      <View style={styles.postActions}>
        <Pressable
          style={styles.actionButton}
          onPress={() => handleEditPost(item)}>
          <Text style={styles.actionButtonText}>수정</Text>
        </Pressable>
        <Pressable
          style={styles.actionButton}
          onPress={() => handleDeletePost(item.id)}>
          <Text style={styles.actionButtonText}>삭제</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.boardTitle}>{title} 게시판</Text>
      <Pressable style={styles.createButton} onPress={handleCreatePost}>
        <Text style={styles.createButtonText}>새 글 작성</Text>
      </Pressable>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="제목"
            value={postTitle}
            onChangeText={setPostTitle}
          />
          <TextInput
            style={[styles.input, styles.contentInput]}
            placeholder="내용"
            multiline
            value={postContent}
            onChangeText={setPostContent}
          />
          <Pressable style={styles.fileButton} onPress={handleFileUpload}>
            <Text style={styles.fileButtonText}>
              {attachedFile ? '파일 첨부됨' : '파일 첨부'}
            </Text>
          </Pressable>
          <Pressable style={styles.submitButton} onPress={handleSubmitPost}>
            <Text style={styles.submitButtonText}>
              {currentPost ? '수정' : '작성'}
            </Text>
          </Pressable>
          <Pressable
            style={styles.cancelButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelButtonText}>취소</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  boardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  createButton: {
    backgroundColor: '#04ca5b',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  postAuthor: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionButton: {
    padding: 5,
    marginLeft: 10,
  },
  actionButtonText: {
    color: '#3498db',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  contentInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  fileButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  fileButtonText: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#04ca5b',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
  },
});

export default Board;
